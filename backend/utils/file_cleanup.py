import os
from core.config import settings

def cleanup_temp_files(original_filepath: str):
    if os.path.exists(original_filepath):
        try:
            os.remove(original_filepath)
        except Exception as e:
            print(f"Fehler beim Löschen der Upload-Datei: {e}")

    for f in os.listdir(settings.AUDIO_DIR):
        if f.startswith("temp_audio"):
            try:
                os.remove(os.path.join(settings.AUDIO_DIR, f))
            except Exception as e:
                print(f"Fehler beim Löschen von Temp-Audio: {e}")
