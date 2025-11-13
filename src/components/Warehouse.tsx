import { cn } from '@/lib/utils';
import { PieceType, ShipGoods } from '@/types/game';
import { useTheme } from '@/themes';

interface WarehouseProps {
  id: string;
  loadingPoint: string;
  goods: Array<ShipGoods | null>;
  onDockClick: () => void;
  canLoad?: boolean;
  score?: number;
  currentScore?: number;
  className?: string;
  noScore?: boolean;
}

const Warehouse = ({
  id,
  loadingPoint,
  goods,
  onDockClick,
  canLoad = false,
  score,
  currentScore,
  className,
  noScore
}: WarehouseProps) => {
  const { theme } = useTheme();

  // Count goods by type
  const goodsCounts = goods.reduce((acc, good) => {
    if (good) {
      const key = `${good.type}-${good.player}`;
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const getPieceName = (type: PieceType | null, player?: 'A' | 'B'): string => {
    if (!type) return '';

    // Get piece name from theme (with fallback to Dutch names)
    if (theme.pieceNames) {
      return theme.pieceNames[type];
    }

    // Fallback to default Dutch names
    const transportNames = {
      egg: 'Mier',
      tulip: 'Rups',
      cheese: 'Bij',
      butter: 'Vlinder'
    };
    return transportNames[type];
  };

  const getPieceIcon = (type: PieceType | null, player?: 'A' | 'B'): string => {
    if (!type) return '';

    // Get icon from current theme
    return theme.pieces[type];
  };

  // Determine player based on loading point (9 = Player A (white), 0 = Player B (blue))
  const isRow9 = loadingPoint.endsWith('9');
  
  return (
    <div className="relative w-full h-full overflow-visible">
      {/* Stippellijn vlak - Het klikbare gebied */}
      <div
        className={cn(
          "relative w-full h-full cursor-pointer overflow-visible",
          !noScore && "border-[5px] border-dashed rounded-lg",
          "transition-all duration-300",
          !noScore && (isRow9
            ? "border-white bg-white/20"
            : "border-blue-600 bg-blue-500/20"),
          canLoad && isRow9 && "border-white bg-white/40 animate-pulse shadow-2xl shadow-white/80 ring-4 ring-white scale-105",
          canLoad && !isRow9 && "border-blue-800 bg-blue-600/40 animate-pulse shadow-2xl shadow-blue-600/80 ring-4 ring-blue-600 scale-105",
          className
        )}
        onClick={onDockClick}
      >
        {/* Score indicators - Boven het vlak (alleen voor scoring docks) */}
        {!noScore && score !== undefined && (
          <div className={cn(
            "absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2 py-0.5 rounded-md text-xs font-bold shadow-lg border border-white whitespace-nowrap",
            isRow9 ? "-top-8" : "-bottom-8"
          )}>
            +{score}
          </div>
        )}

        {!noScore && currentScore !== undefined && currentScore > 0 && score === undefined && (
          <div className={cn(
            "absolute left-1/2 -translate-x-1/2 bg-amber-600/90 text-white px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap",
            isRow9 ? "-top-6" : "-bottom-6"
          )}>
            {currentScore}
          </div>
        )}

        {/* Goods display - Binnen het vlak */}
        <div className="absolute inset-1 flex flex-col gap-0.5 overflow-hidden">
          {Object.entries(goodsCounts).length > 0 ? (
            Object.entries(goodsCounts).map(([key, count]) => {
              const [type, player] = key.split('-') as [PieceType, 'A' | 'B'];
              return (
                <div
                  key={key}
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded-sm px-1 py-0.5 flex items-center gap-1"
                >
                  <span className={cn(
                    "text-base leading-none",
                    player === 'A' ? "text-slate-300" : "text-blue-400"
                  )}>
                    {getPieceIcon(type, player)}
                  </span>
                  <span className={cn(
                    "text-[9px] font-bold leading-none text-stone-200",
                    player === 'B'
                      ? "drop-shadow-[0_0_8px_hsl(var(--player-b-glow)/1)]"
                      : "drop-shadow-[0_0_8px_hsl(var(--player-a-glow)/1)]"
                  )}>
                    {count}x
                  </span>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center overflow-visible">
              {/* Empty dock - insect hotel image is shown in GameBoard.tsx */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
