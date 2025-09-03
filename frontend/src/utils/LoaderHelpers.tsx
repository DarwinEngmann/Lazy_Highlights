import React from 'react';
import { Snowflake, Zap, Heart } from 'lucide-react';
import type { Theme } from './types';

export const getLoaderIcon = (theme: Theme): React.ReactNode => {
  switch (theme) {
    case "frieren":
      return <Snowflake className="w-4 h-4 text-white animate-spin" />;
    case "cyberpunk":
      return <Zap className="w-4 h-4 text-purple-900" />;
    case "shonen":
      return <Heart className="w-4 h-4 text-yellow-100" />;
    default:
      return null;
  }
};

export const getLoaderStyles = (theme: Theme) => {
  switch (theme) {
    case "frieren":
      return {
        avatar: "bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 border-4 border-white shadow-2xl animate-bounce",
        iconBg: "bg-gradient-to-br from-blue-400 to-purple-500",
        eyes: "bg-blue-500",
        mouth: "bg-pink-200",
        hair: "bg-gradient-to-b from-gray-100 to-gray-200",
        sparkles: "bg-blue-400"
      };
    case "cyberpunk":
      return {
        avatar: "bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 border-4 border-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse",
        iconBg: "bg-gradient-to-br from-cyan-400 to-pink-500",
        eyes: "bg-cyan-300 animate-ping shadow-lg shadow-cyan-300/50",
        mouth: "bg-pink-300",
        techLine1: "bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-70",
        techLine2: "bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50"
      };
    case "shonen":
      return {
        avatar: "bg-gradient-to-br from-orange-300 via-red-400 to-yellow-400 border-4 border-yellow-300 shadow-lg animate-bounce",
        iconBg: "bg-gradient-to-br from-orange-400 to-red-500",
        eyes: "bg-yellow-800",
        mouth: "bg-red-700",
        aura: "bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-30 animate-pulse",
        hair: "bg-yellow-400",
        hairSide: "bg-yellow-500"
      };
    default:
      return {};
  }
};
