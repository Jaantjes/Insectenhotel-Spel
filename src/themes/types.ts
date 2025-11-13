/**
 * Game Theme System - Type Definitions
 *
 * This file defines the structure for visual themes.
 * Each theme controls: board appearance, piece icons, dock visuals, and colors.
 */

export interface GameTheme {
  /** Unique identifier for the theme */
  id: string;

  /** Display name shown in theme selector */
  name: string;

  /** Description of the theme (optional) */
  description?: string;

  /** Board background configuration */
  board: {
    /** Path to board image (relative to /src/assets/) */
    image: string;
    /** Alternative text for accessibility */
    alt: string;
  };

  /** Piece/Token visual configuration */
  pieces: {
    /** Icon for 'egg' piece type (Mier/Ant in garden theme) */
    egg: string;
    /** Icon for 'tulip' piece type (Rups/Caterpillar in garden theme) */
    tulip: string;
    /** Icon for 'cheese' piece type (Bij/Bee in garden theme) */
    cheese: string;
    /** Icon for 'butter' piece type (Vlinder/Butterfly in garden theme) */
    butter: string;
  };

  /** Piece names for display (optional, defaults to Dutch names) */
  pieceNames?: {
    egg: string;
    tulip: string;
    cheese: string;
    butter: string;
  };

  /** Dock/Warehouse visual configuration */
  dock: {
    /** Icon shown in empty docks */
    icon: string;
    /** Optional text label for docks */
    label?: string;
    /** Background pattern or style (future use) */
    style?: 'dashed' | 'solid' | 'dotted';
    /** Optional image to display in dock (overrides icon) */
    image?: string;
  };

  /** Color scheme for players and UI elements */
  colors: {
    /** Primary color for Player A (hex or CSS variable) */
    playerA: string;
    /** Secondary glow color for Player A */
    playerAGlow: string;
    /** Primary color for Player B (hex or CSS variable) */
    playerB: string;
    /** Secondary glow color for Player B */
    playerBGlow: string;
    /** Accent color for valid moves, highlights */
    accent?: string;
  };
}

/**
 * Theme Variant Metadata
 * Used for organizing themes in the selector UI
 */
export interface ThemeVariant {
  /** Theme ID */
  id: string;
  /** Display name */
  name: string;
  /** Short description */
  description: string;
  /** Preview thumbnail path (optional) */
  thumbnail?: string;
  /** Category for grouping themes */
  category?: 'nature' | 'urban' | 'fantasy' | 'abstract' | 'custom';
}
