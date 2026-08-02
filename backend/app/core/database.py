from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Synchronous engine configured for both local SQL Server and Azure SQL
engine = create_engine(
    settings.DATABASE_URL,
    echo=False,              # Set to False in production to keep logs clean
    pool_pre_ping=True,      # Tests connection before using it (essential for Azure serverless auto-pause)
    pool_recycle=3600,       # Recycles stale connections every hour
)

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()