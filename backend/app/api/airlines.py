from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.database import get_db

router = APIRouter()


@router.get("/")
def get_airlines(
    limit: int = Query(None, ge=1),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    query = text("""
        SELECT 
            airline_id,
            name,
            iata_code,
            icao_code,
            callsign,
            country_name,
            active
        FROM Airline 
        ORDER BY name
    """)
    
    params = {}
    
    # Only add OFFSET/FETCH if limit is provided
    if limit is not None:
        query = text(str(query) + " OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY")
        params["offset"] = offset
        params["limit"] = limit
    
    result = db.execute(query, params)
    rows = result.all()
    
    total = db.execute(text("SELECT COUNT(*) FROM Airline")).scalar()
    
    items = []
    for row in rows:
        items.append({
            "airline_id": row[0],
            "name": row[1],
            "iata_code": row[2],
            "icao_code": row[3],
            "callsign": row[4],
            "country_name": row[5],
            "active": row[6]
        })
    
    return {"total": total or 0, "items": items}