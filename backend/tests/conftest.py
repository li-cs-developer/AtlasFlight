import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.core.database import Base, get_db
from app.core.config import settings
from main import app

# Use your existing database (not a test database)
# This matches your actual DATABASE_URL from config
TEST_DATABASE_URL = "mssql+pyodbc://@localhost\\SQLEXPRESS/AtlasFlight?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"


@pytest.fixture(scope="session")
def test_engine():
    """Create a test database engine using your existing database"""
    engine = create_engine(TEST_DATABASE_URL, echo=True)
    # DON'T drop tables - just use existing data
    # Base.metadata.drop_all(bind=engine)  # REMOVED - don't drop existing tables
    # Base.metadata.create_all(bind=engine)  # REMOVED - tables already exist
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
    """Use existing data from your database - don't create new data"""
    from app.models import Country, City, Airport, Airline, Route, AircraftType, Aircraft

    # Just return existing data from the database
    countries = db_session.query(Country).all()
    cities = db_session.query(City).all()
    airports = db_session.query(Airport).all()
    airlines = db_session.query(Airline).all()
    routes = db_session.query(Route).all()
    aircraft_types = db_session.query(AircraftType).all()
    aircraft = db_session.query(Aircraft).all()
    
    return {
        "countries": countries,
        "cities": cities,
        "airports": airports,
        "airlines": airlines,
        "routes": routes,
        "aircraft_types": aircraft_types,
        "aircraft": aircraft
    }