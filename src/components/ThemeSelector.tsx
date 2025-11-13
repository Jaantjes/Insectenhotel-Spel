/**
 * Theme Selector Component
 *
 * Provides a UI for switching between available game themes.
 * Displays theme name and description in a dropdown or button group.
 */

import { useTheme, getAllThemes } from '@/themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

export function ThemeSelector() {
  const { theme, setTheme, themeId } = useTheme();
  const allThemes = getAllThemes();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-white/90 hover:bg-white">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline font-semibold">{theme.name}</span>
          <span className="text-xs text-muted-foreground hidden md:inline">▼ Wijzig achtergrond</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-b">
          🎨 Kies een Spelbord Achtergrond
        </div>
        {allThemes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={themeId === t.id ? 'bg-accent font-medium' : ''}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="flex-shrink-0 text-xl">
                {themeId === t.id ? '✓' : '○'}
              </div>
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="font-medium">{t.name}</span>
                {t.description && (
                  <span className="text-xs text-muted-foreground">
                    {t.description}
                  </span>
                )}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Compact Theme Selector (Icon buttons)
 * Alternative compact version for limited space
 */
export function ThemeSelectorCompact() {
  const { theme, setTheme, themeId } = useTheme();
  const allThemes = getAllThemes();

  return (
    <div className="flex gap-1">
      {allThemes.map((t) => (
        <Button
          key={t.id}
          variant={themeId === t.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTheme(t.id)}
          title={`${t.name}${t.description ? ` - ${t.description}` : ''}`}
        >
          {t.pieces.egg}
        </Button>
      ))}
    </div>
  );
}
