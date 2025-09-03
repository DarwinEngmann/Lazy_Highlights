# Lazy Highlights - Video Processing API

> **Portfolio-Projekt**: Moderne FastAPI-Backend-Architektur zur automatisierten Erstellung von Video-Highlights

## Features

- **Login & Auth**: Simple Token-Authentifizierung (bcrypt)
- **Video-Upload**: Upload-Endpoint mit automatischer Verarbeitung
- **Motion Detection**: Bewegungserkennung mit Optical Flow
- **Audio Refinement**: Sprach-/Audio-Analyse für präzisere Segmente
- **Highlight Creation**: Automatisches Schneiden & Rendern von Highlights
- **Static Serving**: Fertige Highlights über `/media` abrufbar

## Architektur-Highlights

### API Layer
```python
app/api/
├── auth.py      # Login-Endpoint
├── upload.py    # Upload & Highlight-Verarbeitung
└── __init__.py
```

### Core Layer
```python
app/core/
├── config.py    # Globale Konfiguration (Dirs, Settings)
└── __init__.py
```

### Clean Code Prinzipien
- **Separation of Concerns** – API, Services, Core strikt getrennt
- **Single Responsibility** - jede Datei hat eine Aufgabe
- **Reusability** - Video-/Audiofunktionen modularisiert
- **Async-ready** - Upload & Processing vorbereitet für Hintergrundjobs

## Tech Stack

- **FastAPI** - Webframework
- **SQLite** - einfache Datenbank
- **OpenCV** – Motion Detection
- **Librosa** - Audioanalyse
- **MoviePy** - Video-Schnitt & Übergänge
- **bcrypt** - Password-Hashing

## Code Quality

- **Klare Modulstruktur** (api/, services/, core/)
- **Typannotationen** (List[Tuple[float, float]])
- **Logging & Error Handling**
- **Async-ready API-Design**
- **Vorbereitung für Background Worker**

## Learnings

### FastAPI Best Practices
- Dependency Injection (Depends)
- Modularisierte Router (APIRouter)
- CORS-Setup für Frontend-Integration
- Static Files für fertige Medien

### Video Processing Insights
- Frame-Skipping & Downscaling für Performance
- Optical Flow für Bewegungsanalyse
- Audio-basierte Verfeinerung von Motion-Segmenten
- Kombinierte Segment-Detektion (Energy + Spectral)

### Architektur Patterns
- Layered Architecture
- Clean Code Prinzipien
- Utility-First Services
- Erweiterbar für Worker (z. B. Celery)

## Installation

```bash
# Repository klonen
git clone [repository-url]
cd backend

# Neues Virtual Environment
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows

# Dependencies installieren
pip install -r requirements.txt

# Server starten
uvicorn main:app --reload
```

## API Endpoints

- POST /login → Login mit Username & Passwort
- POST /upload/ → Video-Upload & Highlight-Erstellung
- GET /media/{filename} → Zugriff auf fertige Highlights

## Requirements

```text
fastapi[all]
uvicorn[standard]
python-multipart
bcrypt
numpy
opencv-python
moviepy==1.0.3
librosa
scipy
```

## Performance

- Frame-Skipping – nur jedes n-te Frame für Motion Detection
- Audio-Downsampling – effizientere Sprach-Erkennung

## TODOs

- **Testing** - Robuste Architektur
- **GPU-Beschleunigung** - FFmpeg / OpenCV CUDA
- **Downscaling** – kleinere Frames für schnellere Berechnung

---

**Entwickelt als Portfolio-Projekt zur Demonstration moderner Backend-Architektur**
