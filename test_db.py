
import os
import sys
from dotenv import load_dotenv

# Add current directory to path so 'backend' can be found
sys.path.append(os.getcwd())

load_dotenv(os.path.join("backend", ".env"))

print(f"PYTHONPATH: {sys.path}")
print(f"DATABASE_URL from env: {os.getenv('DATABASE_URL')}")
print(f"POSTGRES_USER: {os.getenv('POSTGRES_USER')}")
print(f"POSTGRES_PASSWORD: {os.getenv('POSTGRES_PASSWORD')}")
print(f"POSTGRES_DB: {os.getenv('POSTGRES_DB')}")

try:
    from backend.database.database import engine
    from backend.models.models import Base
    
    print("Attempting to connect to database...")
    with engine.connect() as connection:
        print("✅ Database connection successful!")
    
    print("Attempting to initialize tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables initialized!")

except Exception as e:
    print(f"❌ Error during DB test: {str(e)}")
    import traceback
    traceback.print_exc()
