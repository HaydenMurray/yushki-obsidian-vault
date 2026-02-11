# Vera's Recommendation — Which Game to Build

## The Two Contenders

| | **Spire of Echoes** | **GRINDSTONE** |
|---|---|---|
| **Theme** | Cozy lighthouse, foggy island, creature companions | Deep-sea mining rig, alien ocean, drone crew |
| **Sacrifice feels like** | Sending a friend into the storm | Spending your best tool |
| **Grid** | 4×4 (spatial puzzle, refraction through empty cells) | 4×3 (behavioral, drones with unique abilities) |
| **Adjacency** | Type-based (Marrow/Prism/Drift/Storm) with multiplicative combos | Behavioral (Echolocator reveals, Swarm merges, Leech copies) |
| **Idle phase** | Spatial arrangement of Echoes on Spire floors (Resonance optimization) | Drone-module assignment (context-dependent output) |
| **Roguelite hook** | Rules themselves expand (Resonance Tuning unlocks new adjacency interactions) | Mechanical upgrades (Salvage changes how you play, not just numbers) |
| **Emotional weight** | High — creatures with personality, bittersweet farewells | Medium-high — drones with names (JENNY), but still machines |
| **Visual potential** | Enormous — warm pixels, creature animations, fog, lighthouse glow | Enormous — bioluminescent ocean, silhouette leviathans, HLD palette |
| **Scope risk** | Higher — adjacency math with 4 types is combinatorially complex | Lower — behavioral adjacency is easier to balance one drone at a time |

## My Take

**Build GRINDSTONE first. Keep Spire of Echoes as the stretch goal.**

Here's why:

### 1. GRINDSTONE is more prototypeable
The behavioral adjacency system (Echolocator reveals weak cells, Swarm Drones merge, Leech copies neighbors) can be tested one drone at a time. Each drone is its own self-contained design puzzle. Spire's multiplicative type system requires the WHOLE system to be in place before you can tell if it's fun.

### 2. The scope is tighter
GRINDSTONE's 4×3 grid with ~12 drone types is a smaller design space than Spire's 4×4 grid with 4 resonance types and refraction mechanics. For a first game, tighter is better.

### 3. The theme sells itself in 5 seconds
"You run a deep-sea mining rig and your mining drones are also your combat units against giant sea monsters" — anyone gets this instantly. Spire requires more explanation ("it's a lighthouse with magical creatures that you sacrifice to weather-storms using a grid-based...").

### 4. Mobile-friendly from day one
4×3 grid fits phones. The rig management could be redesigned for touch. Spire's vertical tower + 4×4 grid is more PC-native.

### 5. Spire is the better game — which is why you save it
Spire has more emotional depth, more mechanical ambition, more visual distinctiveness. It deserves more dev experience behind it. Build GRINDSTONE, learn what works about grid combat and sacrifice mechanics, then bring those lessons to Spire as your second game (or a major expansion).

## If You Disagree

If the lighthouse theme is what excites you, build that. Excitement beats optimization every time. But if so:
- Start with the 3×3 grid (MVP section in the doc)
- Limit to 3 resonance types (no Storm until V2)
- Prototype the grid as a spreadsheet before writing any Unity code
- The Guild Ledger theme (from exploration-themes.md) is worth considering as an alternative — "sacrifice = graduation" might be even cleaner than "sacrifice = farewell"

## Next Step Either Way

**Prototype the grid combat as a standalone system.** Paper, spreadsheet, or a quick Unity scene — doesn't matter. Place 4-5 units on a grid, calculate adjacency, see if the decision about "which units to spend" creates real tension. If that 5-minute prototype doesn't make you think, nothing else saves it.
