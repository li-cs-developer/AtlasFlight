from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Default to local Windows SQL Server if .env is missing,
    # but Azure App Service will override this via the DATABASE_URL environment variable.
    DATABASE_URL: str = (
        "mssql+pyodbc://@localhost\\SQLEXPRESS/AtlasFlight?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
    )
    
    # Allowed origins for CORS (comma-separated string in .env / App Settings)
    ALLOWED_ORIGINS: str = "http://localhost:4200,http://127.0.0.1:4200,https://*.azurestaticapps.net"
    
    @property
    def ALLOWED_ORIGINS_LIST(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"  # Allow extra environment variables without errors


settings = Settings()