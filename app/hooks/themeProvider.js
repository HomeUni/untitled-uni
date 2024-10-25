// ThemeProvider.js
"use client"
import { createContext, useContext } from 'react';
import useTheme from './useTheme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, toggleTheme] = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
