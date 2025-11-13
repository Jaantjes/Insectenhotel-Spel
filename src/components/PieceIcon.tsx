import { cn } from '@/lib/utils';
import { PieceType, Player } from '@/types/game';
import { useTheme } from '@/themes';

interface PieceIconProps {
  type: PieceType;
  player: Player;
  className?: string;
  showFlag?: boolean;
}

const PieceIcon = ({ type, player, className, showFlag = true }: PieceIconProps) => {
  const { theme } = useTheme();

  // Get icon from current theme
  const icon = theme.pieces[type];

  // Dynamic glow based on theme colors
  const glowClass = player === 'A'
    ? 'ring-slate-300 bg-white/40 drop-shadow-[0_0_50px_rgba(255,255,255,0.8)] drop-shadow-[0_0_40px_rgba(255,255,255,0.7)] drop-shadow-[0_0_30px_rgba(255,255,255,0.6)] drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]'
    : 'ring-blue-600 bg-blue-500/30 drop-shadow-[0_0_50px_rgba(59,130,246,0.8)] drop-shadow-[0_0_40px_rgba(59,130,246,0.7)] drop-shadow-[0_0_30px_rgba(59,130,246,0.6)] drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]';

  return (
    <span className={cn(
      "relative inline-block rounded-lg p-[1.5px] ring-[1px]",
      glowClass,
      className
    )}>
      <span className="relative z-10">
        {icon}
      </span>
    </span>
  );
};

export default PieceIcon;
