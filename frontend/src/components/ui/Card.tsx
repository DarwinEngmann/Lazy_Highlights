import React from 'react';
import type { ThemeStyles } from '../../utils';

interface CardProps {
  styles: ThemeStyles;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ styles, children }) => {
  return (
    <div
      className={`max-w-5xl mx-auto backdrop-blur-lg rounded-3xl border ${styles.card} shadow-2xl p-8`}
    >
      {children}
    </div>
  );
};