import os
from typing import List, Tuple
import librosa
import numpy as np
from moviepy.editor import VideoFileClip
from scipy import signal
from core.config import settings

def extract_audio(video_path: str, audio_filename: str = "temp_audio.wav") -> str:
    audio_path = os.path.join(settings.AUDIO_DIR, audio_filename)
    try:
        clip = VideoFileClip(video_path)
        clip.audio.write_audiofile(
            audio_path,
            fps=22050,
            codec="pcm_s16le",
            verbose=False,
            logger=None,
        )
        clip.close()
        return audio_path
    except Exception as e:
        print(f"Audio-Extraktion Fehler: {e}")
        return ""
    
def refine_with_audio(
    video_path: str,
    motion_segments: List[Tuple[float, float]],
    padding: float = 0.25,
    merge_gap: float = 1.0,
) -> List[Tuple[float, float]]:
    """
    Verfeinert Motion-Highlights mit Audio:
    Snap an echte Sprechpausen, minimales Padding, Merge von nahen Segmenten.
    """
    audio_file = extract_audio(video_path, "temp_audio.wav")
    if not audio_file:
        return motion_segments

    y, sr = librosa.load(audio_file, sr=22050)

    speech_segments = improved_speech_detection(y, sr, method='combined')

    refined_segments = []
    for m_start, m_end in motion_segments:
        start, end = m_start, m_end

        for s_start, s_end in speech_segments:
            if s_end < m_start:
                continue
            if s_start > m_end:
                break
            start = min(start, max(s_start, start - 5))
            end = max(end, min(s_end, end + 5))

        start = max(0, start - padding)
        end = min(len(y) / sr, end + padding)

        if end - start >= 2:
            refined_segments.append((start, end))

    merged_segments = []
    for seg in refined_segments:
        if not merged_segments:
            merged_segments.append(seg)
        else:
            prev_start, prev_end = merged_segments[-1]
            cur_start, cur_end = seg
            if cur_start - prev_end <= merge_gap:
                merged_segments[-1] = (prev_start, max(prev_end, cur_end))
            else:
                merged_segments.append(seg)

    return merged_segments

def improved_speech_detection(y, sr, method='combined'):
    """
    Improved speech detection with multiple methods
    """
    
    if method == 'energy_based':
        return energy_based_detection(y, sr)
    elif method == 'spectral_centroid':
        return spectral_centroid_detection(y, sr)
    elif method == 'combined':
        return combined_detection(y, sr)
    else:
        # Fallback to original
        non_silent = librosa.effects.split(y, top_db=30)
        return [(start / sr, end / sr) for start, end in non_silent]

def energy_based_detection(y, sr, 
                          frame_length=2048, 
                          hop_length=512, 
                          energy_threshold=0.01,
                          min_silence_duration=0.3,
                          min_speech_duration=0.1):
    """
    Energy-based detection with better smoothing and thresholds
    """
    # Calculate RMS energy
    rms = librosa.feature.rms(y=y, frame_length=frame_length, hop_length=hop_length)[0]
    
    # Smooth the energy signal
    window_length = int(0.1 * sr // hop_length)  # 100ms window
    if window_length % 2 == 0:
        window_length += 1
    rms_smooth = signal.savgol_filter(rms, window_length, 3)
    
    # Adaptive threshold based on signal statistics
    threshold = max(energy_threshold, np.percentile(rms_smooth, 30))
    
    # Find speech regions
    speech_frames = rms_smooth > threshold
    
    # Convert to time
    times = librosa.frames_to_time(np.arange(len(speech_frames)), 
                                   sr=sr, hop_length=hop_length)
    
    # Find speech segments with minimum durations
    segments = []
    in_speech = False
    speech_start = 0
    
    for i, is_speech in enumerate(speech_frames):
        if is_speech and not in_speech:
            # Start of speech
            speech_start = times[i]
            in_speech = True
        elif not is_speech and in_speech:
            # End of speech
            speech_end = times[i]
            if speech_end - speech_start >= min_speech_duration:
                segments.append((speech_start, speech_end))
            in_speech = False
    
    # Handle case where speech continues to end
    if in_speech:
        speech_end = times[-1]
        if speech_end - speech_start >= min_speech_duration:
            segments.append((speech_start, speech_end))
    
    return merge_close_segments(segments, min_silence_duration)

def spectral_centroid_detection(y, sr,
                               hop_length=512,
                               centroid_threshold=2000,
                               energy_threshold=0.01):
    """
    Use spectral centroid to better detect speech vs noise
    """
    # Calculate spectral centroid and RMS
    centroid = librosa.feature.spectral_centroid(y=y, sr=sr, hop_length=hop_length)[0]
    rms = librosa.feature.rms(y=y, hop_length=hop_length)[0]
    
    # Speech typically has centroid in certain range and sufficient energy
    speech_frames = (centroid > 500) & (centroid < 4000) & (rms > energy_threshold)
    
    # Convert to segments
    times = librosa.frames_to_time(np.arange(len(speech_frames)), sr=sr, hop_length=hop_length)
    
    segments = []
    in_speech = False
    speech_start = 0
    
    for i, is_speech in enumerate(speech_frames):
        if is_speech and not in_speech:
            speech_start = times[i]
            in_speech = True
        elif not is_speech and in_speech:
            speech_end = times[i]
            if speech_end - speech_start >= 0.1:  # Min 100ms
                segments.append((speech_start, speech_end))
            in_speech = False
    
    if in_speech:
        segments.append((speech_start, times[-1]))
    
    return segments

def combined_detection(y, sr):
    """
    Combine multiple detection methods for better results
    """
    # Get results from different methods
    energy_segments = energy_based_detection(y, sr)
    spectral_segments = spectral_centroid_detection(y, sr)
    
    # Combine and merge overlapping segments
    all_segments = energy_segments + spectral_segments
    all_segments.sort()
    
    if not all_segments:
        return []
    
    merged = [all_segments[0]]
    for start, end in all_segments[1:]:
        if start <= merged[-1][1] + 0.1:  # Merge if within 100ms
            merged[-1] = (merged[-1][0], max(merged[-1][1], end))
        else:
            merged.append((start, end))
    
    return merged

def merge_close_segments(segments, min_gap=0.3):
    """
    Merge segments that are close together
    """
    if not segments:
        return []
    
    merged = [segments[0]]
    for start, end in segments[1:]:
        if start - merged[-1][1] < min_gap:
            # Merge with previous segment
            merged[-1] = (merged[-1][0], end)
        else:
            merged.append((start, end))
    
    return merged