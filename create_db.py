
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend", ".env")
print(f"Loading env from: {env_path}")
load_dotenv(env_path)

def create_db():
    user = os.getenv("POSTGRES_USER", "postgres")
    password = os.getenv("POSTGRES_PASSWORD")
    host = os.getenv("POSTGRES_HOST", "localhost")
    port = os.getenv("POSTGRES_PORT", "5432")
    dbname = os.getenv("POSTGRES_DB", "ai_blog_db")

    print(f"Connecting to user={user}, password={'***' if password else 'None'}, host={host}, port={port}")
    # Connect to default 'postgres' database to create new one
    con = psycopg2.connect(
        dbname='postgres',
        user=user,
        password=password,
        host=host,
        port=port
    )
    con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cur = con.cursor()
    
    # Check if database exists
    cur.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{dbname}'")
    exists = cur.fetchone()
    
    if not exists:
        print(f"Creating database {dbname}...")
        cur.execute(f"CREATE DATABASE {dbname}")
        print(f"✅ Database {dbname} created successfully!")
    else:
        print(f"Database {dbname} already exists.")
    
    cur.close()
    con.close()

if __name__ == "__main__":
    try:
        create_db()
    except Exception as e:
        print(f"❌ Error: {str(e)}")
