import { VIDEO_EXTENSIONS } from './constants';

export const isVideoFile = (filename: string): boolean => {
  if (!filename) return false;
  
  const lowerFilename = filename.toLowerCase();
  return VIDEO_EXTENSIONS.some(ext => lowerFilename.endsWith(ext));
};

export const getMediaUrl = (filename: string): string => {
  return `http://localhost:8000/media/${encodeURIComponent(filename)}`;
};