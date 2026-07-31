from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.database import get_db

router = APIRouter()


@router.get("/")
def get_routes(
    limit: int = Query(100000, ge=1),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    query = text("""
        SELECT 
            r.route_id,
            r.stops,
            src.name as source_name,
            src.iata_code as source_iata,
            dst.name as dest_name,
            dst.iata_code as dest_iata,
            al.name as airline_name
        FROM Route r
        JOIN Airport src ON r.source_airport_id = src.airport_id
        JOIN Airport dst ON r.destination_airport_id = dst.airport_id
        LEFT JOIN Airline al ON r.airline_id = al.airline_id
        ORDER BY r.route_id
        OFFSET :offset ROWS
        FETCH NEXT :limit ROWS ONLY
    """)
    
    result = db.execute(query, {"offset": offset, "limit": limit})
    rows = result.all()
    
    total = db.execute(text("SELECT COUNT(*) FROM Route")).scalar()
    
    items = []
    for row in rows:
        items.append({
            "route_id": row[0],
            "stops": row[1],
            "source_name": row[2],
            "source_airport": row[3],
            "destination_name": row[4],
            "destination_airport": row[5],
            "airline": row[6]
        })
    
    return {"total": total or 0, "items": items}


# Route Finder endpoint
@router.get("/find")
def find_routes(
    from_airport: str = Query(..., alias="from"),
    to_airport: str = Query(..., alias="to"),
    db: Session = Depends(get_db)
):
    query = text("""
        SELECT 
            r.route_id,
            r.stops,
            src.name as source_name,
            src.iata_code as source_iata,
            dst.name as dest_name,
            dst.iata_code as dest_iata,
            al.name as airline_name,
            al.iata_code as airline_iata
        FROM Route r
        JOIN Airport src ON r.source_airport_id = src.airport_id
        JOIN Airport dst ON r.destination_airport_id = dst.airport_id
        LEFT JOIN Airline al ON r.airline_id = al.airline_id
        WHERE src.iata_code = :from_airport AND dst.iata_code = :to_airport
        ORDER BY r.stops
    """)
    
    result = db.execute(query, {"from_airport": from_airport, "to_airport": to_airport})
    rows = result.all()
    
    items = []
    for row in rows:
        items.append({
            "route_id": row[0],
            "stops": row[1],
            "source_name": row[2],
            "source_airport": row[3],
            "destination_name": row[4],
            "destination_airport": row[5],
            "airline": row[6] or "Unknown",
            "airline_iata": row[7]
        })
    
    return items