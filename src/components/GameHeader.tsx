import { cn } from '@/lib/utils';
import { ThemeSelector } from './ThemeSelector';
import insectenhotelLogo from '@/assets/insectenhotel-logo.jpg';

interface GameHeaderProps {
  className?: string;
  currentPlayer?: 'A' | 'B';
}

const GameHeader = ({ className, currentPlayer = 'A' }: GameHeaderProps) => {
  return (
    <header className={cn("w-full bg-gradient-to-r from-sea-deep to-sea-blue text-primary-foreground py-4 px-6 shadow-lg", className)}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <img
            src={insectenhotelLogo}
            alt="Insectenhotel"
            className="h-12 w-12 object-cover rounded-lg shadow-md border-2 border-white/20"
          />
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Insectenhotel
          </h1>
        </div>
        <ThemeSelector />
      </div>
    </header>
  );
};

export default GameHeader;