from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base


class City(Base):
    __tablename__ = "City"
    
    city_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    country_iso_code = Column(String(3), ForeignKey("Country.iso_code"))