import React from 'react';
import type { ThemeStyles } from '../../utils';
import { ThemeSelector } from '../ui';

interface HeaderProps {
  styles: ThemeStyles;
}

export const Header: React.FC<HeaderProps> = ({ styles }) => {
  return (
    <div className="px-8 py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1
            className={`text-6xl font-bold mb-4 bg-gradient-to-r ${styles.accent} bg-clip-text text-transparent drop-shadow-lg`}
          >
            Lazy Highlights
          </h1>
          <p
            className={`text-xl ${styles.text} opacity-90 font-medium drop-shadow-sm`}
          >
            ✨ Erstelle magische Highlights aus deinen Videos ✨
          </p>
        </div>
        <ThemeSelector />
      </div>
    </div>
  );
};