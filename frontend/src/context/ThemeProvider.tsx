import { type ReactNode, useState } from "react";
import { ThemeContext } from ".";
import type { Theme } from "../utils";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("frieren");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme} min-h-screen transition-all duration-700`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};