import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.database import Base, get_db
from main import app

# Local Windows SQLExpress fallback
LOCAL_WIN_DB = (
    "mssql+pyodbc://@localhost\\SQLEXPRESS/AtlasFlight"
    "?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
)

# Use TEST_DATABASE_URL if passed in environment (e.g. for Azure), otherwise local SQLEXPRESS
TEST_DATABASE_URL = os.getenv("TEST_DATABASE_URL", LOCAL_WIN_DB)


@pytest.fixture(scope="session")
def test_engine():
    """Create a test database engine using the resolved database URL"""
    engine = create_engine(TEST_DATABASE_URL, echo=True)
    return engine


@pytest.fixture(scope="function")
def db_session(test_engine):
    """Create a database session for each test using existing data"""
    connection = test_engine.connect()
    transaction = connection.begin()
    session = sessionmaker(autocommit=False, autoflush=False, bind=connection)()

    def override_get_db():
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[get_db] = override_get_db

    yield session

    transaction.rollback()
    connection.close()
    app.dependency_overrides.clear()


@pytest.fixture(scope="function")
def client(db_session):
    """Create a test client for API testing"""
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(scope="function")
def sample_data(db_session):
    """Fetch existing data from database for test assertions"""
    from app.models import (
        Country,
        City,
        Airport,
        Airline,
        Route,
        AircraftType,
        Aircraft,
    )

    return {
        "countries": db_session.query(Country).all(),
        "cities": db_session.query(City).all(),
        "airports": db_session.query(Airport).all(),
        "airlines": db_session.query(Airline).all(),
        "routes": db_session.query(Route).all(),
        "aircraft_types": db_session.query(AircraftType).all(),
        "aircraft": db_session.query(Aircraft).all(),
    }