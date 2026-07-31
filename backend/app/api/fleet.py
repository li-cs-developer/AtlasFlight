from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.database import get_db

router = APIRouter()


@router.get("/")
def get_fleet(db: Session = Depends(get_db)):
    # Query with more metrics
    query = text("""
        SELECT 
            at.icao_code,
            at.name as aircraft_name,
            COUNT(a.icao24) as total_aircraft,
            COUNT(DISTINCT a.operatoricao) as operators,
            COUNT(DISTINCT a.registration) as unique_registrations,
            COUNT(DISTINCT a.typecode) as aircraft_variants,
            SUM(CASE WHEN a.operatoricao IS NOT NULL THEN 1 ELSE 0 END) as active_aircraft
        FROM AircraftType at
        LEFT JOIN Aircraft a ON a.typecode = at.icao_code
        GROUP BY at.icao_code, at.name
        ORDER BY total_aircraft DESC
    """)
    
    result = db.execute(query)
    rows = result.all()
    
    items = []
    for row in rows:
        items.append({
            "icao_code": row[0],
            "name": row[1],
            "count": row[2] or 0,
            "operators": row[3] or 0,
            "registrations": row[4] or 0,
            "variants": row[5] or 0,
            "active": row[6] or 0
        })
    
    return {"items": items}