import { createContext } from "react";
import type { Theme } from "../utils";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({
  theme: "frieren",
  setTheme: () => {},
});