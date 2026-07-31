from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Database - using the exact working string
    DATABASE_URL: str = "mssql+pyodbc://@localhost\\SQLEXPRESS/AtlasFlight?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
    
    # API
    ALLOWED_ORIGINS: str = "http://localhost:4200,https://*.vercel.app"
    
    @property
    def ALLOWED_ORIGINS_LIST(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"  # This allows extra fields without error


settings = Settings()