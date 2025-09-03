import { useState, type ChangeEvent } from 'react';
import { API_BASE_URL, MESSAGES } from '../utils';
import type { FileUploadHookReturn, UploadResponse } from '../utils';

export const useFileUpload = (): FileUploadHookReturn => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [uploadedAudio, setUploadedAudio] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setStatus(MESSAGES.SELECT_FILE_FIRST);
      return;
    }

    setIsUploading(true);
    setStatus("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE_URL}/upload/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(MESSAGES.UPLOAD_FAILED);
      }

      const result: UploadResponse = await res.json();
      setStatus(`${MESSAGES.UPLOAD_SUCCESS} ${result.filename}`);
      setUploadedAudio(null);
      setUploadedAudio(result.filename);
    } catch (err) {
      setStatus(MESSAGES.UPLOAD_ERROR);
      console.error(err);
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus("");
    }
  };

  return {
    file,
    status,
    isUploading,
    uploadedAudio,
    handleUpload,
    handleFileChange,
    setFile,
    setStatus,
  };
};