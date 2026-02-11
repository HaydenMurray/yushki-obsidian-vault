# GRINDSTONE — Incremental Clicker Design Document
### v1 — Vera @ Yushki — Feb 2026

---

## Theme: Deep-Sea Mining Rig

Not fantasy. Not tower defense. You run a **deep-ocean mining operation** on an alien seabed. Your "units" are autonomous mining drones. Your "base" is the rig. Boss fights are **leviathan encounters** — massive creatures that periodically surface from the trench.

Why this theme works:
- Justifies both idle extraction AND combat sacrifice (drones mine, then get sent to fight)
- Alien ocean = visual variety without needing worldbuilding lore dumps
- Pressure/depth as a natural prestige metaphor (go deeper = harder + richer)
- Pixel art bioluminescent ocean is *gorgeous* and underexplored

---

## Core Loop (30-second version)

```
IDLE: Drones mine resources on your rig → upgrade rig → unlock new drone types
TENSION: Leviathan incoming (visible timer). Choose which drones to sacrifice for combat.
COMBAT: Place drones on a small grid. Adjacency/synergy determines combat power.
         Drones are DESTROYED after combat regardless of outcome.
OUTCOME: Beat leviathan → loot + go deeper. Lose → run ends (roguelike reset).
```

The entire game is the question: **do I send my best miners to fight, or gamble with weaker ones?**

---

## The Rig (Idle Phase)

### Drone Slots, Not Passive Ticks
Your rig has **module slots** (start with 4, unlock up to 12). Each drone you own occupies a module and generates resources **based on which module it's in**. A drill drone in a Thermal Vent module extracts heat. Same drone in a Mineral Seam extracts ore. **Drone identity + slot context = output.**

This means reassigning drones between modules is a constant optimization puzzle, not just "buy more = get more."

### Competing Currencies That Bind
Three resources, each pulling you in a different direction:

| Resource | Source | Spent On | The Pain Point |
|----------|--------|----------|----------------|
| **Ore** | Most drones in most modules | New drones, rig upgrades | Safe, abundant — but never enough before a Leviathan |
| **Brine** | Only from specific drone+module combos (e.g., Drill drone in a Thermal Vent) | Drone **mutations** (permanent within-run upgrades) | Your best Brine setups waste your best Ore slots. Every mutation costs future income. |
| **Signal** | Trickle from depth milestones + Leviathan kill bonuses | Unlocking new drone **blueprints** (permanent across runs) | You can't grind it — it comes from pushing deeper, which means fighting harder Leviathans with fewer resources |

**Why this triangle works:** Ore is your comfort zone — more Ore = safer. But Brine mutations are what make your drones survive later depths. And Signal is the only way to unlock new drone types, but it requires *succeeding at hard fights*. 

**The crunch moment:** Depth 4, Leviathan incoming in 90 seconds. You have 3 module slots producing Ore and 1 producing Brine. You need Ore to build one more combat drone. But your Drill drone is unmutated — one Brine cycle would give it +2 CV, which might be the difference between winning and losing the run. You can't do both. Clock's ticking. *This* is the game.

### The Seasonal Wrinkle: Trench Currents
Every 3-5 minutes (real time, tunable), the **current shifts**. This changes which modules produce bonus output and which go dormant. You can't just set-and-forget your drone assignments.

Currents are telegraphed 60 seconds early (a visual indicator on the rig). Savvy players re-slot drones before the shift. Idle players lose some efficiency but don't die — it's optimization, not punishment.

---

## Leviathan Combat (The Grid)

### Grid Basics
- **4x3 grid** (12 cells). Small enough to grok in seconds, deep enough for positioning.
- You place drones. Each drone has a **Combat Value (CV)** and one or more **traits**.
- Total effective CV must exceed the leviathan's threshold. Fail = run over.

### Adjacency: Not Elemental Buffs

Here's where it gets interesting. Adjacency effects are **behavioral, not statistical**.

**Examples of drone traits and adjacency interactions:**

- **Echolocator**: Doesn't fight. Instead, it **reveals the leviathan's weak cells** — specific grid positions where placed drones deal 2x. Useless alone. Indispensable for tight fights.
- **Swarm Drone**: CV of 1. But if adjacent to ANY other Swarm Drone, they **merge** into a single unit with combined CV + bonus. Three adjacent Swarm Drones = CV 5 (not 3). Four = CV 9. Placing them is a spatial puzzle.
- **Leech Rig**: CV of 0. Copies the highest CV of any adjacent drone. Place it next to your big hitter = double value. But your big hitter is also your best miner.
- **Disruption Buoy**: Doesn't add CV. Instead, it **subtracts CV from the leviathan** based on how many empty cells surround it. Isolation = power. Anti-synergy with everything else.
- **Fossilized Core**: CV 8 (massive). But it **halves the CV of everything adjacent to it**. You want it — but where?

These aren't "fire + fire = more fire." They're spatial puzzles where placement geometry matters more than raw stats.

### The Grid Evolves: Seabed Topology
The grid isn't static between fights. After each leviathan:
- **1-2 cells become Vents** (drones placed here get +3 CV — vents persist across fights, shaping your long-term grid strategy)
- **1 cell might become Cracked** (drone placed here is destroyed at combat START, before contributing CV — a trap/planning challenge)
- **Rare: a cell becomes a Nest** — any drone placed here spawns a free 1-CV drone in an adjacent empty cell

The grid is a landscape that accumulates history. By fight 5 in a run, your grid is a weird terrain you've adapted to.

### The Leviathan Isn't a Number
Each leviathan has a **shape** — it occupies specific cells on the grid. Drones placed ON leviathan cells deal double CV. Drones placed adjacent to leviathan cells deal normal. Drones placed far away deal half.

So the puzzle is: the leviathan's shape constrains your optimal placement, but occupied cells might have bad terrain from previous fights. **Boss design = grid puzzle design.**

---

## Drone Memory: Resonance

Here's the creative swing.

When a drone is expended in combat, it leaves behind a **Resonance imprint** on the cell it occupied. The imprint lasts for the rest of the run.

Next fight, if you place a drone of the **same type** on an imprinted cell, it gains a Resonance bonus (+30% CV). Stack it 3 times on the same cell across 3 fights? +100% CV.

This creates:
- **Spatial memory across fights** — you start "claiming" cells for specific drone types
- **Agonizing decisions** when grid evolution (vents, cracks) disrupts your resonance map
- **A reason to build duplicate drones** even when variety seems better
- The feeling of haunted ground — your dead drones empower their successors

---

## Roguelike Layer: Runs & Depth

### Run Structure
- Each run = descend as deep as possible (leviathan every ~5 min, scaling difficulty)
- Lose a fight = run ends
- **Between runs**: keep blueprints (drone types unlocked), lose all drones/resources/grid state

### What Makes Reset Feel Different: The Salvage System
When a run ends, you don't just get a prestige multiplier. You get **Salvage** — and Salvage is spent on a **permanent rig upgrade tree** that changes game mechanics, not just numbers.

Examples of Salvage unlocks (NOT stat boosts):
- **Pressure Adaptation**: Start each run at depth 3 instead of 1 (skip easy fights, but miss early resource buildup — is that worth it?)
- **Drone Fossilization**: Once per run, a destroyed drone becomes a Fossilized Core instead of disappearing (your best unit becomes a powerful but awkward combat piece)
- **Current Reading**: Trench current shifts are visible 3 minutes early instead of 60 seconds
- **Resonance Echo**: Resonance imprints from your PREVIOUS run carry over at 50% strength (suddenly resonance becomes a cross-run strategy)
- **Modular Grid**: Unlock a 5th column on the combat grid (huge, but now you need more drones per fight)

Each unlock changes how you play, not how fast numbers go up.

### Run Variety: Depth Modifiers
Each depth level has a random modifier drawn at run start:

- **Bioluminescent Bloom**: All drones gain +1 CV but Brine generation halved
- **Pressure Spike**: Module slots reduced by 2 at this depth (brutal — fewer miners)
- **Dead Zone**: No current shifts at this depth (sounds good — but you lose the bonus windows)
- **Spawning Ground**: Leviathan at this depth has 2x threshold but drops a rare blueprint on kill

You can see the modifiers for the next 2 depths. Plan or adapt.

---

## Progression Arc (First 2 Hours → First 20 Hours)

**Minutes 1-5**: Click to mine manually. Get first drone. Assign to module. See passive income.
**Minutes 5-15**: Get 3-4 drones. First leviathan appears. Tutorial fight (can't lose). Learn grid.
**Minutes 15-30**: Real fights begin. Feel the sting of losing your best miner. Learn to overbuild.
**30-60 min**: First run loss. See Salvage screen. Unlock first mechanic-changing upgrade. Run 2 begins.
**Hours 1-3**: Runs get longer. Discover Resonance strategy. Start planning drone builds around grid memory.
**Hours 3-10**: Deep Salvage tree exploration. Runs feel distinct due to depth modifiers + grid evolution. Player develops favorite drone compositions — "I always want 2 Swarm + 1 Leech by depth 4."
**Hours 10-20**: Second prestige layer — **The Abyss Protocol.** At depth 10+, the ocean changes. Bioluminescence fades. Your rig's lights are the only color. New drone types only available down here (Abyssal blueprints, earned by reaching specific depths). The grid expands to 5×4 but Leviathans now have TWO shapes that shift between phases. The Salvage tree branches into a second tier: **Abyssal Adaptations** that fundamentally alter rig mechanics (e.g., modules can be stacked vertically for compound output, drones can be fused pre-combat at the cost of both). This layer doesn't need full design yet — but the *direction* is: the game gets weirder and more strategic, not just bigger numbers. The ocean has secrets.
**Hours 20+**: Endgame — you reach the trench floor. What's down there is left deliberately ambiguous in early design. Could be: the source of all Leviathans, an ancient rig from a previous expedition, or something truly alien. This is where narrative payoff lives. Don't design it until hours 1-10 are fun.

---

## Integrated Mechanics (from Research)

### Drone Fusion — Vampire Survivors-Style Evolution
When a drone reaches max level AND is adjacent to a specific module type, it can **fuse** into a qualitatively different unit. A max-level Drill Drone in a Thermal Vent module becomes a **Magma Bore** — completely different attack pattern, different resource output, different adjacency effects. Discovery of fusion recipes is itself a progression system. Players share discoveries socially.

**Examples:**
- Drill Drone + Thermal Vent → **Magma Bore** (CV 12, produces Brine instead of Ore, melts Cracked cells into Vents)
- Swarm Drone + Nest cell → **Hive Mother** (CV 0 alone, but spawns 2 mini-drones per adjacent empty cell)
- Echolocator + Signal module → **Deep Scanner** (reveals ALL weak cells for 2 fights, not just current one)

**Scope:** V2. Needs fusion recipe system (~10 recipes), transformation animations. High discovery satisfaction.

### Living Grid — The Seabed Fights Back
Cells don't just gain Vents/Cracks passively. Combat actions change them. A drone that deals fire damage scorches its cell (+damage, -healing). A drone that dies on a cell corrupts it (damages future occupants but drops better loot). Water-type attacks cool cells, creating Thermal Vents.

The seabed accumulates combat history. By depth 5, your grid is a unique landscape shaped by every fight you've had. Adapting to YOUR OWN environmental damage is a meta-strategy.

**Scope:** V2-V3. Needs cell state machine (5-6 states), transition rules, visual feedback.

### Expedition Mode — Idle as Risk/Reward
Before going idle, the player can dispatch drones on **deep expeditions** — sending them beyond the rig into unexplored ocean. Drones are removed from the module grid (weakening income AND combat roster) but return after real-time hours with rare blueprints, Brine caches, or map data revealing future Leviathan shapes.

**The tradeoff:** send your best drone = faster expedition, better loot, but you're defenseless if a Leviathan comes early. Send your worst = safer, but the expedition might fail.

**Scope:** MVP-compatible. Timer system + outcome tables. Great idle differentiator.

---

## Visual Direction

- **Pixel art, 16-bit style** — think Hyper Light Drifter color palette in an ocean setting
- Rig is the hub screen: modules visible, drones moving between them, bubbles, ambient sea life
- Combat grid: top-down, dark ocean floor, bioluminescent drones glow on placement
- Leviathans: silhouette-first design. You see the shape before the detail. Menacing outlines.
- **Screen shake and particle burst when drones are expended** — make sacrifice FEEL violent
- Resonance imprints: ghostly afterimages on grid cells. Subtle but visible.

---

## Narrative Direction: Why We're Down Here

The rig wasn't built for mining. It was a **research station** — sent to study the deep ocean of an alien world after colony ships detected unusual energy signatures from orbit. The colony above (on land, thriving, normal) needed power. The ocean had it.

You're the last operator. Not because something terrible happened — the others rotated out. You stayed because you found something: the Leviathans aren't random wildlife. They're **guardians**. The energy you're mining is their blood. And they're getting bigger the deeper you go, which means you're getting closer to whatever they're protecting.

**This matters for gameplay because:**
- It gives the player a *reason* to go deeper beyond "bigger numbers" — curiosity
- Leviathans aren't evil, they're protective. Sacrificing drones to fight them has moral texture (you're the invader)
- The colony above occasionally radios down with requests (event hooks: "we need 500 Ore by depth 6" = optional challenge objectives)
- The endgame question becomes: what's at the bottom, and do you stop when you find it?

**Tone:** Not horror. Think Subnautica's sense of wonder mixed with Outer Wilds' curiosity. The ocean is dangerous but *beautiful*. You're an explorer, not a soldier.

## Open Questions for Hayden

1. **Run length target?** Current design assumes 15-30 min runs. Shorter (10 min, mobile-friendly) or longer (45-60 min, deeper investment)?
2. **Active play density?** Three options: (a) pure idle between fights, (b) optional clicking for bonus output, (c) mini-tasks between fights (repair drones, manual module calibration). Recommend (b) — rewards engagement without punishing idle.
3. **Mobile-first or PC-first?** 4×3 grid is phone-native. Rig management needs redesign for mobile but is doable. This decision affects UI complexity budget.
4. **Narrative depth?** Three tiers: (a) flavor text only, (b) radio logs + environmental storytelling, (c) full story beats with choices. Recommend (b) for MVP, (c) if the game finds audience.

---

## Supporting Documents
- `concrete-units.md` — 5 designed drones (Borer-7, Pinger, Gullet, Mako-Class "JENNY", Thornback) with stats, adjacency math, and 1 grid scenario
- `exploration-mechanics.md` — 15 novel mechanic proposals from 8 reference games
- `exploration-themes.md` — 3 alternative grounded-fantasy themes (for Spire comparison)

---

*Next steps: Hayden reviews. Then we prototype the grid combat as a standalone system — if that's fun in a spreadsheet, the rest will follow.*
