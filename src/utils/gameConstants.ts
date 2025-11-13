import { Player, DockPosition, Direction } from '@/types/game';

// Chess notation mapping
export const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const ROWS = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

// Dock positions per player
export const PLAYER_DOCKS: Record<Player, DockPosition[]> = {
  A: ['A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9'],  // White plays to row 9
  B: ['A0', 'B0', 'C0', 'D0', 'E0', 'F0', 'G0', 'H0']   // Blue plays to row 0
};

// All dock positions (boat positions)
export const DOCK_POSITIONS: DockPosition[] = ['B0', 'C0', 'F0', 'G0', 'B9', 'C9', 'F9', 'G9'];

// Dock access configuration - defines exact slide and jump access for each boat
export interface DockAccessConfig {
  slideAccess: Array<{ square: string; direction: Direction }>;
  jumpAccess: Array<{ fromSquare: string; overSquare: string; direction: Direction }>;
}

export const DOCK_ACCESS_CONFIG: Record<DockPosition, DockAccessConfig> = {
  // Player A (white) docks (rij 9)
  'A9': {
    slideAccess: [
      { square: 'A8', direction: 'straight' },
      { square: 'B8', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'A7', overSquare: 'A8', direction: 'straight' },
      { fromSquare: 'C7', overSquare: 'B8', direction: 'diagonal' }
    ]
  },

  'B9': {
    slideAccess: [
      { square: 'A8', direction: 'diagonal' },
      { square: 'B8', direction: 'straight' },
      { square: 'C8', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'B7', overSquare: 'B8', direction: 'straight' },
      { fromSquare: 'D7', overSquare: 'C8', direction: 'diagonal' }
    ]
  },
  
  'C9': {
    slideAccess: [
      { square: 'B8', direction: 'diagonal' },
      { square: 'C8', direction: 'straight' },
      { square: 'D8', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'C7', overSquare: 'C8', direction: 'straight' },
      { fromSquare: 'A7', overSquare: 'B8', direction: 'diagonal' },
      { fromSquare: 'E7', overSquare: 'D8', direction: 'diagonal' }
    ]
  },

  'D9': {
    slideAccess: [
      { square: 'C8', direction: 'diagonal' },
      { square: 'D8', direction: 'straight' },
      { square: 'E8', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'D7', overSquare: 'D8', direction: 'straight' },
      { fromSquare: 'B7', overSquare: 'C8', direction: 'diagonal' },
      { fromSquare: 'F7', overSquare: 'E8', direction: 'diagonal' }
    ]
  },

  'E9': {
    slideAccess: [
      { square: 'D8', direction: 'diagonal' },
      { square: 'E8', direction: 'straight' },
      { square: 'F8', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'E7', overSquare: 'E8', direction: 'straight' },
      { fromSquare: 'C7', overSquare: 'D8', direction: 'diagonal' },
      { fromSquare: 'G7', overSquare: 'F8', direction: 'diagonal' }
    ]
  },
  
  'F9': {
    slideAccess: [
      { square: 'E8', direction: 'diagonal' },
      { square: 'F8', direction: 'straight' },
      { square: 'G8', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'F7', overSquare: 'F8', direction: 'straight' },
      { fromSquare: 'D7', overSquare: 'E8', direction: 'diagonal' },
      { fromSquare: 'H7', overSquare: 'G8', direction: 'diagonal' }
    ]
  },
  
  'G9': {
    slideAccess: [
      { square: 'F8', direction: 'diagonal' },
      { square: 'G8', direction: 'straight' },
      { square: 'H8', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'G7', overSquare: 'G8', direction: 'straight' },
      { fromSquare: 'E7', overSquare: 'F8', direction: 'diagonal' }
    ]
  },

  'H9': {
    slideAccess: [
      { square: 'G8', direction: 'diagonal' },
      { square: 'H8', direction: 'straight' }
    ],
    jumpAccess: [
      { fromSquare: 'H7', overSquare: 'H8', direction: 'straight' },
      { fromSquare: 'F7', overSquare: 'G8', direction: 'diagonal' }
    ]
  },

  // Player B (blue) docks (rij 0)
  'A0': {
    slideAccess: [
      { square: 'A1', direction: 'straight' },
      { square: 'B1', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'A2', overSquare: 'A1', direction: 'straight' },
      { fromSquare: 'C2', overSquare: 'B1', direction: 'diagonal' }
    ]
  },

  'B0': {
    slideAccess: [
      { square: 'A1', direction: 'diagonal' },
      { square: 'B1', direction: 'straight' },
      { square: 'C1', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'B2', overSquare: 'B1', direction: 'straight' },
      { fromSquare: 'D2', overSquare: 'C1', direction: 'diagonal' }
    ]
  },
  
  'C0': {
    slideAccess: [
      { square: 'B1', direction: 'diagonal' },
      { square: 'C1', direction: 'straight' },
      { square: 'D1', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'C2', overSquare: 'C1', direction: 'straight' },
      { fromSquare: 'A2', overSquare: 'B1', direction: 'diagonal' },
      { fromSquare: 'E2', overSquare: 'D1', direction: 'diagonal' }
    ]
  },

  'D0': {
    slideAccess: [
      { square: 'C1', direction: 'diagonal' },
      { square: 'D1', direction: 'straight' },
      { square: 'E1', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'D2', overSquare: 'D1', direction: 'straight' },
      { fromSquare: 'B2', overSquare: 'C1', direction: 'diagonal' },
      { fromSquare: 'F2', overSquare: 'E1', direction: 'diagonal' }
    ]
  },

  'E0': {
    slideAccess: [
      { square: 'D1', direction: 'diagonal' },
      { square: 'E1', direction: 'straight' },
      { square: 'F1', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'E2', overSquare: 'E1', direction: 'straight' },
      { fromSquare: 'C2', overSquare: 'D1', direction: 'diagonal' },
      { fromSquare: 'G2', overSquare: 'F1', direction: 'diagonal' }
    ]
  },
  
  'F0': {
    slideAccess: [
      { square: 'E1', direction: 'diagonal' },
      { square: 'F1', direction: 'straight' },
      { square: 'G1', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'F2', overSquare: 'F1', direction: 'straight' },
      { fromSquare: 'D2', overSquare: 'E1', direction: 'diagonal' },
      { fromSquare: 'H2', overSquare: 'G1', direction: 'diagonal' }
    ]
  },
  
  'G0': {
    slideAccess: [
      { square: 'F1', direction: 'diagonal' },
      { square: 'G1', direction: 'straight' },
      { square: 'H1', direction: 'diagonal' }
    ],
    jumpAccess: [
      { fromSquare: 'G2', overSquare: 'G1', direction: 'straight' },
      { fromSquare: 'E2', overSquare: 'F1', direction: 'diagonal' }
    ]
  },

  'H0': {
    slideAccess: [
      { square: 'G1', direction: 'diagonal' },
      { square: 'H1', direction: 'straight' }
    ],
    jumpAccess: [
      { fromSquare: 'H2', overSquare: 'H1', direction: 'straight' },
      { fromSquare: 'F2', overSquare: 'G1', direction: 'diagonal' }
    ]
  }
};
