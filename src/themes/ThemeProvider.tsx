/**
 * Theme Provider Component
 *
 * Wraps the app and provides theme context to all children.
 * Handles theme persistence via localStorage.
 */

import { useState, useEffect, ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import { getTheme, getThemeIds, DEFAULT_THEME_ID } from './presets';

interface ThemeProviderProps {
  children: ReactNode;
  /** Optional: Override default theme */
  defaultThemeId?: string;
}

const THEME_STORAGE_KEY = 'dutch-harbor-games-theme';

export function ThemeProvider({ children, defaultThemeId }: ThemeProviderProps) {
  // Initialize theme from localStorage or use default
  const [themeId, setThemeId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && getThemeIds().includes(stored)) {
        return stored;
      }
    }
    return defaultThemeId || DEFAULT_THEME_ID;
  });

  // Get current theme object
  const theme = getTheme(themeId);

  // Persist theme changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    }
  }, [themeId]);

  // Apply theme CSS variables to :root
  useEffect(() => {
    if (typeof window !== 'undefined' && theme) {
      const root = document.documentElement;

      // Set CSS variables for theme colors
      root.style.setProperty('--theme-player-a', theme.colors.playerA);
      root.style.setProperty('--theme-player-a-glow', theme.colors.playerAGlow);
      root.style.setProperty('--theme-player-b', theme.colors.playerB);
      root.style.setProperty('--theme-player-b-glow', theme.colors.playerBGlow);

      if (theme.colors.accent) {
        root.style.setProperty('--theme-accent', theme.colors.accent);
      }
    }
  }, [theme]);

  const contextValue = {
    theme,
    themeId,
    setTheme: setThemeId,
    availableThemes: getThemeIds()
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
