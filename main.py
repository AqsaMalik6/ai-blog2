from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from backend.routes.api import router as api_router
from backend.database.database import init_db
import os

app = FastAPI(title="AI Blog Generation Agent", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    print("🚀 Starting AI Blog Generation Agent...")
    init_db()
    print("✅ Database initialized!")

# Include API routes
app.include_router(api_router, prefix="/api", tags=["API"])

# Serve static files
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

# Serve frontend
@app.get("/")
async def read_root():
    return FileResponse("frontend/index.html")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)