import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import Warehouse from './Warehouse';
import PieceIcon from './PieceIcon';

import { PieceType, Player, GamePiece, MoveHistory, DockPosition, ShipState } from '@/types/game';
import { COLUMNS, ROWS } from '@/utils/gameConstants';
import { getAllValidMoves, getSquareBetween, notationToPosition, getDirection } from '@/utils/moveValidation';
import { getValidDocksForPiece, canJumpToDock } from '@/utils/dockValidation';
import { calculateShipScore } from '@/utils/scoring';
import { useTheme } from '@/themes';

// Starting positions according to the rules
const INITIAL_POSITIONS: Record<string, GamePiece> = {
  // Player A (bottom)
  'A1': { type: 'butter', player: 'A' },
  'B1': { type: 'cheese', player: 'A' },
  'C1': { type: 'egg', player: 'A' },
  'D1': { type: 'tulip', player: 'A' },
  'E1': { type: 'tulip', player: 'A' },
  'F1': { type: 'egg', player: 'A' },
  'G1': { type: 'cheese', player: 'A' },
  'H1': { type: 'butter', player: 'A' },
  'A2': { type: 'egg', player: 'A' },
  'B2': { type: 'tulip', player: 'A' },
  'C2': { type: 'butter', player: 'A' },
  'D2': { type: 'cheese', player: 'A' },
  'E2': { type: 'cheese', player: 'A' },
  'F2': { type: 'butter', player: 'A' },
  'G2': { type: 'tulip', player: 'A' },
  'H2': { type: 'egg', player: 'A' },
  
  // Player B (top)
  'A8': { type: 'butter', player: 'B' },
  'B8': { type: 'cheese', player: 'B' },
  'C8': { type: 'egg', player: 'B' },
  'D8': { type: 'tulip', player: 'B' },
  'E8': { type: 'tulip', player: 'B' },
  'F8': { type: 'egg', player: 'B' },
  'G8': { type: 'cheese', player: 'B' },
  'H8': { type: 'butter', player: 'B' },
  'A7': { type: 'egg', player: 'B' },
  'B7': { type: 'tulip', player: 'B' },
  'C7': { type: 'butter', player: 'B' },
  'D7': { type: 'cheese', player: 'B' },
  'E7': { type: 'cheese', player: 'B' },
  'F7': { type: 'butter', player: 'B' },
  'G7': { type: 'tulip', player: 'B' },
  'H7': { type: 'egg', player: 'B' },
};

interface GameBoardProps {
  className?: string;
  onStatsChange?: (stats: {
    remainingPieces: {
      A: { cheese: number; butter: number; egg: number; tulip: number };
      B: { cheese: number; butter: number; egg: number; tulip: number };
    };
    currentPlayer: Player;
    scores: { A: number; B: number };
  }) => void;
}

const GameBoard = ({ className, onStatsChange }: GameBoardProps) => {
  const { theme } = useTheme();
  const [boardState, setBoardState] = useState<Record<string, GamePiece>>(INITIAL_POSITIONS);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('A');
  const [moveHistory, setMoveHistory] = useState<MoveHistory>({ direction: null, positions: [] });
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [validDocks, setValidDocks] = useState<DockPosition[]>([]);
  const [isInJumpChain, setIsInJumpChain] = useState(false);
  const [scores, setScores] = useState({ A: 0, B: 0 });

  // Extra turn mechanics - 4+ jumps rule
  const [jumpCount, setJumpCount] = useState(0);
  const [jumpedOverPieces, setJumpedOverPieces] = useState<Set<string>>(new Set());
  const [visitedSquares, setVisitedSquares] = useState<Set<string>>(new Set());
  const [hasExtraTurn, setHasExtraTurn] = useState(false);
  
  // Ship state - 4 scoring ships + 4 non-scoring corner positions per player
  // Player A (white) has row 9 docks, Player B (blue) has row 0 docks
  const [ships, setShips] = useState<{ A: ShipState[]; B: ShipState[] }>({
    A: [
      // Scoring positions (middle 4) - row 9
      { id: 'B9', loadingPoint: 'B9' as DockPosition, goods: [] },
      { id: 'C9', loadingPoint: 'C9' as DockPosition, goods: [] },
      { id: 'F9', loadingPoint: 'F9' as DockPosition, goods: [] },
      { id: 'G9', loadingPoint: 'G9' as DockPosition, goods: [] },
      // Non-scoring positions (corners) - row 9
      { id: 'A9', loadingPoint: 'A9' as DockPosition, goods: [], noScore: true },
      { id: 'D9', loadingPoint: 'D9' as DockPosition, goods: [], noScore: true },
      { id: 'E9', loadingPoint: 'E9' as DockPosition, goods: [], noScore: true },
      { id: 'H9', loadingPoint: 'H9' as DockPosition, goods: [], noScore: true },
    ],
    B: [
      // Scoring positions (middle 4) - row 0
      { id: 'B0', loadingPoint: 'B0' as DockPosition, goods: [] },
      { id: 'C0', loadingPoint: 'C0' as DockPosition, goods: [] },
      { id: 'F0', loadingPoint: 'F0' as DockPosition, goods: [] },
      { id: 'G0', loadingPoint: 'G0' as DockPosition, goods: [] },
      // Non-scoring positions (corners) - row 0
      { id: 'A0', loadingPoint: 'A0' as DockPosition, goods: [], noScore: true },
      { id: 'D0', loadingPoint: 'D0' as DockPosition, goods: [], noScore: true },
      { id: 'E0', loadingPoint: 'E0' as DockPosition, goods: [], noScore: true },
      { id: 'H0', loadingPoint: 'H0' as DockPosition, goods: [], noScore: true },
    ]
  });

  // Calculate remaining pieces from board state
  const calculateRemainingPieces = (): {
    A: { cheese: number; butter: number; egg: number; tulip: number };
    B: { cheese: number; butter: number; egg: number; tulip: number };
  } => {
    const remaining = {
      A: { cheese: 0, butter: 0, egg: 0, tulip: 0 },
      B: { cheese: 0, butter: 0, egg: 0, tulip: 0 }
    };

    Object.values(boardState).forEach(piece => {
      remaining[piece.player][piece.type]++;
    });

    return remaining;
  };

  // Update parent component when stats change
  useEffect(() => {
    if (onStatsChange) {
      onStatsChange({
        remainingPieces: calculateRemainingPieces(),
        currentPlayer,
        scores
      });
    }
  }, [boardState, currentPlayer, scores, onStatsChange]);

  const getSquareNotation = (row: number, col: number): string => {
    return `${COLUMNS[col]}${ROWS[row]}`;
  };

  const isLightSquare = (row: number, col: number): boolean => {
    return (row + col) % 2 === 0;
  };

  const getPieceIcon = (type: PieceType, player: Player): string => {
    const icons = {
      egg: '🐜',     // Mier
      tulip: '🐛',   // Rups
      cheese: '🐝',  // Bij
      butter: '🦋'   // Vlinder
    };
    return icons[type];
  };


  const handlePieceSelect = (notation: string) => {
    // Voorkom re-selectie tijdens jump chain
    if (isInJumpChain) {
      // Tijdens chain mag je alleen klikken om te bewegen, niet om opnieuw te selecteren
      return;
    }
    
    const piece = boardState[notation];
    console.log('🎯 Piece selected:', { notation, piece });
    console.log('📋 Current player:', currentPlayer);
    console.log('📋 Current boardState F7:', boardState['F7']);
    console.log('📋 Current boardState F8:', boardState['F8']);
    
    if (!piece || piece.player !== currentPlayer) return;
    
    setSelectedPiece(notation);
    
    // Calculate valid moves
    const moves = getAllValidMoves(notation, piece.type, boardState, currentPlayer, moveHistory);
    setValidMoves(moves);
    
    // Calculate valid docks
    const docks = getValidDocksForPiece(notation, piece.type, currentPlayer, boardState, moveHistory);
    console.log('🚢 Valid docks calculated:', docks);
    setValidDocks(docks);
  };

  const executeMove = (from: string, to: string) => {
    const piece = boardState[from];
    if (!piece) return;

    // Check if this was a jump move
    const jumpOverSquare = getSquareBetween(from, to);

    // Validate: no jumping over same piece twice or visiting same square twice
    if (jumpOverSquare && boardState[jumpOverSquare]) {
      if (jumpedOverPieces.has(jumpOverSquare)) {
        console.warn('Cannot jump over the same piece twice!');
        return;
      }
      if (visitedSquares.has(to)) {
        console.warn('Cannot visit the same square twice!');
        return;
      }
    }

    // Update board state
    const newBoardState = { ...boardState };
    delete newBoardState[from];
    newBoardState[to] = piece;
    setBoardState(newBoardState);

    if (jumpOverSquare && boardState[jumpOverSquare]) {
      // This is a jump - update move history and enable jump chain
      const jumpDirection = getDirection(from, to);

      // Track the jump
      setJumpCount(prev => prev + 1);
      setJumpedOverPieces(prev => new Set([...prev, jumpOverSquare]));
      // Always add both from and to positions (handles first jump of turn)
      setVisitedSquares(prev => {
        const newSet = new Set(prev);
        newSet.add(from);
        newSet.add(to);
        return newSet;
      });
      
      setMoveHistory({
        direction: jumpDirection,
        positions: [...moveHistory.positions, from, to]
      });
      setIsInJumpChain(true);
      
      // Keep piece selected and recalculate valid moves for potential chain
      setSelectedPiece(to);
      
      // During jump chain: only further jumps allowed (no slides, no dock loading)
      const nextMoveHistory = {
        direction: jumpDirection,
        positions: [...moveHistory.positions, from, to]
      };
      const allNextMoves = getAllValidMoves(to, piece.type, newBoardState, currentPlayer, nextMoveHistory);
      
      // Filter out slides - only allow jumps during chain
      const validJumps = allNextMoves.filter(move => {
        const jumpSquare = getSquareBetween(to, move);
        return jumpSquare && newBoardState[jumpSquare];
      });

      // Filter out: previous position, already visited squares, and already jumped-over pieces
      const validJumpsFiltered = validJumps.filter(move => {
        if (move === from) return false; // Can't jump back
        if (visitedSquares.has(move)) return false; // Can't visit same square twice

        const jumpSquare = getSquareBetween(to, move);
        if (jumpSquare && jumpedOverPieces.has(jumpSquare)) {
          return false; // Can't jump over same piece twice
        }

        return true;
      });
      
      // Check for valid dock moves during jump chain
      const validDocksInChain = getValidDocksForPiece(
        to, 
        piece.type, 
        currentPlayer, 
        newBoardState, 
        nextMoveHistory
      );
      
      // If no valid jumps remain AND no valid dock jumps, automatically end turn
      if (validJumpsFiltered.length === 0 && validDocksInChain.length === 0) {
        endTurn();
      } else {
        setValidMoves(validJumpsFiltered);
        setValidDocks(validDocksInChain);
      }
    } else {
      // This is a slide - end turn
      endTurn();
    }
  };

  const handleSquareClick = (notation: string) => {
    const piece = boardState[notation];
    
    if (selectedPiece && selectedPiece !== notation) {
      // Try to move to this square
      if (validMoves.includes(notation)) {
        executeMove(selectedPiece, notation);
      } else {
        // Invalid move - deselect or select new piece
        if (piece && piece.player === currentPlayer) {
          handlePieceSelect(notation);
        } else {
          setSelectedPiece(null);
          setValidMoves([]);
          setValidDocks([]);
        }
      }
    } else if (piece && piece.player === currentPlayer) {
      // Select this piece
      handlePieceSelect(notation);
    } else {
      // Deselect
      setSelectedPiece(null);
      setValidMoves([]);
      setValidDocks([]);
    }
  };

  const handleDockClick = (dock: DockPosition) => {
    if (!selectedPiece || !validDocks.includes(dock)) return;
    
    const piece = boardState[selectedPiece];
    if (!piece) return;
    
    // Players now load into their own docks (not opponent's)
    // Player A (white) loads into row 9, Player B (blue) loads into row 0

    // Find the ship at this dock (belonging to current player)
    const ship = ships[currentPlayer].find(s => s.loadingPoint === dock);
    if (!ship) return;
    
    // Check if ship has space
    if (ship.goods.filter(Boolean).length >= 4) return;
    
    // Check if this is a jump to dock
    const { canJump, jumpOverSquare } = canJumpToDock(
      selectedPiece,
      dock,
      piece.type,
      currentPlayer,
      boardState,
      moveHistory
    );

    // Track if this is a jump to dock and calculate new jump count
    let newJumpCount = jumpCount;
    if (canJump && jumpOverSquare) {
      newJumpCount = jumpCount + 1;
      setJumpCount(newJumpCount);
      setJumpedOverPieces(prev => new Set([...prev, jumpOverSquare]));
      setVisitedSquares(prev => {
        const newSet = new Set(prev);
        newSet.add(selectedPiece);
        newSet.add(dock);
        return newSet;
      });
    }

    // Calculate old score before adding new piece (only for scoring positions)
    const oldShipScore = ship.noScore ? 0 : (ship.score || 0);

    // Remove piece from board
    const newBoardState = { ...boardState };
    delete newBoardState[selectedPiece];
    setBoardState(newBoardState);

    // Add piece to current player's ship
    const newShips = { ...ships };
    const shipIndex = newShips[currentPlayer].findIndex(s => s.id === ship.id);
    const updatedShip = { ...newShips[currentPlayer][shipIndex] };
    updatedShip.goods = [...updatedShip.goods, { type: piece.type, player: piece.player }];

    // Calculate new score after adding piece (only for scoring positions)
    let newShipScore = 0;
    if (!ship.noScore) {
      newShipScore = calculateShipScore(updatedShip.goods.map(g => g?.type).filter(Boolean) as PieceType[]);
      updatedShip.score = newShipScore;
    }
    newShips[currentPlayer][shipIndex] = updatedShip;

    // Update total score: remove old ship score, add new ship score (only for scoring positions)
    if (!ship.noScore) {
      setScores(prev => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] - oldShipScore + newShipScore
      }));
    }

    setShips(newShips);

    // End turn - pass the updated jump count
    endTurnWithJumpCount(newJumpCount);
  };

  const endTurnWithJumpCount = (finalJumpCount: number) => {
    // Check if player earned extra turn (4+ jumps)
    if (finalJumpCount >= 4 && !hasExtraTurn) {
      console.log(`🎉 Extra turn earned! ${finalJumpCount} jumps made.`);
      // Grant extra turn - reset jump tracking but keep same player
      setJumpCount(0);
      setJumpedOverPieces(new Set());
      setVisitedSquares(new Set());
      setHasExtraTurn(true);
      setMoveHistory({ direction: null, positions: [] });
      setIsInJumpChain(false);
      setSelectedPiece(null);
      setValidMoves([]);
      setValidDocks([]);
      // Player stays the same - extra turn!
      return;
    }

    // Normal turn end - reset everything and switch player
    setSelectedPiece(null);
    setValidMoves([]);
    setValidDocks([]);
    setMoveHistory({ direction: null, positions: [] });
    setIsInJumpChain(false);
    setJumpCount(0);
    setJumpedOverPieces(new Set());
    setVisitedSquares(new Set());
    setHasExtraTurn(false);
    setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A');
  };

  const endTurn = () => {
    endTurnWithJumpCount(jumpCount);
  };

  // Loading points for ships - all have capacity of 4
  // Note: these are used for game logic, visual indicators are shown via Warehouse component
  const loadingPoints = ['B9', 'C9', 'F9', 'G9', 'B0', 'C0', 'F0', 'G0'];
  const isLoadingPoint = (notation: string) => loadingPoints.includes(notation);
  const getLoadingCapacity = () => 4;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Extra Turn Notification */}
      {hasExtraTurn && !isInJumpChain && (
        <div className="max-w-md mx-auto mb-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-500 rounded-lg">
          <p className="text-sm font-bold text-center text-green-800 dark:text-green-200">
            🎉 Extra Zet Verdiend! 🎉
          </p>
          <p className="text-xs text-center text-green-700 dark:text-green-300 mt-1">
            Speler {currentPlayer} mag nog een keer!
          </p>
        </div>
      )}

      {/* Jump Chain Controls - Above the board */}
      {isInJumpChain && (
        <div className="max-w-md mx-auto mb-4 p-4 bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500 rounded-lg">
          <p className="text-sm font-semibold mb-2 text-center">
            Jump Chain Active - {moveHistory.direction} direction
          </p>

          {/* Jump Counter with Progress */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Sprongen:</span>
              <span className={cn(
                "text-xs font-bold",
                jumpCount >= 4 ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-300"
              )}>
                {jumpCount}/4 {jumpCount >= 4 && "✓"}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  jumpCount >= 4 ? "bg-green-500" : "bg-yellow-500"
                )}
                style={{ width: `${Math.min((jumpCount / 4) * 100, 100)}%` }}
              />
            </div>
            {jumpCount >= 4 && (
              <p className="text-xs text-green-600 dark:text-green-400 font-semibold text-center mt-1">
                Extra zet na deze beurt!
              </p>
            )}
          </div>

          <p className="text-xs mb-3 text-center text-muted-foreground">
            Chain: {moveHistory.positions.join(' → ')}
          </p>
          <div className="flex justify-center">
            <Button onClick={endTurn} size="sm">
              End Turn
            </Button>
          </div>
        </div>
      )}

      {/* Water border container */}
      <div className="bg-gradient-to-br from-sea-blue via-sea-dark to-sea-blue p-8 rounded-2xl shadow-2xl">

        {/* Game board */}
        <div className="relative overflow-visible">
          {/* Main game board with garden background */}
          <div
            className="relative rounded-lg overflow-visible shadow-2xl"
            style={{
              width: '416px',
              height: '624px',
              backgroundImage: `url(${theme.board.image})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Row labels (left side) */}
            <div className="absolute -left-8 top-0 h-full flex flex-col">
              {ROWS.map((row, index) => (
                <div 
                  key={row} 
                  className={cn(
                    "flex items-center justify-center text-gray-700 font-bold",
                    (index === 0 || index === 9) ? "h-[104px]" : "h-[52px]"
                  )}
                >
                  {row}
                </div>
              ))}
            </div>

            {/* Column labels (top) */}
            <div className="absolute -top-8 left-0 w-full flex justify-around">
              {COLUMNS.map(col => (
                <div key={col} className="w-[52px] flex items-center justify-center text-gray-700 font-bold">
                  {col}
                </div>
              ))}
            </div>


            {/* 10x8 Grid overlay */}
            <div 
              className="absolute inset-0 grid grid-cols-8 gap-0 overflow-visible"
              style={{
                gridTemplateRows: 'repeat(10, minmax(52px, auto))',
              }}
            >
              {ROWS.map((displayRow, rowIndex) => 
                COLUMNS.map((col, colIndex) => {
                  const notation = getSquareNotation(rowIndex, colIndex);
                  const piece = boardState[notation];
                  const isSelected = selectedPiece === notation;
                  const isLoading = isLoadingPoint(notation);
                  const isFirstPlayableRow = rowIndex === 8; // Row 1 (A1-H1)
                  const isLastPlayableRow = rowIndex === 1; // Row 8 (A8-H8)
                  const isNorthSeaRow = rowIndex === 0; // Row 9 (dubbele hoogte)
                  const isGermanyRow = rowIndex === 9; // Row 0 (dubbele hoogte)
                  
                  return (
                    <button
                      key={notation}
                      onClick={() => handleSquareClick(notation)}
                      className={cn(
                        "w-[52px] h-[52px] flex items-center justify-center text-2xl transition-all duration-200 relative overflow-visible",
                        isNorthSeaRow && "!h-[104px] hover:bg-white/5 border border-white/10",
                        isGermanyRow && "!h-[104px] hover:bg-white/5 border border-white/10",
                        !isNorthSeaRow && !isGermanyRow && "bg-white/5 hover:bg-white/15 border border-white/20",
                        isSelected && "ring-4 ring-yellow-400 bg-yellow-200/20",
                        validMoves.includes(notation) && "ring-2 ring-green-400 animate-pulse bg-green-200/10",
                        piece && "hover:brightness-110 hover:bg-white/20"
                      )}
                    >
                      {/* Large insect hotel images - one per 2-cell dock */}
                      {['B9', 'F9', 'B0', 'F0'].includes(notation) && theme.dock.image && (
                        <div className="absolute top-0 left-0 w-[104px] h-[104px] pointer-events-none z-[5] flex items-center justify-center">
                          <div className="relative w-full h-full rounded-xl p-2 shadow-2xl">
                            <img
                              src={theme.dock.image}
                              alt="Insectenhotel"
                              className="w-full h-full object-contain rounded-lg drop-shadow-2xl brightness-105 saturate-110"
                            />
                          </div>
                        </div>
                      )}

                      {/* Warehouse rendering for all 8 dock positions per row */}
                      {['A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'A0', 'B0', 'C0', 'D0', 'E0', 'F0', 'G0', 'H0'].includes(notation) && (() => {
                        // Bepaal welke speler deze dock bezit (now players own their row)
                        const dockOwner: Player = notation.endsWith('9') ? 'A' : 'B';

                        // Vind de warehouse bij deze dock
                        const warehouse = ships[dockOwner].find(s => s.loadingPoint === notation as DockPosition);
                        if (!warehouse) return null;

                        // Bereken huidige score
                        const currentShipScore = warehouse.goods.length === 4 && warehouse.score !== undefined
                          ? warehouse.score
                          : (warehouse.goods.length > 0
                            ? calculateShipScore(warehouse.goods.map(g => g?.type).filter(Boolean) as PieceType[])
                            : 0);

                        return (
                          <div className="absolute inset-0 w-[52px] h-[104px] pointer-events-auto z-10">
                            <Warehouse
                              id={warehouse.id}
                              loadingPoint={warehouse.loadingPoint}
                              goods={warehouse.goods}
                              onDockClick={() => handleDockClick(notation as DockPosition)}
                              canLoad={validDocks.includes(notation as DockPosition)}
                              score={warehouse.score}
                              currentScore={currentShipScore}
                              noScore={warehouse.noScore}
                            />
                          </div>
                        );
                      })()}
                      
                      {/* Show notation only in row 9, not in row 0 or row 8 */}
                      {rowIndex === 0 && (
                        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-white/60">{notation}</span>
                      )}
                      
                      {/* Center dot in playable squares only (rows 1-8) */}
                      {rowIndex >= 2 && rowIndex <= 9 && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-400/40 rounded-full pointer-events-none z-0" />
                      )}
                      
                      {piece && (
                        <span className={cn(
                          "transition-transform duration-200 z-10",
                          isSelected && "animate-slide-piece"
                        )}>
                          <PieceIcon 
                            type={piece.type} 
                            player={piece.player} 
                            showFlag={true}
                          />
                        </span>
                      )}
                      
                      {/* Loading point indicator - REMOVED */}
                      
                      {/* Square notation */}
                      <span className="absolute bottom-0 right-0 text-[8px] opacity-30 font-mono text-gray-700 font-bold">
                        {notation}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Game Status */}
      <div className="mt-6 space-y-4">
        {/* Current Turn */}
        <div className="text-center">
          <p className="text-lg font-bold text-primary">
            Current Turn: Player {currentPlayer}
          </p>
          {selectedPiece && (
            <p className="text-sm text-muted-foreground">
              Selected: {selectedPiece} ({boardState[selectedPiece]?.type})
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default GameBoard;