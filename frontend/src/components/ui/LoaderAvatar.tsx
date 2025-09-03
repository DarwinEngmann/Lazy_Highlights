import React from 'react';
import type { Theme } from '../../utils';
import { getLoaderIcon, getLoaderStyles } from '../../utils';

interface LoaderAvatarProps {
  theme: Theme;
}

export const LoaderAvatar: React.FC<LoaderAvatarProps> = ({ theme }) => {
  const styles = getLoaderStyles(theme);
  const icon = getLoaderIcon(theme);

  const renderFrierenAvatar = () => (
    <div className="relative w-20 h-20 mx-auto">
      <div className={`w-20 h-20 rounded-full ${styles.avatar} relative overflow-hidden`}>
        {/* Face */}
        <div className={`absolute top-3 left-4 w-2 h-2 ${styles.eyes} rounded-full`}></div>
        <div className={`absolute top-3 right-4 w-2 h-2 ${styles.eyes} rounded-full`}></div>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-300 rounded-full"></div>
        <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-1 ${styles.mouth} rounded-full`}></div>
        {/* Hair */}
        <div className={`absolute -top-2 left-1 w-18 h-12 ${styles.hair} rounded-t-full opacity-90`}></div>
        {/* Magical sparkles */}
        <div className={`absolute top-1 right-1 w-1 h-1 ${styles.sparkles} rounded-full animate-ping`}></div>
        <div className={`absolute bottom-2 left-1 w-1 h-1 ${styles.sparkles} rounded-full animate-ping`} style={{animationDelay: '0.5s'}}></div>
      </div>
      <div className={`absolute -top-2 -right-2 w-8 h-8 ${styles.iconBg} rounded-full animate-pulse flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );

  const renderCyberpunkAvatar = () => (
    <div className="relative w-20 h-20 mx-auto">
      <div className={`w-20 h-20 rounded-full ${styles.avatar} relative overflow-hidden`}>
        {/* Glowing eyes */}
        <div className={`absolute top-3 left-4 w-2 h-2 ${styles.eyes} rounded-full`}></div>
        <div className={`absolute top-3 right-4 w-2 h-2 ${styles.eyes} rounded-full`}></div>
        {/* Mouth */}
        <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-1 ${styles.mouth} rounded-full`}></div>
        {/* Tech lines */}
        <div className={`absolute top-1/2 left-0 w-full h-0.5 ${styles.techLine1}`}></div>
        <div className={`absolute top-1/3 left-0 w-full h-0.5 ${styles.techLine2}`}></div>
      </div>
      <div className={`absolute -top-2 -right-2 w-8 h-8 ${styles.iconBg} rounded-full animate-spin flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );

  const renderShonenAvatar = () => (
    <div className="relative w-20 h-20 mx-auto">
      <div className={`w-20 h-20 rounded-full ${styles.avatar} relative overflow-hidden`}>
        {/* Determined eyes */}
        <div className={`absolute top-3 left-4 w-2 h-3 ${styles.eyes} rounded-full`}></div>
        <div className={`absolute top-3 right-4 w-2 h-3 ${styles.eyes} rounded-full`}></div>
        {/* Mouth */}
        <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-2 ${styles.mouth} rounded-full`}></div>
        {/* Power aura */}
        <div className={`absolute inset-0 ${styles.aura}`}></div>
      </div>
      {/* Spiky hair */}
      <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-8 ${styles.hair} rounded-t-full rotate-12 animate-pulse`}></div>
      <div className={`absolute -top-3 left-3 w-2 h-6 ${styles.hairSide} rounded-t-full -rotate-12 animate-pulse`}></div>
      <div className={`absolute -top-3 right-3 w-2 h-6 ${styles.hairSide} rounded-t-full rotate-12 animate-pulse`}></div>
      
      <div className={`absolute -top-2 -right-2 w-8 h-8 ${styles.iconBg} rounded-full animate-bounce flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );

  switch (theme) {
    case "frieren":
      return renderFrierenAvatar();
    case "cyberpunk":
      return renderCyberpunkAvatar();
    case "shonen":
      return renderShonenAvatar();
    default:
      return null;
  }
};