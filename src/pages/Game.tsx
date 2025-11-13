import { useState } from 'react';
import GameHeader from '@/components/GameHeader';
import GameBoard from '@/components/GameBoard';
import GameStats from '@/components/GameStats';
import RulesPanel from '@/components/RulesPanel';
import MovementQuickReference from '@/components/MovementQuickReference';

const Game = () => {
  const [gameStats, setGameStats] = useState<{
    remainingPieces: {
      A: { cheese: number; butter: number; egg: number; tulip: number };
      B: { cheese: number; butter: number; egg: number; tulip: number };
    };
    currentPlayer: 'A' | 'B';
    scores: { A: number; B: number };
  }>({
    remainingPieces: {
      A: { cheese: 4, butter: 3, egg: 3, tulip: 4 },
      B: { cheese: 4, butter: 3, egg: 3, tulip: 4 }
    },
    currentPlayer: 'A',
    scores: { A: 0, B: 0 }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sea-light to-background">
      <GameHeader currentPlayer={gameStats.currentPlayer} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          {/* Game Statistics */}
          <GameStats 
            currentTurn={gameStats.currentPlayer}
            remainingPieces={gameStats.remainingPieces}
            playerAScore={gameStats.scores.A}
            playerBScore={gameStats.scores.B}
          />
          
          {/* Main Game Area with Rules and Board */}
          <div className="flex gap-8 items-start w-full justify-center">
            {/* Rules Panel - Left Side */}
            <div className="hidden lg:block">
              <div className="space-y-4">
                <MovementQuickReference />
                <RulesPanel />
              </div>
            </div>
            
            {/* Game Board - Center */}
            <div className="flex justify-center">
              <GameBoard 
                className="max-w-fit" 
                onStatsChange={setGameStats}
              />
            </div>
          </div>
          
          {/* Mobile Rules - Below board on smaller screens */}
          <div className="lg:hidden w-full max-w-2xl space-y-4">
            <MovementQuickReference />
            <RulesPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;