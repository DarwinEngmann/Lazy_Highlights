export type Theme = 'frieren' | 'cyberpunk' | 'shonen';

export interface ThemeStyles {
  background: string;
  backgroundImage: string;
  accent: string;
  text: string;
  card: string;
  button: string;
  overlay: string;
}

export interface UploadResponse {
  filename: string;
}

export interface FileUploadHookReturn {
  file: File | null;
  status: string;
  isUploading: boolean;
  uploadedAudio: string | null;
  handleUpload: () => Promise<void>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFile: (file: File | null) => void;
  setStatus: (status: string) => void;
}

export interface DragAndDropHookReturn {
  dragActive: boolean;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
}

export interface MediaPlayerHookReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isVideo: boolean;
}