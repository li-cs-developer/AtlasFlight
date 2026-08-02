from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.core.config import settings
from app.core.database import engine, Base
from app.api import airports, airlines, routes, fleet, dashboard

# Create tables on startup
print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created (or already exist)!")

app = FastAPI(
    title="AtlasFlight API",
    description="Aviation analytics API with Azure SQL Server",
    version="1.0.0"
)

# Dynamic origins from config + allow wildcards for Azure deployment testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS_LIST or ["*"],
    allow_origin_regex=r"https://.*\.azurestaticapps\.net",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

# Include routers
app.include_router(airports.router, prefix="/api/airports", tags=["Airports"])
app.include_router(airlines.router, prefix="/api/airlines", tags=["Airlines"])
app.include_router(routes.router, prefix="/api/routes", tags=["Routes"])
app.include_router(fleet.router, prefix="/api/fleet", tags=["Fleet"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to AtlasFlight API (SQL Server Connected!)",
        "docs": "/docs",
        "version": "1.0.0"
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )


