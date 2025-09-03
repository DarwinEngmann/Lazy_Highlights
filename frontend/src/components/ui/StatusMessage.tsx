import React from 'react';
import type { ThemeStyles } from '../../utils';

interface StatusMessageProps {
  status: string;
  styles: ThemeStyles;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ status, styles }) => {
  if (!status) return null;

  const getStatusStyles = () => {
    if (status.includes("erfolgreich")) {
      return "bg-green-100/90 text-green-800 border-2 border-green-200";
    }
    if (status.includes("Fehler")) {
      return "bg-red-100/90 text-red-800 border-2 border-red-200";
    }
    return `bg-blue-100/90 ${styles.text} border-2 border-blue-200`;
  };

  return (
    <div className={`mt-8 p-6 rounded-2xl ${getStatusStyles()} backdrop-blur-sm`}>
      <p className="font-bold text-lg">{status}</p>
    </div>
  );
};