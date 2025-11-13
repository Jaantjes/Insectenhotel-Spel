import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import PieceIcon from './PieceIcon';
import { PieceType } from '@/types/game';

interface GameStatsProps {
  className?: string;
  playerAScore?: number;
  playerBScore?: number;
  currentTurn?: 'A' | 'B';
  remainingPieces?: {
    A: Record<string, number>;
    B: Record<string, number>;
  };
}

const GameStats = ({ 
  className,
  playerAScore = 0,
  playerBScore = 0,
  currentTurn = 'A',
  remainingPieces = {
    A: { cheese: 2, butter: 2, egg: 2, tulip: 2 },
    B: { cheese: 2, butter: 2, egg: 2, tulip: 2 }
  }
}: GameStatsProps) => {
  
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl", className)}>
      {/* Player A Stats */}
      <Card className={cn(
        "p-4 transition-all duration-300",
        currentTurn === 'A' ? "ring-2 ring-sea-blue bg-sea-light/10" : "bg-card"
      )}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground">
            Speler A {currentTurn === 'A' && <span className="text-sea-blue">← Current</span>}
          </h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Remaining Pieces:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(remainingPieces.A).map(([type, count]) => (
                <div key={type} className="flex items-center gap-1 bg-muted rounded-md px-2 py-1">
                  <PieceIcon type={type as PieceType} player="A" showFlag={true} />
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Score:</h4>
            <div className="text-3xl font-bold text-primary">
              {playerAScore}
            </div>
          </div>
        </div>
      </Card>

      {/* Player B Stats */}
      <Card className={cn(
        "p-4 transition-all duration-300",
        currentTurn === 'B' ? "ring-2 ring-sea-blue bg-sea-light/10" : "bg-card"
      )}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground">
            Speler B {currentTurn === 'B' && <span className="text-sea-blue">← Current</span>}
          </h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Remaining Pieces:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(remainingPieces.B).map(([type, count]) => (
                <div key={type} className="flex items-center gap-1 bg-muted rounded-md px-2 py-1">
                  <PieceIcon type={type as PieceType} player="B" showFlag={true} />
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Score:</h4>
            <div className="text-3xl font-bold text-primary">
              {playerBScore}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameStats;