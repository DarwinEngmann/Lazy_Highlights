import os

class Settings:
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
    HIGHLIGHTS_DIR = os.path.join(BASE_DIR, "highlights")
    AUDIO_DIR = os.path.join(BASE_DIR, "audio")

    ALLOWED_ORIGINS = ["http://localhost:5173"]

    def __init__(self):
        for d in [self.UPLOAD_DIR, self.HIGHLIGHTS_DIR, self.AUDIO_DIR]:
            os.makedirs(d, exist_ok=True)

settings = Settings()
