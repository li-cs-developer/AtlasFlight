"""
Drop all tables in the AtlasFlight database (DANGEROUS!).
Run: python -m scripts.drop_tables
"""

import pyodbc

connection_string = (
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=localhost\\SQLEXPRESS;'
    'DATABASE=AtlasFlight;'
    'Trusted_Connection=yes;'
)

TABLES = [
    'RouteAircraft',
    'OperatedUsing',
    'Route',
    'Aircraft',
    'AircraftType',
    'Airline',
    'Airport',
    'City',
    'Country'
]

def main():
    confirm = input("⚠️  This will DELETE ALL DATA. Type 'yes' to continue: ")
    if confirm.lower() != 'yes':
        print("❌ Aborted.")
        return

    try:
        conn = pyodbc.connect(connection_string)
        cursor = conn.cursor()
        
        for table in TABLES:
            try:
                cursor.execute(f"DROP TABLE IF EXISTS {table}")
                print(f"✅ Dropped {table}")
            except Exception as e:
                print(f"⚠️  Could not drop {table}: {e}")
        
        conn.commit()
        print("✅ All tables dropped!")
        conn.close()
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()