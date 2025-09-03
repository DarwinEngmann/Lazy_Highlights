import { useEffect, useRef } from 'react';
import { isVideoFile, ANIMATION_DELAYS } from '../utils';
import type { MediaPlayerHookReturn } from '../utils';

export const useMediaPlayer = (uploadedAudio: string | null): MediaPlayerHookReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const isVideo = uploadedAudio ? isVideoFile(uploadedAudio) : false;

  useEffect(() => {
    if (uploadedAudio) {
      // Kurze Verzögerung damit das Element definitiv gerendert ist
      setTimeout(() => {
        if (isVideo && videoRef.current) {
          videoRef.current.load();
        } else if (!isVideo && audioRef.current) {
          audioRef.current.load();
        }
      }, ANIMATION_DELAYS.MEDIA_LOAD);
    }
  }, [uploadedAudio, isVideo]);

  return {
    videoRef,
    audioRef,
    isVideo,
  };
};