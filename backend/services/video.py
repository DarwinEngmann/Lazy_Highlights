import os
from typing import List, Tuple
from moviepy.editor import VideoFileClip, concatenate_videoclips
from core.config import settings

def create_highlight_video(
    video_path: str, segments: List[Tuple[float, float]], output_path: str
) -> bool:
    try:
        video = VideoFileClip(video_path)
        clips = [
            video.subclip(start, end).fadein(0.25).fadeout(0.25)
            for start, end in segments
        ]

        if clips:
            final_video = concatenate_videoclips(
                clips, method="compose", padding=-0.1
            )
            final_video.write_videofile(
                output_path,
                codec="libx264",
                audio_codec="aac",
                temp_audiofile=os.path.join(settings.AUDIO_DIR, "temp-audio.m4a"),
                remove_temp=True,
                verbose=False,
                logger=None,
            )
            video.close()
            final_video.close()
            return True
    except Exception as e:
        print(f"Video-Erstellung Fehler: {e}")
        return False

    return False
