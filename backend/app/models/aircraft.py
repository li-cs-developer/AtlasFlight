from sqlalchemy import Column, String, ForeignKey
from app.core.database import Base


class AircraftType(Base):
    __tablename__ = "AircraftType"
    
    icao_code = Column(String(10), primary_key=True)
    iata_code = Column(String(10))
    name = Column(String(255))


class Aircraft(Base):
    __tablename__ = "Aircraft"
    
    icao24 = Column(String(10), primary_key=True)
    registration = Column(String(20))
    serialnumber = Column(String(50))
    typecode = Column(String(10), ForeignKey("AircraftType.icao_code"))
    operatoricao = Column(String(10), ForeignKey("Airline.icao_code"))