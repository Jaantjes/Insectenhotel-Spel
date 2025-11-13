import { PieceType, GamePiece, Position, Direction, MoveHistory, Player } from '@/types/game';
import { COLUMNS, ROWS } from './gameConstants';

/**
 * Convert chess notation to position coordinates
 */
export function notationToPosition(notation: string): Position | null {
  if (notation.length < 2) return null;
  
  const col = notation.charCodeAt(0) - 65; // A=0, B=1, etc.
  const rowNumber = parseInt(notation.substring(1)); // Get the row number (can be negative or double digit)
  
  // Find the index of this row number in ROWS array
  const row = ROWS.indexOf(rowNumber);
  
  if (col < 0 || col > 7 || row === -1) return null;
  
  return { row, col };
}

/**
 * Convert position coordinates to chess notation
 */
export function positionToNotation(pos: Position): string {
  return `${COLUMNS[pos.col]}${ROWS[pos.row]}`;
}

/**
 * Get the direction of movement between two squares
 */
export function getDirection(from: string, to: string): Direction | null {
  const fromPos = notationToPosition(from);
  const toPos = notationToPosition(to);
  
  if (!fromPos || !toPos) return null;
  
  const rowDiff = Math.abs(toPos.row - fromPos.row);
  const colDiff = Math.abs(toPos.col - fromPos.col);
  
  // Straight: same row or column
  if ((rowDiff === 0 && colDiff > 0) || (colDiff === 0 && rowDiff > 0)) {
    return 'straight';
  }
  
  // Diagonal: equal row and column difference
  if (rowDiff === colDiff && rowDiff > 0) {
    return 'diagonal';
  }
  
  return null;
}

/**
 * Check if two squares are adjacent
 */
export function isAdjacent(from: string, to: string): boolean {
  const fromPos = notationToPosition(from);
  const toPos = notationToPosition(to);
  
  if (!fromPos || !toPos) return false;
  
  const rowDiff = Math.abs(toPos.row - fromPos.row);
  const colDiff = Math.abs(toPos.col - fromPos.col);
  
  return (rowDiff <= 1 && colDiff <= 1) && (rowDiff + colDiff > 0);
}

/**
 * Get the square between two positions (for jump validation)
 */
export function getSquareBetween(from: string, to: string): string | null {
  const fromPos = notationToPosition(from);
  const toPos = notationToPosition(to);
  
  if (!fromPos || !toPos) return null;
  
  const rowDiff = toPos.row - fromPos.row;
  const colDiff = toPos.col - fromPos.col;
  
  // Must be exactly 2 squares apart in at least one direction
  if (Math.abs(rowDiff) !== 2 && Math.abs(colDiff) !== 2) return null;
  
  // For diagonal jumps, both must be 2
  if (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2) {
    const midRow = fromPos.row + rowDiff / 2;
    const midCol = fromPos.col + colDiff / 2;
    return positionToNotation({ row: midRow, col: midCol });
  }
  
  // For straight jumps, one must be 2 and the other 0
  if (Math.abs(rowDiff) === 2 && colDiff === 0) {
    const midRow = fromPos.row + rowDiff / 2;
    return positionToNotation({ row: midRow, col: fromPos.col });
  }
  
  if (Math.abs(colDiff) === 2 && rowDiff === 0) {
    const midCol = fromPos.col + colDiff / 2;
    return positionToNotation({ row: fromPos.row, col: midCol });
  }
  
  return null;
}

/**
 * Validate if a slide move is legal
 */
export function isValidSlideMove(
  from: string,
  to: string,
  pieceType: PieceType,
  boardState: Record<string, GamePiece>,
  moveHistory?: MoveHistory
): boolean {
  // Target must be empty
  if (boardState[to]) return false;
  
  // Must be adjacent
  if (!isAdjacent(from, to)) return false;
  
  const direction = getDirection(from, to);
  if (!direction) return false;
  
  // All pieces can slide in any direction (straight or diagonal) to adjacent empty squares
  return true;
}

/**
 * Validate if a jump move is legal
 */
export function isValidJumpMove(
  from: string,
  to: string,
  pieceType: PieceType,
  boardState: Record<string, GamePiece>,
  currentPlayer: Player,
  moveHistory?: MoveHistory
): boolean {
  const jumpOverSquare = getSquareBetween(from, to);
  if (!jumpOverSquare) return false;
  
  const jumpedPiece = boardState[jumpOverSquare];
  
  // Must have a piece to jump over (own OR opponent)
  if (!jumpedPiece) return false;
  
  // Landing square must be empty
  if (boardState[to]) return false;
  
  const direction = getDirection(from, to);
  if (!direction) return false;
  
  // Check piece-specific movement rules
  switch (pieceType) {
    case 'egg':
      return direction === 'straight';
    
    case 'tulip':
      return direction === 'diagonal';
    
    case 'cheese':
      // Can jump either direction, but in a jump chain must maintain same direction
      if (moveHistory?.direction) {
        return direction === moveHistory.direction;
      }
      return true;
    
    case 'butter':
      // Must alternate directions in jump chains
      if (moveHistory?.direction) {
        return direction !== moveHistory.direction;
      }
      return true;
    
    default:
      return false;
  }
}

/**
 * Get all valid moves for a piece at a given position
 */
export function getAllValidMoves(
  from: string,
  pieceType: PieceType,
  boardState: Record<string, GamePiece>,
  currentPlayer: Player,
  moveHistory?: MoveHistory
): string[] {
  const validMoves: string[] = [];
  const fromPos = notationToPosition(from);
  
  if (!fromPos) return validMoves;
  
  // Check all possible playable squares on the board (rows 1-8, which are indices 1-8 in ROWS array [9,8,7,6,5,4,3,2,1,0])
  for (let row = 1; row <= 8; row++) {
    for (let col = 0; col < 8; col++) {
      const to = positionToNotation({ row, col });
      
      // Skip same square
      if (to === from) continue;
      
      // Check if it's a valid slide
      if (isValidSlideMove(from, to, pieceType, boardState, moveHistory)) {
        validMoves.push(to);
      }
      
      // Check if it's a valid jump
      if (isValidJumpMove(from, to, pieceType, boardState, currentPlayer, moveHistory)) {
        validMoves.push(to);
      }
    }
  }
  
  return validMoves;
}
