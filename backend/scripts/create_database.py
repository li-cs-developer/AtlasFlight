import pyodbc

# Connect to master database to create new database
connection_string = (
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=localhost\\SQLEXPRESS;'
    'DATABASE=master;'
    'Trusted_Connection=yes;'
)

try:
    conn = pyodbc.connect(connection_string)
    cursor = conn.cursor()
    
    # Create database
    cursor.execute("""
        IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'AtlasFlight')
        CREATE DATABASE AtlasFlight
    """)
    conn.commit()
    print("Database 'AtlasFlight' created successfully!")
    
    conn.close()
except Exception as e:
    print(f"Error: {e}")