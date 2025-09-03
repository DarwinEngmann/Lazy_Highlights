import React from "react";
import type { Theme } from "../../utils";
import { LoaderAvatar } from ".";

interface AnimeLoaderProps {
  theme: Theme;
}

export const AnimeLoader: React.FC<AnimeLoaderProps> = ({ theme }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <LoaderAvatar theme={theme} />
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};