import { useState } from 'react';
import type { DragAndDropHookReturn } from '../utils';

export const useDragAndDrop = (
  onFileDrop: (file: File) => void,
  onStatusChange: (status: string) => void
): DragAndDropHookReturn => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileDrop(e.dataTransfer.files[0]);
      onStatusChange("");
    }
  };

  return {
    dragActive,
    handleDrag,
    handleDrop,
  };
};