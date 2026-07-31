from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import select, func, text

from app.core.database import get_db
from app.models import Airport, City, Country

router = APIRouter()


@router.get("/")
def get_airports(
    search: str = Query(None),
    country: str = Query(None),
    limit: int = Query(None, ge=1),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    sql = """
        SELECT 
            a.airport_id,
            a.name,
            a.iata_code,
            a.icao_code,
            a.latitude,
            a.longitude,
            a.altitude,
            a.time_zone,
            c.name as city,
            co.name as country
        FROM Airport a
        JOIN City c ON a.city_id = c.city_id
        JOIN Country co ON c.country_iso_code = co.iso_code
        WHERE 1=1
    """
    params = {}
    
    if search:
        sql += " AND (a.name LIKE :search OR a.iata_code LIKE :search OR a.icao_code LIKE :search OR c.name LIKE :search)"
        params["search"] = f"%{search}%"
    
    if country:
        sql += " AND co.iso_code = :country"
        params["country"] = country
    
    sql += " ORDER BY a.name"
    
    # Only add OFFSET/FETCH if limit is provided
    if limit is not None:
        sql += " OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY"
        params["offset"] = offset
        params["limit"] = limit
    else:
        # No limit - get all records
        # For MSSQL, we need to use a very large number or remove pagination
        # Option A: Use a very large limit
        sql += " OFFSET :offset ROWS FETCH NEXT 100000 ROWS ONLY"
        params["offset"] = offset
    
    result = db.execute(text(sql), params)
    rows = result.all()
    
    # Count total
    count_sql = """
        SELECT COUNT(*) 
        FROM Airport a
        JOIN City c ON a.city_id = c.city_id
        JOIN Country co ON c.country_iso_code = co.iso_code
        WHERE 1=1
    """
    count_params = {}
    if search:
        count_sql += " AND (a.name LIKE :search OR a.iata_code LIKE :search OR a.icao_code LIKE :search OR c.name LIKE :search)"
        count_params["search"] = f"%{search}%"
    if country:
        count_sql += " AND co.iso_code = :country"
        count_params["country"] = country
    
    total = db.execute(text(count_sql), count_params).scalar()
    
    items = []
    for row in rows:
        items.append({
            "airport_id": row[0],
            "name": row[1],
            "iata_code": row[2],
            "icao_code": row[3],
            "latitude": row[4],
            "longitude": row[5],
            "altitude": row[6],
            "time_zone": row[7],
            "city": row[8],
            "country": row[9]
        })
    
    return {"total": total or 0, "items": items}


@router.get("/countries")
def get_countries(db: Session = Depends(get_db)):
    result = db.execute(select(Country.iso_code, Country.name).order_by(Country.name))
    return [{"iso_code": row[0], "name": row[1]} for row in result.all()]