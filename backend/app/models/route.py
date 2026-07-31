from sqlalchemy import Column, Integer, ForeignKey
from app.core.database import Base


class Route(Base):
    __tablename__ = "Route"
    
    route_id = Column(Integer, primary_key=True)
    stops = Column(Integer, nullable=False, default=0)
    source_airport_id = Column(Integer, ForeignKey("Airport.airport_id"), nullable=False)
    destination_airport_id = Column(Integer, ForeignKey("Airport.airport_id"), nullable=False)
    airline_id = Column(Integer, ForeignKey("Airline.airline_id"))