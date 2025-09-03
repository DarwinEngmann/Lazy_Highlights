import React, { useContext } from "react";
import { Settings } from "lucide-react";
import { ThemeContext } from "../../context";
import { useDropdown } from "../../hooks";
import { DropdownMenu } from ".";
import { THEME_CONFIGS } from "../../utils";

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { isOpen, position, buttonRef, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <>
      <div className="relative z-50">
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Theme wechseln</span>
        </button>
      </div>
      
      <DropdownMenu
        isOpen={isOpen}
        position={position}
        themes={THEME_CONFIGS}
        currentTheme={theme}
        onThemeSelect={setTheme}
        onClose={closeDropdown}
      />
    </>
  );
};