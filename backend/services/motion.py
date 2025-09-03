import cv2
import numpy as np
from typing import List, Tuple

def detect_motion_highlights(
    video_path: str,
    frame_skip: int = 5,
    min_duration: float = 10.0,
    max_duration: float = 27.0,
    max_segments: int = 10,
) -> List[Tuple[float, float]]:
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)

    ret, prev_frame = cap.read()
    if not ret:
        return []

    prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
    prev_pts = cv2.goodFeaturesToTrack(
        prev_gray, maxCorners=200, qualityLevel=0.01, minDistance=5
    )

    motion_scores, frame_indices, frame_count = [], [], 0

    while True:
        ret, curr_frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % frame_skip != 0:
            continue

        curr_gray = cv2.cvtColor(curr_frame, cv2.COLOR_BGR2GRAY)

        if prev_pts is not None:
            next_pts, status, _ = cv2.calcOpticalFlowPyrLK(
                prev_gray, curr_gray, prev_pts, None
            )
            if next_pts is not None and status is not None:
                valid_prev = prev_pts[status.flatten() == 1]
                valid_next = next_pts[status.flatten() == 1]
                motion = (
                    np.mean(np.linalg.norm(valid_next - valid_prev, axis=1))
                    if len(valid_prev) > 0
                    else 0
                )
            else:
                motion = 0
        else:
            motion = 0

        motion_scores.append(motion)
        frame_indices.append(frame_count)

        prev_gray = curr_gray
        prev_pts = cv2.goodFeaturesToTrack(
            prev_gray, maxCorners=200, qualityLevel=0.01, minDistance=5
        )

    cap.release()

    motion_scores, frame_indices = np.array(motion_scores), np.array(frame_indices)
    if len(motion_scores) == 0:
        return []

    top_indices = np.argsort(motion_scores)[-len(motion_scores) // 7 :]
    high_motion_indices = np.sort(frame_indices[top_indices])

    segments = []
    if len(high_motion_indices) > 0:
        start_idx, end_idx = high_motion_indices[0], high_motion_indices[0]

        for idx in high_motion_indices[1:]:
            if (idx - end_idx) <= fps * 2:
                end_idx = idx
            else:
                _add_segment(segments, start_idx, end_idx, fps, frame_count, min_duration, max_duration)
                start_idx, end_idx = idx, idx

        _add_segment(segments, start_idx, end_idx, fps, frame_count, min_duration, max_duration)

    scored_segments = []
    for seg in segments:
        s, e = seg
        seg_scores = motion_scores[(frame_indices / fps >= s) & (frame_indices / fps <= e)]
        score = np.mean(seg_scores) if len(seg_scores) > 0 else 0
        scored_segments.append((score, seg))

    scored_segments.sort(key=lambda x: x[0], reverse=True)
    best_segments = [seg for _, seg in scored_segments[:max_segments]]
    best_segments.sort(key=lambda x: x[0])

    return best_segments

def _add_segment(segments, start_idx, end_idx, fps, frame_count, min_duration, max_duration):
    duration = (end_idx - start_idx) / fps
    if min_duration <= duration <= max_duration:
        segments.append(
            (
                max(0, start_idx / fps - 1),
                min((end_idx / fps + 1), frame_count / fps),
            )
        )
