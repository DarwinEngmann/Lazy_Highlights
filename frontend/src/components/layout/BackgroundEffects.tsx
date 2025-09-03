import React from 'react';
import type { Theme, ThemeStyles } from '../../utils';
import { ANIMATION_DELAYS } from '../../utils/constants';

interface BackgroundEffectsProps {
  theme: Theme;
  styles: ThemeStyles;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ theme, styles }) => {
  const renderFloatingElements = () => {
    switch (theme) {
      case "frieren":
        return (
          <>
            <div className="absolute top-20 left-20 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-60"></div>
            <div className="absolute top-40 right-32 w-3 h-3 bg-purple-300 rounded-full animate-bounce opacity-40"></div>
            <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-indigo-300 rounded-full animate-pulse opacity-50"></div>
          </>
        );
      case "cyberpunk":
        return (
          <>
            <div className="absolute top-16 right-16 w-4 h-0.5 bg-cyan-400 animate-pulse opacity-70"></div>
            <div className="absolute bottom-20 left-20 w-0.5 h-4 bg-pink-400 animate-pulse opacity-60"></div>
            <div className="absolute top-1/2 right-1/4 w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 animate-pulse opacity-50"></div>
          </>
        );
      case "shonen":
        return (
          <>
            <div className="absolute top-24 left-16 w-3 h-3 bg-orange-400 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute bottom-40 right-20 w-4 h-4 bg-red-400 rounded-full animate-pulse opacity-50"></div>
            <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-70"></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Background Image with Overlay */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-${ANIMATION_DELAYS.TRANSITION_DURATION}`}
        style={{
          backgroundImage: `url(${styles.backgroundImage})`,
        }}
      />
      <div
        className={`absolute inset-0 ${styles.overlay} transition-all duration-${ANIMATION_DELAYS.TRANSITION_DURATION}`}
      />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {renderFloatingElements()}
      </div>
    </>
  );
};