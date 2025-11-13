/**
 * Game Theme Presets
 *
 * This file contains all available theme configurations.
 * Each theme defines the complete visual style for the game.
 */

import { GameTheme } from './types';
import gardenBoard from '@/assets/garden-board.jpg';
import gardenBoardAlt from '@/assets/garden-board-step1.jpg';
import harborShipsBoard from '@/assets/dutch-harbor-ships.jpg';
import insectenVeldBoard from '@/assets/insecten-veld.png';
import fireflyBoard from '@/assets/firefly-board.png';
import tuinraceV3Board from '@/assets/3d-beesten.jpg';
import insectboardBoard from '@/assets/insectboard.png';
import fireflyZoomBoard from '@/assets/firefly-zoom.png';
import insectenhotelImage from '@/assets/insectenhotel.png';
import insectenhotelV3Image from '@/assets/insectenhotel-v3.jpg';

/**
 * Theme: Insectenhotel V1
 * Original theme - Garden insects racing to bushes
 */
export const gardenTheme: GameTheme = {
  id: 'garden',
  name: 'Insectenhotel V1',
  description: 'Basis tuinbord met struiken',
  board: {
    image: gardenBoard,
    alt: 'Garden board with grass and flower beds'
  },
  pieces: {
    egg: '🐜',      // Mier (Ant)
    tulip: '🐛',    // Rups (Caterpillar)
    cheese: '🐝',   // Bij (Bee)
    butter: '🦋'    // Vlinder (Butterfly)
  },
  pieceNames: {
    egg: 'Mier',
    tulip: 'Rups',
    cheese: 'Bij',
    butter: 'Vlinder'
  },
  dock: {
    icon: '🪻',     // Lavender/Bush
    label: 'Struik',
    style: 'dashed'
    // image: insectenhotelV3Image  // Removed insect hotel image
  },
  colors: {
    playerA: '#ffffff',
    playerAGlow: 'rgba(255, 255, 255, 0.8)',
    playerB: '#3b82f6',
    playerBGlow: 'rgba(59, 130, 246, 0.8)',
    accent: '#10b981'
  }
};

/**
 * Theme: Insectenhotel V2
 * Garden theme - Insects racing to their hotels
 */
export const harborTheme: GameTheme = {
  id: 'harbor',
  name: 'Insectenhotel V2',
  description: 'Tuinbord met insectenhotels',
  board: {
    image: insectenVeldBoard,
    alt: 'Garden with insect hotels and natural vegetation'
  },
  pieces: {
    egg: '🐜',      // Ant
    tulip: '🐛',    // Caterpillar
    cheese: '🐝',   // Bee
    butter: '🦋'    // Butterfly
  },
  pieceNames: {
    egg: 'Mier',
    tulip: 'Rups',
    cheese: 'Bij',
    butter: 'Vlinder'
  },
  dock: {
    icon: '🏠',      // Insect Hotel
    label: 'Hotel',
    style: 'solid'
  },
  colors: {
    playerA: '#84cc16',
    playerAGlow: 'rgba(132, 204, 22, 0.8)',
    playerB: '#eab308',
    playerBGlow: 'rgba(234, 179, 8, 0.8)',
    accent: '#10b981'
  }
};

/**
 * Theme: Insectenhotel V3
 * Garden theme - 3D insects
 */
export const spaceTheme: GameTheme = {
  id: 'space',
  name: 'Insectenhotel V3',
  description: '3D beesten',
  board: {
    image: tuinraceV3Board,
    alt: 'Garden with 3D insects'
  },
  pieces: {
    egg: '🐜',      // Ant
    tulip: '🐛',    // Caterpillar
    cheese: '🐝',   // Bee
    butter: '🦋'    // Butterfly
  },
  pieceNames: {
    egg: 'Mier',
    tulip: 'Rups',
    cheese: 'Bij',
    butter: 'Vlinder'
  },
  dock: {
    icon: '🪻',     // Lavender/Bush
    label: 'Struik',
    style: 'dashed',
    image: insectenhotelV3Image
  },
  colors: {
    playerA: '#fbbf24',
    playerAGlow: 'rgba(251, 191, 36, 0.8)',
    playerB: '#f59e0b',
    playerBGlow: 'rgba(245, 158, 11, 0.8)',
    accent: '#84cc16'
  }
};

/**
 * Theme: Insectenhotel V4
 * Garden theme - Insectboard
 */
export const insectboardTheme: GameTheme = {
  id: 'insectboard',
  name: 'Insectenhotel V4',
  description: 'Insectboard',
  board: {
    image: insectboardBoard,
    alt: 'Insect board with detailed layout'
  },
  pieces: {
    egg: '🐜',      // Ant
    tulip: '🐛',    // Caterpillar
    cheese: '🐝',   // Bee
    butter: '🦋'    // Butterfly
  },
  pieceNames: {
    egg: 'Mier',
    tulip: 'Rups',
    cheese: 'Bij',
    butter: 'Vlinder'
  },
  dock: {
    icon: '🪻',     // Lavender/Bush
    label: 'Struik',
    style: 'dashed',
    image: insectenhotelV3Image
  },
  colors: {
    playerA: '#22c55e',
    playerAGlow: 'rgba(34, 197, 94, 0.8)',
    playerB: '#eab308',
    playerBGlow: 'rgba(234, 179, 8, 0.8)',
    accent: '#10b981'
  }
};

/**
 * Theme: Insectenhotel V5
 * Garden theme - Firefly Zoom
 */
export const fireflyZoomTheme: GameTheme = {
  id: 'fireflyzoom',
  name: 'Insectenhotel V5',
  description: 'Firefly Zoom',
  board: {
    image: fireflyZoomBoard,
    alt: 'Garden with firefly close-up view'
  },
  pieces: {
    egg: '🐜',      // Ant
    tulip: '🐛',    // Caterpillar
    cheese: '🐝',   // Bee
    butter: '🦋'    // Butterfly
  },
  pieceNames: {
    egg: 'Mier',
    tulip: 'Rups',
    cheese: 'Bij',
    butter: 'Vlinder'
  },
  dock: {
    icon: '🪻',     // Lavender/Bush
    label: 'Struik',
    style: 'dashed',
    image: insectenhotelV3Image
  },
  colors: {
    playerA: '#fbbf24',
    playerAGlow: 'rgba(251, 191, 36, 0.8)',
    playerB: '#f97316',
    playerBGlow: 'rgba(249, 115, 22, 0.8)',
    accent: '#eab308'
  }
};

/**
 * All available themes
 * Add new themes here to make them available in the game
 */
export const THEMES: Record<string, GameTheme> = {
  garden: gardenTheme,
  harbor: harborTheme,
  space: spaceTheme,
  insectboard: insectboardTheme,
  fireflyzoom: fireflyZoomTheme
};

/**
 * Default theme ID
 */
export const DEFAULT_THEME_ID = 'garden';

/**
 * Get a theme by ID, fallback to default if not found
 */
export function getTheme(themeId: string): GameTheme {
  return THEMES[themeId] || THEMES[DEFAULT_THEME_ID];
}

/**
 * Get list of all theme IDs
 */
export function getThemeIds(): string[] {
  return Object.keys(THEMES);
}

/**
 * Get list of all themes
 */
export function getAllThemes(): GameTheme[] {
  return Object.values(THEMES);
}
