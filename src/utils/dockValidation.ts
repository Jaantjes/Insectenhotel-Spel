import { PieceType, Player, GamePiece, DockPosition, MoveHistory } from '@/types/game';
import { PLAYER_DOCKS, DOCK_ACCESS_CONFIG } from './gameConstants';

/**
 * Check if a piece can slide directly to a dock from a board square
 */
export function canSlideDirectlyToDock(
  fromSquare: string,
  dock: DockPosition,
  pieceType: PieceType,
  player: Player,
  boardState: Record<string, GamePiece>,
  moveHistory?: MoveHistory
): boolean {
  // Check if dock belongs to player (you load into your own docks)
  const playerDocks = PLAYER_DOCKS[player];
  if (!playerDocks.includes(dock)) return false;
  
  // Get dock access configuration
  const accessConfig = DOCK_ACCESS_CONFIG[dock];
  
  // Check if fromSquare is in slideAccess list
  const slideEntry = accessConfig.slideAccess.find(
    entry => entry.square === fromSquare
  );
  
  if (!slideEntry) return false;
  
  // Schuifzet: alle stukken kunnen naar aangrenzende docks schuiven
  return true;
}

/**
 * Check if a piece can jump to a dock over another piece
 * Returns both whether the jump is possible and which square is being jumped over
 */
export function canJumpToDock(
  fromSquare: string,
  dock: DockPosition,
  pieceType: PieceType,
  player: Player,
  boardState: Record<string, GamePiece>,
  moveHistory?: MoveHistory
): { canJump: boolean; jumpOverSquare: string | null } {
  console.log('🔍 canJumpToDock called:', {
    fromSquare,
    dock,
    pieceType,
    player,
    moveHistory
  });

  // Check if dock belongs to player (you load into your own docks)
  const playerDocks = PLAYER_DOCKS[player];
  console.log('🎯 Player docks:', playerDocks);

  if (!playerDocks.includes(dock)) {
    console.log('❌ Dock not in player docks');
    return { canJump: false, jumpOverSquare: null };
  }
  
  // Get dock access configuration
  const accessConfig = DOCK_ACCESS_CONFIG[dock];
  console.log('📋 Access config for dock:', accessConfig);
  
  // Check each possible jump access
  for (const jumpEntry of accessConfig.jumpAccess) {
    console.log('🔄 Checking jump entry:', jumpEntry);
    
    // Check if this jump matches our fromSquare
    if (jumpEntry.fromSquare !== fromSquare) {
      console.log('❌ fromSquare mismatch:', { expected: jumpEntry.fromSquare, actual: fromSquare });
      continue;
    }
    
    // Check if there's a piece on the overSquare to jump over
    const pieceToJumpOver = boardState[jumpEntry.overSquare];
    console.log('🎲 Piece to jump over at', jumpEntry.overSquare, ':', pieceToJumpOver);
    
    if (!pieceToJumpOver) {
      console.log('❌ No piece to jump over');
      continue;
    }
    
    // Validate piece-specific movement rules
    const direction = jumpEntry.direction;
    let isValidForPiece = false;
    
    switch (pieceType) {
      case 'egg':
        isValidForPiece = direction === 'straight';
        console.log('🥚 Egg validation:', { direction, isValidForPiece });
        break;
      
      case 'tulip':
        isValidForPiece = direction === 'diagonal';
        console.log('🌷 Tulip validation:', { direction, isValidForPiece });
        break;
      
      case 'cheese':
        if (moveHistory?.direction) {
          isValidForPiece = direction === moveHistory.direction;
        } else {
          isValidForPiece = true;
        }
        console.log('🧀 Cheese validation:', { direction, moveHistory: moveHistory?.direction, isValidForPiece });
        break;
      
      case 'butter':
        if (moveHistory?.direction) {
          isValidForPiece = direction !== moveHistory.direction;
        } else {
          isValidForPiece = true;
        }
        console.log('🧈 Butter validation:', { direction, moveHistory: moveHistory?.direction, isValidForPiece });
        break;
    }
    
    if (isValidForPiece) {
      console.log('✅ Valid jump found!');
      return { canJump: true, jumpOverSquare: jumpEntry.overSquare };
    }
  }
  
  console.log('❌ No valid jump found');
  return { canJump: false, jumpOverSquare: null };
}

/**
 * Get all valid docks that a piece can reach from a given position
 */
export function getValidDocksForPiece(
  fromSquare: string,
  pieceType: PieceType,
  player: Player,
  boardState: Record<string, GamePiece>,
  moveHistory?: MoveHistory
): DockPosition[] {
  console.log('🚢 getValidDocksForPiece called:', {
    fromSquare,
    pieceType,
    player,
    moveHistory
  });

  const validDocks: DockPosition[] = [];
  const playerDocks = PLAYER_DOCKS[player];

  console.log('🎯 Checking player docks:', playerDocks);

  for (const dock of playerDocks) {
    // During jump chain: only allow jumps to docks
    if (moveHistory && moveHistory.positions.length > 0) {
      // We're in a jump chain - only check jumps
      const { canJump } = canJumpToDock(fromSquare, dock, pieceType, player, boardState, moveHistory);
      if (canJump) {
        console.log('✅ Can jump to dock (in chain):', dock);
        validDocks.push(dock);
      }
    } else {
      // Not in jump chain - allow both slides and jumps
      
      // Check if can slide directly
      if (canSlideDirectlyToDock(fromSquare, dock, pieceType, player, boardState, moveHistory)) {
        console.log('✅ Can slide to dock:', dock);
        validDocks.push(dock);
        continue;
      }
      
      // Check if can jump to dock
      const { canJump } = canJumpToDock(fromSquare, dock, pieceType, player, boardState, moveHistory);
      if (canJump) {
        console.log('✅ Can jump to dock:', dock);
        validDocks.push(dock);
      }
    }
  }
  
  console.log('📊 Valid docks result:', validDocks);
  return validDocks;
}
