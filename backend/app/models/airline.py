from sqlalchemy import Column, Integer, String, ForeignKey, CheckConstraint
from app.core.database import Base


class Airline(Base):
    __tablename__ = "Airline"
    
    airline_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    iata_code = Column(String(3))
    icao_code = Column(String(4), unique=True)
    alias = Column(String(255))
    callsign = Column(String(255))
    active = Column(String(1), CheckConstraint("active IN ('Y','N') OR active IS NULL"))
    country_name = Column(String(255))
    country_iso_code = Column(String(3), ForeignKey("Country.iso_code"))