import React from 'react';
import { createPortal } from 'react-dom';
import type { Theme, ThemeConfig } from '../../utils';

interface DropdownMenuProps {
  isOpen: boolean;
  position: { top: number; right: number };
  themes: ThemeConfig[];
  currentTheme: Theme;
  onThemeSelect: (theme: Theme) => void;
  onClose: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  position,
  themes,
  currentTheme,
  onThemeSelect,
  onClose
}) => {
  if (!isOpen) return null;

  const dropdown = (
    <div 
      className="fixed bg-white/95 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl p-3 min-w-64 z-[9999] max-h-96 overflow-y-auto"
      style={{
        top: position.top,
        right: position.right
      }}
    >
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => {
            onThemeSelect(theme.id);
            onClose();
          }}
          className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 mb-2 ${
            currentTheme === theme.id 
              ? 'bg-gradient-to-r ' + theme.colors + ' text-white shadow-lg transform scale-105' 
              : 'hover:bg-gray-200 text-gray-700 hover:scale-102'
          }`}
        >
          <span className="text-2xl">{theme.emoji}</span>
          <div className="text-left flex-1">
            <div className="font-bold text-base">{theme.name}</div>
          </div>
          {currentTheme === theme.id && (
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {createPortal(dropdown, document.body)}
      <div 
        className="fixed inset-0 z-[9998]"
        onClick={onClose}
      />
    </>
  );
};