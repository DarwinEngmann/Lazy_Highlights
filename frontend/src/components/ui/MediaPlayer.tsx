import React from 'react';
import type { ThemeStyles } from '../../utils';
import { useMediaPlayer } from '../../hooks';
import { getMediaUrl, MESSAGES } from '../../utils';

interface MediaPlayerProps {
  uploadedAudio: string | null;
  styles: ThemeStyles;
}

export const MediaPlayer: React.FC<MediaPlayerProps> = ({ uploadedAudio, styles }) => {
  const { videoRef, audioRef, isVideo } = useMediaPlayer(uploadedAudio);

  if (!uploadedAudio) return null;

  const mediaUrl = getMediaUrl(uploadedAudio);

  return (
    <div className="mt-12">
      <h3 className={`text-2xl font-bold mb-6 ${styles.text}`}>
        🎥 Vorschau
      </h3>
      <div className="rounded-3xl overflow-hidden shadow-2xl">
        {isVideo ? (
          <video
            ref={videoRef}
            controls
            className="w-full max-w-5xl rounded-3xl"
            style={{ maxHeight: "70vh" }}
          >
            <source src={mediaUrl} type="video/mp4" />
            {MESSAGES.VIDEO_NOT_SUPPORTED}
          </video>
        ) : (
          <div className={`p-10 rounded-3xl ${styles.card} backdrop-blur-lg`}>
            <audio ref={audioRef} controls className="w-full h-16">
              <source src={mediaUrl} type="audio/mpeg" />
              {MESSAGES.AUDIO_NOT_SUPPORTED}
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};