import React from 'react';
import { Snowflake, Star, Flame } from 'lucide-react';
import type { Theme } from '../../utils';

interface ParticleIconProps {
  theme: Theme;
}

export const ParticleIcon: React.FC<ParticleIconProps> = ({ theme }) => {
  switch (theme) {
    case "frieren":
      return <Snowflake className="w-3 h-3 text-blue-300" />;
    case "cyberpunk":
      return <Star className="w-3 h-3 text-cyan-400" />;
    case "shonen":
      return <Flame className="w-3 h-3 text-orange-400" />;
    default:
      return null;
  }
};