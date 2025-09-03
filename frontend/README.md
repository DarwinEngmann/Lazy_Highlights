# Lazy Highlights - Video Processing App

> **Portfolio-Projekt**: Moderne React-Anwendung zum erstellen von Hightlights aus Videos

## Features

- **3 Anime-Themes**: Frieren, Cyberpunk, One Piece
- **Drag & Drop Upload**: Intuitive Datei-Uploads
- **Media Preview**: Video/Audio Player mit Theme-Integration
- **Interactive Effects**: Maus-Partikel und Animationen
- **Responsive Design**: Mobile-First Approach

## Architektur-Highlights

### Custom Hooks
```typescript
// Business Logic vollständig von UI getrennt
useFileUpload()      // Upload-State & API-Calls
useDragAndDrop()     // Drag&Drop-Events
useMediaPlayer()     // Media-Refs & Loading
useMouseParticles()  // Partikel-Animation
useDropdown()        // Dropdown-Logic
```

### Component Structure
```
components/
├── ui/           # Atomic Components
├── layout/       # Layout Components  
├── effects/      # Interactive Effects
└── sections/     # Page Sections
```

### Utility-First
```typescript
utils/
├── types.ts         # TypeScript Definitions
├── theme.ts         # Theme Configuration
├── constants.ts     # App Constants
└── fileHelpers.ts   # File Utilities
```

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS** für Styling
- **Lucide React** für Icons
- **Custom Hooks** für State Management
- **Compound Components** Pattern

## Code Quality

**100% TypeScript** - Vollständige Typisierung  
**Custom Hooks** - Separation of Concerns  
**Atomic Design** - Wiederverwendbare Komponenten  
**ESLint + Prettier** - Code-Qualität  
**Performance** - Event-Throttling & Cleanup  

## Learnings

### React Best Practices
- Custom Hooks für komplexe State-Logic
- Compound Components für wiederverwendbare UI
- Context API für globales State Management
- Event-Cleanup und Performance-Optimierung

### TypeScript Integration
- Strikte Type-Definitionen
- Generic Hooks und Components
- Interface-driven Development

### Architecture Patterns
- Separation of Concerns
- Single Responsibility Principle
- Configuration-driven Theming
- Utility-First Approach

## Installation

```bash
# Clone & Install
git clone [repository-url]
npm install

# Development
npm run dev

# Build
npm run build

# Type Check
npm run type-check
```

## Theme System

Vollständig konfigurierbare Themes:
```typescript
// Einfach neue Themes hinzufügen
const newTheme = {
  id: "naruto",
  name: "Naruto", 
  emoji: "🍜",
  colors: "from-orange-400 to-blue-500"
};
```

## Performance

- **Throttled Events** - Maus-Events
- **Lazy Loading** - Komponenten on-demand
- **Memoization** - Re-render Vermeidung
- **Event Cleanup** - Memory Leak Prevention

## TODOs

- **Progress Bar** - Verarbeitungsfortschritt in %
- **Register User** - Registrieren eines Nutzers
- **Login User** - Anmelden eines erstellen Nutzer
- **Params für Video Upload** - Anzahl Clips, Länge Clips usw. für angemeldete Nutzer


---

**Entwickelt als Portfolio-Projekt zur Demonstration moderner React-Architektur**