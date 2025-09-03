from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from core.config import settings
from api import auth, upload

app = FastAPI(title="Highlight Generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files (Highlights ausliefern)
app.mount("/media", StaticFiles(directory=settings.HIGHLIGHTS_DIR), name="media")

# Router registrieren
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(upload.router, prefix="/upload", tags=["upload"])
