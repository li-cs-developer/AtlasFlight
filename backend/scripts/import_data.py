"""
Import data from SQLite to SQL Server with proper Unicode handling.
Run: python -m scripts.import_data
"""

import sqlite3
import pyodbc
import os

# Paths
SQLITE_PATH = r"C:\Users\tonko\Documents\AtlasFlight\database\airline.db"

# SQL Server connection
connection_string = (
    f'DRIVER={{ODBC Driver 17 for SQL Server}};'
    f'SERVER=localhost\\SQLEXPRESS;'
    f'DATABASE=AtlasFlight;'
    f'Trusted_Connection=yes;'
)

# Tables with identity columns
IDENTITY_TABLES = ['City', 'Route']

# Tables to import (in order of dependencies)
TABLES = [
    'Country',
    'City',
    'Airport',
    'Airline',
    'AircraftType',
    'Aircraft',
    'Route',
    'OperatedUsing',
    'RouteAircraft'
]

def decode_bytes(value):
    """Handle bytes values from SQLite."""
    if value is None:
        return None
    if isinstance(value, bytes):
        try:
            return value.decode('utf-8')
        except UnicodeDecodeError:
            try:
                return value.decode('latin-1')
            except UnicodeDecodeError:
                return str(value)
    return value

def clean_airline_name(name):
    """Clean airline names to handle special characters."""
    if name is None:
        return None
    # Remove excessive backslashes
    name = name.replace('\\\\', '')
    name = name.replace('\\', '')
    # Remove extra spaces
    name = ' '.join(name.split())
    return name

def clean_airport_name(name):
    """Clean airport names - remove [Duplicate] prefix."""
    if name is None:
        return None
    # Remove [Duplicate] prefix
    name = name.replace('[Duplicate] ', '')
    name = name.replace('[Duplicate]', '')
    # Remove extra spaces
    name = ' '.join(name.split())
    return name

def main():
    # Connect to SQL Server
    try:
        sql_server_conn = pyodbc.connect(connection_string)
        sql_server_cursor = sql_server_conn.cursor()
        print("✅ Connected to SQL Server")
    except Exception as e:
        print(f"❌ Failed to connect to SQL Server: {e}")
        return

    # Connect to SQLite
    if not os.path.exists(SQLITE_PATH):
        print(f"❌ SQLite database not found: {SQLITE_PATH}")
        return

    sqlite_conn = sqlite3.connect(SQLITE_PATH)
    sqlite_conn.text_factory = lambda b: b.decode('utf-8', errors='ignore')
    sqlite_cursor = sqlite_conn.cursor()
    print(f"✅ Connected to SQLite: {SQLITE_PATH}")

    for table in TABLES:
        try:
            if table in IDENTITY_TABLES:
                sql_server_cursor.execute(f"SET IDENTITY_INSERT {table} ON")
            
            sqlite_cursor.execute(f"SELECT * FROM {table}")
            rows = sqlite_cursor.fetchall()
            
            if not rows:
                print(f"⚠️  No data in {table}")
                continue
            
            columns = [description[0] for description in sqlite_cursor.description]
            placeholders = ','.join(['?' for _ in columns])
            insert_sql = f"INSERT INTO {table} ({','.join(columns)}) VALUES ({placeholders})"
            
            inserted = 0
            skipped = 0
            
            for row in rows:
                try:
                    cleaned_row = []
                    for idx, value in enumerate(row):
                        value = decode_bytes(value)
                        
                        # Special handling for Airport table - clean duplicate names
                        if table == 'Airport' and idx == 1:  # name column
                            value = clean_airport_name(value)
                        
                        # Special handling for Airline table
                        if table == 'Airline':
                            # Clean airline name
                            if idx == 1:  # name column
                                value = clean_airline_name(value)
                            # Skip rows with NULL icao_code
                            if idx == 3:  # icao_code column
                                if value is None or value == '':
                                    # Skip this row entirely
                                    pass
                        
                        cleaned_row.append(value)
                    
                    # Skip Airline rows with NULL icao_code
                    if table == 'Airline':
                        icao_idx = 3
                        if len(cleaned_row) > icao_idx:
                            if cleaned_row[icao_idx] is None or cleaned_row[icao_idx] == '':
                                skipped += 1
                                continue
                    
                    sql_server_cursor.execute(insert_sql, cleaned_row)
                    inserted += 1
                except Exception as e:
                    skipped += 1
                    if skipped <= 3:
                        print(f"  Error: {e}")
            
            sql_server_conn.commit()
            
            if table in IDENTITY_TABLES:
                sql_server_cursor.execute(f"SET IDENTITY_INSERT {table} OFF")
            
            print(f"✅ {table}: imported {inserted} rows, skipped {skipped} invalid rows")
        except Exception as e:
            print(f"⚠️  {table}: {e}")

    sqlite_conn.close()
    sql_server_conn.close()
    print("✅ Import complete!")

if __name__ == "__main__":
    main()