export type PieceType = 'cheese' | 'butter' | 'egg' | 'tulip';
export type Player = 'A' | 'B';
export type Direction = 'straight' | 'diagonal';

export interface GamePiece {
  type: PieceType;
  player: Player;
}

export interface Position {
  row: number;
  col: number;
}

export interface MoveHistory {
  direction: Direction | null;
  positions: string[];
}

export type DockPosition = 'A0' | 'B0' | 'C0' | 'D0' | 'E0' | 'F0' | 'G0' | 'H0' | 'A9' | 'B9' | 'C9' | 'D9' | 'E9' | 'F9' | 'G9' | 'H9';

export interface ShipGoods {
  type: PieceType;
  player: Player;
}

export interface ShipState {
  id: string;
  loadingPoint: DockPosition;
  goods: Array<ShipGoods | null>;
  score?: number;
  noScore?: boolean; // True for corner positions that don't give points
}
