from sqlalchemy import Column, String
from app.core.database import Base


class Country(Base):
    __tablename__ = "Country"
    
    iso_code = Column(String(3), primary_key=True)
    name = Column(String(255), nullable=False)
    dafif_code = Column(String(4))