import { Card } from '@/components/ui/card';
const RulesPanel = () => {
  return <Card className="p-6 max-w-sm h-fit sticky top-8">
      <div className="space-y-6 text-sm">
        {/* Speluitleg */}
        <div>
          <h3 className="text-lg font-bold text-primary mb-3">Speluitleg</h3>
          <p className="text-muted-foreground mb-2">
            De avond valt snel in de grote oude tuin. De insecten spoeden zich naar hun slaapplekjes in de insectenhotels en willen het liefst de nacht doorbrengen bij hun familie.
          </p>
          <p className="text-muted-foreground mb-2">
            Het doel van het spel is om al jouw insecten zo snel mogelijk in de vier insectenhotels aan de overkant van de tuin te krijgen. Elk hotel kan maximaal vier insecten bevatten.
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-base font-bold text-primary mb-2">Spelverloop:</h3>
          <ul className="space-y-1 text-muted-foreground list-disc list-inside ml-2 mb-3">
            <li>De spelers doen om de beurt één zet met een eigen insect.</li>
            <li>Een zet is het verplaatsen van een insect naar een onbezet veld.</li>
            <li>Er zijn twee soorten zetten: schuifzetten en sprongzetten.</li>
          </ul>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-base font-bold text-primary mb-2">Schuifzet:</h3>
          <p className="text-muted-foreground mb-3">
            Het insect verplaatst naar één van de maximaal acht aangrenzende velden.
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-base font-bold text-primary mb-2">Sprongzet:</h3>
          <p className="text-muted-foreground mb-2">
            Een sprongzet bestaat uit één of meer opeenvolgende sprongen.
          </p>
          <ul className="space-y-1 text-muted-foreground list-disc list-inside ml-2 mb-3">
            <li>Een sprong is een horizontale, verticale of diagonale verplaatsing naar een onbezet veld achter een insect waarover gesprongen wordt (eigen of van de tegenstander).</li>
            <li>Na iedere sprong mag de speler stoppen of verder springen.</li>
            <li>Elk insectenhotel kan via maximaal drie verschillende velden bereikt worden, met of zonder sprong.</li>
          </ul>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-base font-bold text-primary mb-2">Sprongregels per insect:</h3>
          <ul className="space-y-1 text-muted-foreground list-disc list-inside ml-2 mb-3">
            <li><strong>Mier:</strong> springt alleen recht.</li>
            <li><strong>Rups:</strong> springt alleen diagonaal.</li>
            <li><strong>Vlinder:</strong> wisselt rechte en diagonale sprongen af (start met beide mogelijk).</li>
            <li><strong>Bij:</strong> moet binnen één sprongzet kiezen voor óf alleen rechte óf alleen diagonale sprongen.</li>
          </ul>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-base font-bold text-primary mb-2">Beperkingen:</h3>
          <ul className="space-y-1 text-muted-foreground list-disc list-inside ml-2 mb-3">
            <li>Een insect mag niet naar één van de vier velden achter de eigen beginopstelling.</li>
            <li>Een insect mag wel naar één van de vier tuinvakken naast de hotels worden verplaatst, maar verdwijnt dan uit het spel en levert geen punten op.</li>
          </ul>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-base font-bold text-primary mb-2">Uitzonderingsregel:</h3>
          <p className="text-muted-foreground mb-3">
            Wanneer een insect in één beurt over in totaal vier stukken springt - zowel eigen stukken als die van de tegenstander - krijgt de speler direct daarna één extra zet. Daarbij geldt dat er niet twee keer over hetzelfde stuk gesprongen mag worden en een veld niet twee keer bezocht mag worden binnen dezelfde sprongzet.
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-bold text-primary mb-3">Puntentelling</h3>
          <p className="text-muted-foreground mb-2">
            Voor elk insect dat in een hotel aankomt, krijgt de speler 1 punt.
          </p>
          <p className="text-muted-foreground mb-3">
            Voor elk extra insect van dezelfde soort in hetzelfde hotel krijgt de speler 2 punten extra.
          </p>
          <p className="text-muted-foreground mb-3">
            Maximale score per hotel: 7 punten.
          </p>
          <p className="text-muted-foreground mb-3">
            Aan het einde van het spel worden alle insecten die in de hotels zijn geplaatst zichtbaar bij het betreffende hotel neergezet om de telling eenvoudig te maken.
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-bold text-primary mb-3">Einde spel</h3>
          <p className="text-muted-foreground mb-2">
            Het spel eindigt onmiddellijk wanneer een speler al zijn 16 insecten in de insectenhotels heeft geplaatst of in de tuin heeft laten verdwijnen.
          </p>
          <p className="text-muted-foreground mb-2">
            Daarna worden de punten geteld.
          </p>
          <p className="text-muted-foreground font-medium">
            De speler met de meeste punten wint.
          </p>
        </div>
      </div>
    </Card>;
};
export default RulesPanel;
