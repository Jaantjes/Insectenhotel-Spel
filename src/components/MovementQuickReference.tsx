import { Card } from '@/components/ui/card';

const MovementQuickReference = () => {
  return (
    <Card className="p-4 max-w-sm">
      <h3 className="text-base font-bold text-primary mb-3">Bewegingsregels</h3>
      
      {/* Schuifzet */}
      <div className="mb-3 p-2 rounded-lg bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500">
        <div className="flex items-start gap-2">
          <span className="text-xl">➡️</span>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-sm mb-1">Schuifzet</h4>
            <p className="text-xs text-muted-foreground">
              Verplaats een stuk naar een aangrenzend leeg vakje, of naar één van je containerterminals.
            </p>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="relative my-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-2 text-xs font-medium text-muted-foreground">
            Sprongzetten
          </span>
        </div>
      </div>
      
      {/* Tuindieren - compact */}
      <div className="space-y-2">
        {/* Mier */}
        <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border-l-4 border-blue-500">
          <div className="flex items-center gap-2">
            <span className="text-lg">🐜</span>
            <div className="flex-1">
              <h5 className="font-semibold text-foreground text-xs">Mier</h5>
              <p className="text-xs text-muted-foreground">Alleen recht (↕️ ↔️)</p>
            </div>
          </div>
        </div>
        
        {/* Rups */}
        <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded border-l-4 border-purple-500">
          <div className="flex items-center gap-2">
            <span className="text-lg">🐛</span>
            <div className="flex-1">
              <h5 className="font-semibold text-foreground text-xs">Rups</h5>
              <p className="text-xs text-muted-foreground">Alleen diagonaal (⤢ ⤡)</p>
            </div>
          </div>
        </div>
        
        {/* Bij */}
        <div className="p-2 bg-teal-50 dark:bg-teal-950/30 rounded border-l-4 border-teal-500">
          <div className="flex items-center gap-2">
            <span className="text-lg">🐝</span>
            <div className="flex-1">
              <h5 className="font-semibold text-foreground text-xs">Bij</h5>
              <p className="text-xs text-muted-foreground">Recht of diagonaal (niet beide)</p>
            </div>
          </div>
        </div>
        
        {/* Vlinder */}
        <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded border-l-4 border-amber-500">
          <div className="flex items-center gap-2">
            <span className="text-lg">🦋</span>
            <div className="flex-1">
              <h5 className="font-semibold text-foreground text-xs">Vlinder</h5>
              <p className="text-xs text-muted-foreground">Afwisselend recht/diagonaal</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovementQuickReference;
