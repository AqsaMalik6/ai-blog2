from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from backend.models.models import Base
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env"))

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    user = os.getenv("POSTGRES_USER", "postgres")
    pw = os.getenv("POSTGRES_PASSWORD", "Aqsa1052.")
    host = os.getenv("POSTGRES_HOST", "localhost")
    port = os.getenv("POSTGRES_PORT", "5432")
    db = os.getenv("POSTGRES_DB", "ai_blog_db")
    
    pg_url = f"postgresql://{user}:{pw}@{host}:{port}/{db}"
    
    try:
        # Quick test connection
        print(f"Attempting to connect to Postgres at {host}...")
        temp_engine = create_engine(pg_url, connect_args={'connect_timeout': 3})
        with temp_engine.connect() as conn:
            DATABASE_URL = pg_url
            print("Postgres connection successful!")
    except Exception as e:
        print(f"Postgres failed: {e}. Switching to SQLite fallback.")
        DATABASE_URL = "sqlite:///./blog_agent.db"

# Engine configuration
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL, 
        connect_args={"check_same_thread": False},
        poolclass=StaticPool
    )
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)
    print(f"Database tables initialized on {DATABASE_URL}")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
