import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [gameMode, setGameMode] = useState<'local' | 'ai' | null>(null);

  const startGame = (mode: 'local' | 'ai') => {
    setGameMode(mode);
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sea-deep via-sea-blue to-sea-light flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md w-full">
        {/* Title Section */}
        <div className="space-y-4">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground tracking-wide">
            Insectenhotel
          </h1>
          <p className="text-xl text-primary-foreground/80">
            Strategisch Bordspel
          </p>
          
          {/* Tuindieren Icons */}
          <div className="flex justify-center gap-4 text-4xl">
            <span>🐜</span>
            <span>🐛</span>
            <span>🐝</span>
            <span>🦋</span>
          </div>
        </div>

        {/* Game Mode Selection */}
        <Card className="p-6 bg-card/90 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6 text-card-foreground">
            Kies Spelmodus
          </h2>
          
          <div className="space-y-4">
            <Button 
              onClick={() => startGame('local')}
              size="lg"
              className="w-full bg-wood-medium hover:bg-wood-dark text-wood-dark hover:text-primary-foreground transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <div>
                  <div className="font-bold">2 Spelers Lokaal</div>
                  <div className="text-sm opacity-80">Speel met een vriend</div>
                </div>
              </div>
            </Button>
            
            <Button 
              onClick={() => startGame('ai')}
              size="lg"
              variant="secondary"
              className="w-full"
              disabled
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <div className="font-bold">Tegen AI</div>
                  <div className="text-sm opacity-60">Binnenkort Beschikbaar</div>
                </div>
              </div>
            </Button>
          </div>
        </Card>

        {/* Game Description */}
        <div className="text-center text-primary-foreground/70 text-sm space-y-2">
          <p>Beweeg je insecten strategisch over het tuinbord naar de eindstreep.</p>
          <p>Scoor punten met slimme zetten en win de race!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
