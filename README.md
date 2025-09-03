# Lazy Highlights

> **Portfolio-Projekt**: Komplettes System zur automatischen Erstellung von Video-Highlights  
> bestehend aus **React-Frontend** (Upload, Themes, UI) und **FastAPI-Backend** (Verarbeitung, Motion/Audio-Analyse).

## Features

- **3 Anime-Themes** (Frieren, Cyberpunk, One Piece)  
- **Drag & Drop Upload** von Videos  
- **Automatische Highlight-Erstellung** (Motion Detection + Audio Refinement)  
- **Media Preview** mit integriertem Player  
- **Moderne Architektur** (Clean Code, Hooks, Services, Separation of Concerns)  
- **Responsive Design** (Mobile-First)

## Projektstruktur
```
├── frontend/ # React + Tailwind UI
├── backend/ # FastAPI Video Processing
└── README.md # Gesamtübersicht (diese Datei)
```

### Frontend
- **React 19 + TypeScript**  
- **TailwindCSS** für Styling  
- **Custom Hooks** & **Compound Components**  
- **Theme-System** für Anime-Designs

➡️ Siehe [`frontend/README.md`](frontend/README.md)

### Backend
- **FastAPI** + **Uvicorn**  
- **OpenCV** für Motion Detection  
- **Librosa** für Audioanalyse  
- **MoviePy** für Videoschnitt  
- **bcrypt** für Auth  

➡️ Siehe [`backend/README.md`](backend/README.md)

## Installation

### 1. Backend starten
```bash
cd backend
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Frontend starten
```bash
cd frontend
npm install
npm run dev
```

### 3. Nutzung
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## Learnings
- **Modulare Architektur**: UI & Processing strikt getrennt
- **Cross-Domain Integration**: CORS + REST-API
- **Performance-Optimierung**: Frame-Skipping, Downscaling
- **Clean Code**: Separation of Concerns, Atomic Design, Layered Backend

---

## Lizenz
Dieses Projekt ist ein **Portfolio-Projekt** und **nicht für kommerzielle Nutzung freigegeben.**
- Code darf zu **Lernzwecken** angesehen werden
- **Keine kommerzielle Nutzung**
- **Keine Veröffentlichung oder Ableitung ohne Erlaubnis**

➡️ Siehe [`LICENSE.md`](LICENSE.md)

