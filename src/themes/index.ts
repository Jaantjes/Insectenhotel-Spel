/**
 * Theme System - Barrel Export
 *
 * Central export point for all theme-related functionality
 */

export { ThemeProvider } from './ThemeProvider';
export { useTheme, ThemeContext } from './ThemeContext';
export type { ThemeContextValue } from './ThemeContext';
export type { GameTheme, ThemeVariant } from './types';
export {
  THEMES,
  DEFAULT_THEME_ID,
  gardenTheme,
  harborTheme,
  spaceTheme,
  insectboardTheme,
  fireflyZoomTheme,
  getTheme,
  getThemeIds,
  getAllThemes
} from './presets';
