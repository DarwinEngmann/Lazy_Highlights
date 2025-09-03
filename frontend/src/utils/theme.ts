import type { Theme, ThemeStyles } from './types';

export const getThemeStyles = (theme: Theme): ThemeStyles => {
  switch (theme) {
    case "frieren":
      return {
        background: "bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100",
        backgroundImage: "'/src/assets/pictures/frieren_new.jpg'",
        accent: "from-blue-400 to-purple-600",
        text: "text-indigo-900",
        card: "bg-white/30 border-blue-200/60 shadow-blue-100/50",
        button: "from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
        overlay: "bg-blue-900/10",
      };
    case "cyberpunk":
      return {
        background: "bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900",
        backgroundImage: "'/src/assets/pictures/cyberpunk.jpg'",
        accent: "from-cyan-400 to-pink-500",
        text: "text-cyan-100",
        card: "bg-gray-900/70 border-cyan-400/30 shadow-cyan-400/20",
        button: "from-cyan-500 to-pink-600 hover:from-cyan-600 hover:to-pink-700",
        overlay: "bg-purple-900/20",
      };
    case "shonen":
      return {
        background: "bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100",
        backgroundImage: "'/src/assets/pictures/shonen.jpg'",
        accent: "from-orange-400 to-red-500",
        text: "text-red-900",
        card: "bg-white/80 border-orange-200/60 shadow-orange-100/50",
        button: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
        overlay: "bg-orange-900/10",
      };
  }
};