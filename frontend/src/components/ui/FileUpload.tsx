import React, { type ChangeEvent } from 'react';
import { Upload, Sparkles } from 'lucide-react';
import type  { Theme, ThemeStyles } from '../../utils';
import { ACCEPTED_FILE_TYPES, MESSAGES } from '../../utils';

interface FileUploadProps {
  file: File | null;
  dragActive: boolean;
  styles: ThemeStyles;
  theme: Theme;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  dragActive,
  styles,
  theme,
  onFileChange,
  onUpload,
  onDrag,
  onDrop,
}) => {
  return (
    <div
      className={`relative border-2 border-dashed rounded-3xl p-12 transition-all duration-300 ${
        dragActive
          ? `border-purple-400 bg-purple-50/80 scale-105 ${
              theme === "cyberpunk" ? "bg-purple-900/20" : ""
            }`
          : `border-gray-300 ${
              theme === "cyberpunk" ? "border-gray-500" : ""
            } hover:scale-102`
      }`}
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDragOver={onDrag}
      onDrop={onDrop}
    >
      <div className="text-center">
        <div
          className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${styles.accent} p-5 shadow-lg`}
        >
          <Upload className="w-10 h-10 text-white" />
        </div>

        <p className={`text-xl font-bold mb-3 ${styles.text}`}>
          {file ? `📁 ${file.name}` : MESSAGES.DROP_OR_SELECT}
        </p>

        <p className={`text-base opacity-80 mb-8 ${styles.text}`}>
          {MESSAGES.SUPPORTED_FORMATS}
        </p>

        <div className="flex gap-6 justify-center">
          <label
            className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${styles.button} text-white rounded-full font-bold cursor-pointer transition-all duration-300 hover:scale-110 shadow-xl text-lg`}
          >
            <Upload className="w-5 h-5 mr-3" />
            Datei auswählen
            <input
              type="file"
              onChange={onFileChange}
              className="hidden"
              accept={ACCEPTED_FILE_TYPES}
            />
          </label>

          {file && (
            <button
              onClick={onUpload}
              className={`px-8 py-4 bg-gradient-to-r ${styles.button} text-white rounded-full font-bold transition-all duration-300 hover:scale-110 shadow-xl text-lg`}
            >
              <Sparkles className="w-5 h-5 mr-3 inline animate-spin" />
              Hochladen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};