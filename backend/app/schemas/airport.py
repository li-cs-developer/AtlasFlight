from pydantic import BaseModel
from typing import Optional


class AirportBase(BaseModel):
    airport_id: int
    name: str
    iata_code: Optional[str] = None
    icao_code: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    altitude: Optional[int] = None
    time_zone: Optional[str] = None


class AirportDetail(AirportBase):
    city: str
    country: str


class AirportListResponse(BaseModel):
    total: int
    items: list[AirportDetail]