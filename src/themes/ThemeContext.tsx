/**
 * Theme Context
 *
 * Provides theme state and switching functionality throughout the app.
 * Uses React Context API for global theme management.
 */

import { createContext, useContext } from 'react';
import { GameTheme } from './types';

export interface ThemeContextValue {
  /** Currently active theme */
  theme: GameTheme;

  /** ID of the current theme */
  themeId: string;

  /** Switch to a different theme by ID */
  setTheme: (themeId: string) => void;

  /** Get all available theme IDs */
  availableThemes: string[];
}

/**
 * Theme Context
 * Use via useTheme() hook
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Hook to access theme context
 * Must be used within ThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme } = useTheme();
 *   return <div style={{ color: theme.colors.playerA }}>Hello</div>;
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
