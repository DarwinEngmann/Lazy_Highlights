import React, { type ChangeEvent } from 'react';
import type { Theme, ThemeStyles } from '../../utils';
import { FileUpload, StatusMessage, AnimeLoader } from '../ui';
import { MESSAGES } from '../../utils';

interface UploadSectionProps {
  file: File | null;
  status: string;
  isUploading: boolean;
  dragActive: boolean;
  styles: ThemeStyles;
  theme: Theme;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  file,
  status,
  isUploading,
  dragActive,
  styles,
  theme,
  onFileChange,
  onUpload,
  onDrag,
  onDrop,
}) => {
  return (
    <div className="mb-8">
      <h2 className={`text-3xl font-bold mb-6 ${styles.text}`}>
        🎬 Video hochladen
      </h2>

      {isUploading ? (
        <div className={`text-center py-16 ${styles.text}`}>
          <AnimeLoader theme={theme} />
          <p className="mt-6 text-xl font-bold">{MESSAGES.PROCESSING}</p>
          <p className="text-base opacity-80 mt-3">
            {MESSAGES.PROCESSING_DESCRIPTION}
          </p>
        </div>
      ) : (
        <FileUpload
          file={file}
          dragActive={dragActive}
          styles={styles}
          theme={theme}
          onFileChange={onFileChange}
          onUpload={onUpload}
          onDrag={onDrag}
          onDrop={onDrop}
        />
      )}

      <StatusMessage status={status} styles={styles} />
    </div>
  );
};