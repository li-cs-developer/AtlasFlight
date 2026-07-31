from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.database import get_db

router = APIRouter()


@router.get("/")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_airports = db.execute(text("SELECT COUNT(*) FROM Airport")).scalar()
    total_airlines = db.execute(text("SELECT COUNT(*) FROM Airline")).scalar()
    total_routes = db.execute(text("SELECT COUNT(*) FROM Route")).scalar()
    total_countries = db.execute(text("SELECT COUNT(*) FROM Country")).scalar()
    
    return {
        "total_airports": total_airports or 0,
        "total_airlines": total_airlines or 0,
        "total_routes": total_routes or 0,
        "total_countries": total_countries or 0
    }


@router.get("/top-airlines")
def get_top_airlines(db: Session = Depends(get_db)):
    # Get top 5 airlines by number of routes
    query = text("""
        SELECT TOP 5
            al.name,
            COUNT(r.route_id) as route_count
        FROM Airline al
        INNER JOIN Route r ON al.airline_id = r.airline_id
        WHERE al.name IS NOT NULL AND al.name != ''
        GROUP BY al.airline_id, al.name
        ORDER BY route_count DESC
    """)
    
    result = db.execute(query)
    rows = result.all()
    
    return [{"name": row[0], "value": row[1]} for row in rows]