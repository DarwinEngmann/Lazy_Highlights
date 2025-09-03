import os
from core.config import settings
from services.motion import detect_motion_highlights
from services.audio import refine_with_audio
from services.video import create_highlight_video

def process_video(video_path: str, original_name: str, unique_id: str):
    try:
        print("Analysiere Bewegung...")
        motion_segments = detect_motion_highlights(video_path)

        print("Verfeinere mit Audio...")
        refined_segments = refine_with_audio(video_path, motion_segments)

        if not refined_segments:
            return {
                "status": "ok",
                "filename": original_name,
                "message": "Keine Highlights gefunden - Original behalten",
            }

        highlight_filename = f"{unique_id}_highlight_{original_name}"
        highlight_filepath = os.path.join(settings.HIGHLIGHTS_DIR, highlight_filename)

        print("Erstelle Highlight-Video...")
        success = create_highlight_video(video_path, refined_segments, highlight_filepath)
        print("Fertig!")

        if success:
            return {
                "status": "ok",
                "filename": highlight_filename,
                "highlight_info": {"motion_segments": len(motion_segments)},
            }
        else:
            return {
                "status": "error",
                "message": "Fehler beim Erstellen des Highlight-Videos",
            }

    except Exception as e:
        print(f"Highlight-Extraktion Fehler: {e}")
        return {
            "status": "ok",
            "filename": original_name,
            "message": f"Fehler bei Highlight-Analyse: {str(e)}",
        }
