"""
Create all tables with NVARCHAR for Unicode support.
Run: python -m scripts.create_tables
"""

import pyodbc

connection_string = (
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=localhost\\SQLEXPRESS;'
    'DATABASE=AtlasFlight;'
    'Trusted_Connection=yes;'
)

create_tables_sql = """
-- Country table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Country' AND xtype='U')
CREATE TABLE Country (
    iso_code VARCHAR(3) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    dafif_code NVARCHAR(4)
);

-- City table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='City' AND xtype='U')
CREATE TABLE City (
    city_id INTEGER PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(255) NOT NULL,
    country_iso_code VARCHAR(3) NOT NULL
);

-- Airport table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Airport' AND xtype='U')
CREATE TABLE Airport (
    airport_id INTEGER PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    iata_code VARCHAR(3),
    icao_code VARCHAR(4),
    longitude REAL,
    altitude INTEGER,
    latitude REAL,
    time_zone NVARCHAR(50),
    city_id INTEGER NOT NULL
);

-- Airline table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Airline' AND xtype='U')
CREATE TABLE Airline (
    airline_id INTEGER PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    iata_code VARCHAR(3),
    icao_code VARCHAR(4) UNIQUE,
    alias NVARCHAR(255),
    callsign NVARCHAR(255),
    active VARCHAR(1) CHECK (active IN ('Y','N') OR active IS NULL),
    country_name NVARCHAR(255),
    country_iso_code VARCHAR(3)
);

-- AircraftType table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AircraftType' AND xtype='U')
CREATE TABLE AircraftType (
    icao_code VARCHAR(10) PRIMARY KEY,
    iata_code VARCHAR(10),
    name NVARCHAR(255)
);

-- Aircraft table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Aircraft' AND xtype='U')
CREATE TABLE Aircraft (
    icao24 VARCHAR(10) PRIMARY KEY,
    registration NVARCHAR(20),
    serialnumber NVARCHAR(50),
    typecode VARCHAR(10),
    operatoricao VARCHAR(10)
);

-- Route table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Route' AND xtype='U')
CREATE TABLE Route (
    route_id INTEGER PRIMARY KEY IDENTITY(1,1),
    stops INTEGER NOT NULL DEFAULT 0,
    source_airport_id INTEGER NOT NULL,
    destination_airport_id INTEGER NOT NULL,
    airline_id INTEGER
);

-- OperatedUsing table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OperatedUsing' AND xtype='U')
CREATE TABLE OperatedUsing (
    route_id INTEGER NOT NULL,
    aircrafttype_icao VARCHAR(10) NOT NULL,
    PRIMARY KEY (route_id, aircrafttype_icao)
);

-- RouteAircraft table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='RouteAircraft' AND xtype='U')
CREATE TABLE RouteAircraft (
    route_id INTEGER NOT NULL,
    icao24 VARCHAR(10) NOT NULL,
    PRIMARY KEY (route_id, icao24)
);
"""

print("Creating tables with NVARCHAR...")
try:
    conn = pyodbc.connect(connection_string)
    cursor = conn.cursor()
    
    # Drop existing tables first to ensure clean creation
    tables = ['RouteAircraft', 'OperatedUsing', 'Route', 'Aircraft', 'AircraftType', 
              'Airline', 'Airport', 'City', 'Country']
    for table in tables:
        try:
            cursor.execute(f"DROP TABLE IF EXISTS {table}")
            print(f"  Dropped {table}")
        except Exception:
            pass
    
    for statement in create_tables_sql.split(';'):
        statement = statement.strip()
        if statement:
            try:
                cursor.execute(statement)
                conn.commit()
            except Exception as e:
                print(f"Error: {e}")
    
    print("Tables created successfully with NVARCHAR!")
    conn.close()
except Exception as e:
    print(f"Error: {e}")