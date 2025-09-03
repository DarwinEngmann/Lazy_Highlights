import type { Theme } from './';

export interface ThemeConfig {
  id: Theme;
  name: string;
  emoji: string;
  colors: string;
}

export const THEME_CONFIGS: ThemeConfig[] = [
  { 
    id: "frieren", 
    name: "Frieren", 
    emoji: "❄️", 
    colors: "from-blue-400 to-purple-500"
  },
  { 
    id: "cyberpunk", 
    name: "Cyberpunk", 
    emoji: "🌆", 
    colors: "from-cyan-400 to-pink-500"
  },
  { 
    id: "shonen", 
    name: "One Piece", 
    emoji: "⚡", 
    colors: "from-orange-400 to-red-500"
  }
];