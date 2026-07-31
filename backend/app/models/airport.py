from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.core.database import Base


class Airport(Base):
    __tablename__ = "Airport"
    
    airport_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    iata_code = Column(String(3))
    icao_code = Column(String(4))
    longitude = Column(Float)
    altitude = Column(Integer)
    latitude = Column(Float)
    time_zone = Column(String(50))
    city_id = Column(Integer, ForeignKey("City.city_id"))