# Theme Variants Folder

This folder contains visual theme variants for the game.

## Structure

Each variant folder contains:
- `config.json` - Theme configuration (icons, colors, piece names)
- `assets/` - Theme-specific images (board backgrounds, etc.)
- `README.md` - Theme description and design notes

## Available Themes

### garden/
The original garden theme with insects racing to bushes.
- **Pieces**: Ant (🐜), Caterpillar (🐛), Bee (🐝), Butterfly (🦋)
- **Dock**: Bush/Lavender (🪻)
- **Board**: Garden with grass paths

### harbor/
Dutch harbor theme with goods being shipped.
- **Pieces**: Cheese (🧀), Tulip (🌷), Egg (🥚), Butter (🧈)
- **Dock**: Ship/Anchor (⚓)
- **Board**: Harbor with water and docks

### space/
Space theme with cosmic objects traveling to planets.
- **Pieces**: UFO (🛸), Rocket (🚀), Moon (🌙), Star (⭐)
- **Dock**: Planet (🪐)
- **Board**: Space with stars and nebulas

### underwater/
Underwater theme with sea creatures swimming to coral.
- **Pieces**: Fish (🐠), Octopus (🐙), Crab (🦀), Shell (🐚)
- **Dock**: Coral (🪸)
- **Board**: Ocean floor scene

## Creating a New Theme

### Option A: Using BaseFolder Workflow (Recommended)

1. Navigate to `DeTuinRace_BaseFolder/`
2. Use Agent 1 (Lean Requirements Writer):
   ```
   Prompt: "Create theme requirements for [theme name].
   Include: board visual style, 4 piece types, dock icon, color scheme."
   ```
3. Use Agent 4 (Frontend Specialist) to create HTML mockup
4. Export assets and config to this variants folder
5. Update `src/themes/presets.ts` with new theme

### Option B: Manual Creation

1. Create new folder: `variants/[theme-name]/`
2. Add `config.json`:
   ```json
   {
     "id": "theme-id",
     "name": "Theme Name",
     "description": "Short description",
     "pieces": {
       "egg": "emoji",
       "tulip": "emoji",
       "cheese": "emoji",
       "butter": "emoji"
     },
     "pieceNames": {
       "egg": "Name 1",
       "tulip": "Name 2",
       "cheese": "Name 3",
       "butter": "Name 4"
     },
     "dock": {
       "icon": "emoji",
       "label": "Dock name"
     },
     "colors": {
       "playerA": "#hex",
       "playerAGlow": "rgba(...)",
       "playerB": "#hex",
       "playerBGlow": "rgba(...)"
     }
   }
   ```
3. Add board image to `variants/[theme-name]/assets/board.jpg`
4. Update `src/themes/presets.ts` to import and export new theme

## Design Guidelines

### Board Image Specifications
- **Dimensions**: 416px × 624px (or same aspect ratio)
- **Format**: JPG or PNG
- **Style**: Leave space for 8×10 grid overlay
- **Rows**: Top row (9) and bottom row (0) should be visually distinct (water/sky)

### Piece Selection
- Choose 4 distinct, recognizable emojis or icons
- Ensure they fit the theme narrative
- Test visibility on both light and dark backgrounds

### Color Scheme
- Player A and Player B need distinct colors
- Ensure sufficient contrast for accessibility
- Test glow effects on the board background

### Dock Icon
- Should fit the theme (destination for pieces)
- Visible at small sizes
- Distinct from piece icons

## Testing Checklist

Before adding a new theme:
- [ ] Board image displays correctly at 416×624px
- [ ] All 4 piece emojis are distinct and visible
- [ ] Dock icon is recognizable
- [ ] Player colors have good contrast
- [ ] Theme name and description are clear
- [ ] Config.json has no syntax errors
- [ ] Theme appears in ThemeSelector dropdown
- [ ] Can switch to theme and play game

## Examples

See existing themes for reference:
- `garden/` - Original theme
- `harbor/` - Alternative theme with different icons
- `space/` - Fantasy theme with cosmic elements

## File Naming

- Board images: `board.jpg` or `board.png`
- Config: `config.json`
- Additional assets: descriptive names (e.g., `piece-ant.svg`)

---

For questions or help creating themes, see:
- `DeTuinRace_BaseFolder/docs/Template-and-Checklist.md`
- `DeTuinRace_BaseFolder/docs/Agent-Structure.md`
