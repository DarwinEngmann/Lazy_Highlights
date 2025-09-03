export const API_BASE_URL = "http://localhost:8000";
export const ACCEPTED_FILE_TYPES = "video/*,audio/*";
export const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg'];

export const MESSAGES = {
  UPLOAD_SUCCESS: "✨ Upload erfolgreich:",
  UPLOAD_ERROR: "❌ Fehler beim Upload.",
  SELECT_FILE_FIRST: "Bitte zuerst eine Datei auswählen.",
  PROCESSING: "Verarbeitung läuft...",
  PROCESSING_DESCRIPTION: "✨ Deine Datei wird verarbeitet...! ✨",
  DROP_OR_SELECT: "🎯 Datei hier ablegen oder auswählen",
  SUPPORTED_FORMATS: "MP4, WebM, MP3, WAV oder andere Formate",
  UPLOAD_FAILED: "Upload fehlgeschlagen",
  VIDEO_NOT_SUPPORTED: "Dein Browser unterstützt das Video-Element nicht.",
  AUDIO_NOT_SUPPORTED: "Dein Browser unterstützt das Audio-Element nicht."
};

export const ANIMATION_DELAYS = {
  MEDIA_LOAD: 100,
  TRANSITION_DURATION: 1000
};