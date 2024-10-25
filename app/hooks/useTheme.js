// useTheme.js
"use client"
import { useState, useEffect } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState('light'); // Default theme is light
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };
  
  return [theme, toggleTheme];
}
