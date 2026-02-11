# Iteration Log — Game Design Docs

## Pass 0 (23:45 UTC, Feb 10)
- Initial versions written
- Spire of Echoes: full doc with theme, core loop, grid combat, adjacency system, roguelite layer, worked example
- GRINDSTONE: alternative theme (deep-sea), behavioral adjacency, grid evolution, drone×module context
- Both need multiple iteration passes for quality

## Sub-Agent Pass (00:00-00:15 UTC, Feb 11)
- **COMPLETED:** Full GRINDSTONE iteration via sub-agent
- Added research-notes.md synthesis of reference games  
- GRINDSTONE v1 completed with 8 creative innovations
- Three iteration passes completed by sub-agent
- Status: GRINDSTONE ready for final review

## Pass 1 (00:30 UTC, Feb 11) — Weak Section Rewrites

### Spire of Echoes — 3 rewrites:
1. **Theme & Setting** — FULL REWRITE. Killed the Dark Souls vibe per Hayden's feedback. New theme: living lighthouse on the edge of the world, warm stone and fog, Echoes are like stray creatures that drift in from the mist. Gales (storms with teeth) replace Hollows. Sacrifice is bittersweet (Spiritfarer tone), not grimdark. Updated visual direction: warm ambers/greens → sky blues, cozy hearth tones.
2. **Progression Arc** — FULL REWRITE. Was a generic milestone list. Now has emotional hooks at each stage: "Oh I Love These Little Guys" → "I Can't Believe I'm Planning Funerals" → "I Broke It and It Felt Amazing." Endgame: sky full of every Echo you ever sacrificed, forming constellations.
3. **Scope Management** — FULL REWRITE. Was 3 bullet points. Now has weekly targets, specific scope per phase, a "build the grid as spreadsheet first" test, and explicit scope risks (adjacency math explosion, idle pacing, emotional attachment tightrope).

Also updated: "Subtle Details" section — scorch marks → soft glows, Dream Thread → Fog Whispers (aligned with new theme).

### GRINDSTONE — 3 rewrites:
1. **Progression Arc hours 10-20** — Was literally "???". Now has The Abyss Protocol: ocean changes at depth 10+, new drone types, grid expands, second Salvage tier with mechanic-altering upgrades.
2. **Competing Currencies** — Added "The Pain Point" column and a concrete crunch-moment example (the 90-second decision at depth 4). Triangle tension is now visceral, not just described.
3. **Narrative wrapper** — Was dismissed as "do we care?" Now has a full narrative direction: research station, you're the last operator, Leviathans are guardians not monsters, Subnautica/Outer Wilds tone. Open Questions refined from 5 vague to 4 specific with recommendations.

### Parallel sub-agents launched:
- Mechanics exploration (novel adjacency systems, idle innovations, reference games)
- Theme exploration (3 grounded fantasy alternatives for Spire)

## Pass 2 (05:28 UTC, Feb 11) — Integration + Balance

### Integrated research into both docs:
**Spire of Echoes:**
- Added "Integrated Mechanics" section: Memory Inheritance (sacrifice as legacy transfer — MVP compatible), Emotional Contagion (dynamic adjacency via Echo moods — V2), Dream Echoes (idle personality development — V3)
- Noted Guild Ledger as alternative theme pivot if lighthouse doesn't click
- Fixed Void→Storm terminology throughout
- Added "Adjacency Balance Notes" — ran the existing example through proper order-of-operations, found the original math was wrong (total was 195, not 221). Documented resolution order and flagged that flat bonuses should probably be %-based.
- Updated "What Makes This Different" point 6 to match new theme

**GRINDSTONE:**
- Added "Integrated Mechanics" section: Drone Fusion (VS-style evolution recipes — V2), Living Grid (combat changes terrain — V2-V3), Expedition Mode (idle risk/reward dispatching — MVP compatible)

### Sub-agent spawned:
- Concrete Units: 10 specific units (5 per theme) with names, stats, adjacency interactions, personality, and 3 grid scenarios with math

## Pass 3 (05:30 UTC, Feb 11) — Integration + Concrete Units

- Integrated concrete-units.md (10 units with stats, personality, sacrifice moments, 3 grid scenarios)
- Added "Supporting Documents" cross-references to both main docs
- Wrote `recommendation.md` — comparative analysis (GRINDSTONE first, Spire as stretch)

## Passes 4-5 (05:34-05:40 UTC, Feb 11) — Visual Direction, Pacing, Scope Reality, Ruthless Cuts

### Sub-agents completed:
- `visual-direction.md` — screen-by-screen breakdowns, hex palettes, ASCII UI layouts, art priorities
- `progression-pacing.md` — minute-by-minute first 2 hours + hours 2-20 for both themes

### Scope Reality Check (Spire doc):
- FULL REWRITE of scope section — honest assessment for a Unity learning project
- Week 0: paper prototype before any code
- MVP: 6-8 weeks, 3×3 grid, 2 types only, colored rectangles not pixel art
- Real risks called out: dual learning curve, adjacency balancing explosion, feature creep

### Ruthless Cuts:
- Trimmed fluff: Resonance explanation, Echo Acquisition, Overflow Economy (~40% tighter)
- Fixed remaining Void→Storm terminology
- Cleaned up Mirrored boss trait reference

### Final Versions:
- `spire-of-echoes-v2.md` (25.9KB)
- `grindstone-v2.md` (15.8KB)

### Complete File Inventory (10 files, ~160KB total):
| File | Description |
|------|-------------|
| `spire-of-echoes-v2.md` | Final Spire doc (lighthouse theme) |
| `grindstone-v2.md` | Final GRINDSTONE doc (deep-sea) |
| `concrete-units.md` | 10 units + 3 grid scenarios |
| `exploration-mechanics.md` | 15 mechanic proposals from 8 games |
| `exploration-themes.md` | 3 grounded fantasy alternatives |
| `visual-direction.md` | Pixel art direction + UI layouts |
| `progression-pacing.md` | Minute-by-minute pacing |
| `recommendation.md` | Comparative analysis + build rec |
| `research-notes.md` | Reference game research |
| `iteration-log.md` | This file |

**Status: COMPLETE.** Delivered to #council-chamber.
