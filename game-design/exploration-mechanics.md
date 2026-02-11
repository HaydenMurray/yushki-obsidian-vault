# Mechanics Exploration: Incremental/Idle Game with Grid-Based Combat

*Research compiled 2026-02-11*

---

## Part 1: Game-Specific Mechanical Inspirations

### 1. Grindstone → **Chain Momentum System**
**Mechanic:** Chaining 10+ same-color enemies spawns a Grindstone gem that lets you switch colors mid-chain, creating longer super-chains.
**Adaptation:** On our combat grid, units that chain-kill enough adjacent enemies generate a "Resonance Crystal" that changes the unit's damage type mid-combat. Chains aren't just "match more = more damage" — they unlock type-switching, letting one unit carve complex paths through enemy formations. The grid isn't about matching; it's about *routing*.
**Why it's interesting:** Creates a planning puzzle where you're not just thinking about what's adjacent now, but planning a *path* through the grid 3-4 moves ahead.
**Complexity:** Medium. Needs pathfinding UI, chain-tracking, and resonance crystal spawn logic.

### 2. Loop Hero → **Environmental Tile Combos**
**Mechanic:** Placing tiles adjacent to each other creates emergent transformations — meadow + rock = blooming meadow (better healing), 3x3 mountains = mountain peak (spawns harpies), village + wheat = overgrown field (spawns scarecrows).
**Adaptation:** Our grid terrain isn't just backdrop. Players place terrain tiles that combine: adjacent Forge + Mine = Smeltery (auto-produces gear). Swamp + Graveyard = Haunted Bog (spawns undead but drops rare ingredients). The *player builds the battlefield* between combat phases, and tile combos create both opportunities and threats.
**Why it's interesting:** Every placement decision has cascading consequences. The player is simultaneously building their economy, their defenses, and their threats.
**Complexity:** High. Requires a combo lookup table (can start small ~15 combos, expand over time), spatial tracking, and clear feedback on what combos are possible.

### 3. Slay the Spire → **Archetype Tension / Build Commitment**
**Mechanic:** Cards belong to implicit archetypes (Strength, Poison, Block-heavy). Taking cards outside your archetype dilutes your deck. The tension between "this card is good" and "this card fits my build" is the core decision.
**Adaptation:** Units on our grid belong to implicit "schools" (e.g., Fire, Growth, Void). Placing units of the same school adjacent to each other amplifies both. Mixing schools on the grid gives versatility but diluted power. The player must decide: go deep on one school for powerful adjacency chains, or spread for coverage? This replaces linear "just get stronger" with "commit to a strategy."
**Why it's interesting:** Prevents the "just pick the biggest number" problem. Synergy > raw power.
**Complexity:** Low-Medium. Tag system on units + adjacency multiplier lookup. Core math is simple; richness comes from unit variety.

### 4. Peglin → **Physics-Driven Uncertainty as Skill Expression**
**Mechanic:** Combat damage is determined by launching orbs into a pachinko board. Aim matters, but bounces are semi-random. Different orbs have different effects on peg-hit (crit, splash, poison). The pegboard itself changes per fight.
**Adaptation:** Instead of deterministic combat resolution, introduce a "Chaos Phase" where the grid briefly becomes dynamic — units fire projectiles that bounce off terrain features. Player places "deflector" tiles before combat to influence projectile paths. Skill expression through preparation + controlled randomness in execution.
**Why it's interesting:** Adds a visceral, watchable element to idle combat. Even when idle, the bouncing projectiles create visual spectacle and variance in outcomes.
**Complexity:** High. Physics simulation (even simplified), deflector placement UI, balancing variance so it doesn't feel unfair.

### 5. Vampire Survivors → **Weapon Evolution Through Combination**
**Mechanic:** Combining a maxed weapon with a specific passive item creates an evolved super-weapon. Garlic + Pummarola = Soul Eater. The evolution is a *surprise discovery* the first time.
**Adaptation:** Units on the grid can be "fused" when they reach max level AND are adjacent to a specific terrain/other unit type. The fusion isn't just "stronger version" — it's a *transformation* into something qualitatively different. A max-level Archer adjacent to a Windstone becomes a Storm Archer with completely different attack patterns. Discovery of fusion recipes is itself a progression system.
**Why it's interesting:** Creates "aha!" moments. Players experiment with adjacency to discover fusions. Shares knowledge socially ("did you know Knight + Lava Tile = Magma Golem?").
**Complexity:** Medium. Needs fusion recipe system, transformation animations, balance for each fused unit. Start with ~10 fusions, expand.

### 6. Caves of Qud → **Mutation/Chimera System**
**Mechanic:** Characters gain random mutations that interact with the physics simulation in unexpected ways. Flaming hands + being near oil = explosion. Multiple heads = more mental actions. Mutations compound and create unique builds no designer explicitly planned.
**Adaptation:** Units on the grid can acquire "mutations" through exposure to grid events (combat damage, terrain effects, adjacency to mutant enemies). Mutations are semi-random and stack. A unit might gain "Thorned" (reflects damage) + "Regenerating" (heals over time) + "Volatile" (explodes on death). The combination creates emergent identities — that unit is now your "suicide bomber tank" and you didn't plan it, it just emerged.
**Why it's interesting:** Every playthrough produces unique units with personal histories. Players get attached to units because they're irreplaceable.
**Complexity:** Medium-High. Mutation trait system, interaction matrix between traits, visual representation of mutated units.

### 7. Dungeon Defenders → **Build Phase / Combat Phase Duality**
**Mechanic:** Players place towers during a build phase, then actively fight alongside them during combat. The tower placement is strategic; the combat is action-oriented. Two different skill sets in one game.
**Adaptation:** Our game has two distinct phases: (1) **Arrangement Phase** — player places/moves units on grid, sets terrain, configures adjacency. This is the "puzzle" phase. (2) **Combat Phase** — units auto-fight based on their positions. Player can intervene with limited "command" actions (redirect, activate abilities) but mostly watches their setup play out. The satisfaction comes from seeing a good arrangement *work*.
**Why it's interesting:** Separates planning from execution. The idle phase IS the combat phase — the game runs your setup while you're away.
**Complexity:** Low. This is more of a structural decision than a new system. The existing grid + auto-combat already supports this.

### 8. Backpack Hero → **Spatial Item/Unit Interaction via Grid Adjacency**
**Mechanic:** Items in your backpack grid buff/debuff based on what's adjacent. A sword next to a whetstone does more damage. A shield next to a sword gives it counter-attack. Curse items take up space and debuff neighbors. Managing the grid IS the game.
**Adaptation:** Direct inspiration for our core adjacency system. Every unit has an "aura" that affects adjacent cells. A Healer heals adjacent allies. A Berserker buffs adjacent attackers but debuffs adjacent defenders. A Cursed Relic debuffs everything around it but is incredibly powerful. The *spatial arrangement* of units IS your build.
**Why it's interesting:** It's the purest expression of "position matters." Moving one unit one cell can cascade through the entire formation.
**Complexity:** Low-Medium. Aura system with stackable modifiers per cell. Need clear visual indicators of aura effects.

---

## Part 2: Novel Adjacency Systems

### A. "Sympathetic Resonance" — Frequency-Based Adjacency
**How it works:** Each unit has a "frequency" (1-8). Units resonate when adjacent to units whose frequency is harmonically related (e.g., freq 2 resonates with freq 4 and freq 6). Resonating units share a portion of each other's abilities. Dissonant adjacency (primes next to each other, like 3 next to 5) creates interference — units jam each other.
**Why it's novel:** Goes beyond "same type = good." The relationships are mathematical, creating non-obvious optimal arrangements. A freq-3 unit is good next to freq-6 but bad next to freq-5. Players learn harmonic relationships intuitively.
**Complexity:** Medium. Math is simple (modular arithmetic), but teaching the system to players requires good UI/feedback.

### B. "Mycelium Network" — Delayed Adjacency Propagation
**How it works:** When a unit is placed, it sends out "roots" that grow one cell per turn. After 3 turns, the unit is connected to anything 3 cells away — not just immediate neighbors. Benefits propagate along root paths. But roots can be severed by enemy attacks or terrain. Players must protect their network.
**Why it's novel:** Adjacency isn't instant or static — it *grows*. Older units have deeper networks. This creates a reason to keep units alive long-term and defend specific grid positions.
**Complexity:** Medium-High. Needs root pathfinding, growth over time, severance mechanics, visual representation of the network.

### C. "Emotional Contagion" — State-Based Adjacency
**How it works:** Units have emotional states (Brave, Afraid, Enraged, Calm). Emotional states spread to adjacent units each turn, weighted by "charisma." A single panicking unit can cause a chain rout. A single brave unit can rally a formation. Players must manage emotional topology — put your bravest units at the formation's center.
**Why it's novel:** Adjacency effects are *dynamic* and *emergent*. The grid's behavior changes turn-by-turn as emotions ripple through the formation. One death in the wrong spot can cascade into a rout.
**Complexity:** Medium. Cellular automata-style propagation. Need tuning to prevent runaway positive/negative spirals.

---

## Part 3: Idle Phase Innovations

### D. "Dream Combat" — Idle as Subconscious Training
**Name:** Dream Combat
**How it works:** While the player is away, units don't just grind — they "dream." In dreams, they fight shadow versions of enemies the player has previously encountered, but in randomized formations. Units can gain small stat boosts OR pick up "traumas" (minor debuffs) from dream-combat. When the player returns, they see a dream log: "Your Knight dreamed of fighting the Dragon 47 times. She gained +2 Fire Resist but developed a fear of flying enemies (-1 accuracy vs. flyers)."
**Why it's interesting:** Idle time becomes *narrative*. Units develop personal histories while you're away. The player returns to find their army has *changed*, not just accumulated currency.
**Complexity:** Medium. Needs simplified combat sim for offline, trait gain/loss probability tables, dream log UI.

### E. "Entropy & Decay" — Idle as Degradation
**Name:** Entropy System
**How it works:** While idle, the grid slowly degrades. Terrain erodes, walls crack, units get bored and wander (their positions shift slightly). When the player returns, they have a *restoration* mini-game: fix what broke, reposition wandered units, repair terrain. Longer idle = more entropy. But entropy also reveals things — eroded terrain might expose buried treasures or hidden passages.
**Why it's interesting:** Flips the idle paradigm. Instead of "come back to MORE stuff," you come back to "stuff happened and you need to deal with it." Active play is about building; idle drift is about entropy. The tension between the two is the game.
**Complexity:** Medium. Grid state mutation over time, restoration mechanics, hidden content reveals.

### F. "Expedition Mode" — Idle as Exploration
**Name:** Expeditions
**How it works:** Before going idle, the player dispatches units on expeditions to fog-of-war areas of a larger world map. Units are removed from the combat grid (weakening defense) but return after real-time hours with resources, map data, recruits, or injuries. The player makes a strategic tradeoff: weaken now for future gain.
**Why it's interesting:** Idle time has an *opportunity cost*. You choose what to do with it. Do you send your best units (faster expedition, weaker defense) or your worst (slower but safer)?
**Complexity:** Low-Medium. Timer system, expedition outcome tables, risk/reward tuning.

---

## Part 4: Sacrifice/Recycling Mechanics

### G. "Soul Composting" — Sacrifice as Delayed Investment
**Name:** Soul Composting
**How it works:** Sacrificed units go into a "Compost Heap" on the grid (takes up a cell). The heap grows over time as you add more units. After N units and M turns, the heap "blooms" into a powerful unique unit whose stats are a weighted combination of everything composted. You're not deleting for currency — you're *cooking* a custom unit.
**Why it's interesting:** Sacrifice feels like planting, not destroying. You're investing, not spending. The anticipation of what the heap will become adds excitement. "I put in 3 fire units and 2 healers — what comes out?"
**Complexity:** Medium. Stat combination formulas, bloom timer, visual growth stages, some randomization of the output.

### H. "Memory Inheritance" — Sacrifice as Legacy
**Name:** Memory Inheritance
**How it works:** When a unit is sacrificed adjacent to another unit, the surviving unit gains a "memory" of the sacrificed one — one skill or trait, at reduced power. A unit can hold up to 3 memories. This means sacrificing isn't about currency; it's about *transferring experience*. Your veteran's sacrifice makes the rookie better in a specific way the player chose.
**Why it's interesting:** Creates emotional weight. You're not just deleting a unit — you're choosing what legacy it leaves. "My archer died, but my knight carries her Precise Shot memory now."
**Complexity:** Low-Medium. Trait transfer system, memory slot limit, UI for choosing which trait to inherit.

### I. "Ritual Sacrifice" — Sacrifice as Grid Event
**Name:** Ritual Circles
**How it works:** Specific grid patterns (e.g., 4 units in a diamond around an altar tile) can be "activated" as a ritual. All 4 units are consumed and a grid-wide effect triggers: heal all units, damage all enemies, transform terrain, or summon a boss-tier ally. The pattern requirement makes it a puzzle — you need the right units in the right positions.
**Why it's interesting:** Sacrifice is a *spatial puzzle*, not a menu click. It requires setup, positioning, and timing. Do you sacrifice now for the AoE heal, or wait until you can afford to lose those units?
**Complexity:** Medium. Pattern recognition system, effect catalog, visual ritual feedback.

---

## Part 5: Anti-Power-Creep Progression

### J. "Horizontal Mastery" — Breadth Over Depth
**Name:** Mastery Web
**How it works:** Instead of units getting linearly stronger, they unlock *lateral* abilities via a web/tree. A Knight doesn't go from 10 → 20 → 30 attack. Instead, they branch: Shield Bash (stun), Rally (buff adjacents), Fortify (terrain bonus), etc. Each branch opens new tactical options without increasing raw numbers. "Stronger" means "more versatile" — but you can only equip 2-3 active abilities, so you specialize.
**Why it's interesting:** Progression feels meaningful without numbers inflating. A fully-mastered unit isn't 10x stronger than a new one — it's 10x more *flexible*. New units aren't obsolete; they just have fewer options.
**Complexity:** Low-Medium. Skill tree per unit class, equip slot system. Well-understood design pattern.

### K. "Escalating Constraints" — The World Gets Harder AND Weirder
**Name:** Anomaly Tiers
**How it works:** As the player progresses, the world doesn't just spawn stronger enemies — it introduces *anomalies*: rule changes. Tier 2: "Gravity reverses every 5 turns" (units slide). Tier 3: "All healing is halved." Tier 4: "Units can't occupy the same color tile for 2 consecutive turns." Progression is about adapting to increasingly bizarre constraints, not just bigger numbers.
**Why it's interesting:** Players can't just grind one strategy. Each anomaly tier demands reconfiguration. The meta-game keeps shifting. "My formation was perfect for Tier 3 but Tier 4's movement rule breaks it — time to rebuild."
**Complexity:** Medium. Anomaly rule engine (modifier system), balance testing per anomaly, clear anomaly communication UI.

### L. "Prestige as Perspective Shift"
**Name:** Dimensional Prestige
**How it works:** Instead of "reset for multiplier," prestige shifts the game's perspective. First playthrough: you command a squad on a grid. Prestige 1: you now command *multiple squads* on a strategic map, each squad being an auto-battling grid. Prestige 2: you command a *faction* with multiple armies. Each prestige layer adds a new management level while the previous layer becomes increasingly automated. You never lose progress — your old micro-level play becomes the "idle" layer of your new macro-level play.
**Why it's interesting:** Prestige doesn't feel like reset — it feels like *promotion*. You zoomed in; now you zoom out. Your grid-combat expertise still matters, it just runs automatically now while you solve a new, larger problem.
**Complexity:** High. Each prestige layer is essentially a new game system layered on top. But can be built incrementally — launch with layer 1, add layers in updates.

---

## Part 6: Combat Grid Twists

### M. "Living Grid" — The Battlefield Has Agency
**Name:** Living Grid
**How it works:** The grid itself is alive. Cells have states: Fertile (boosts growth units), Scorched (boosts fire, hurts nature), Frozen (slows all), Corrupted (damages over time but drops better loot). Cells change state based on what happens on them — fire attacks scorch cells, water spells freeze them, deaths corrupt them. The battlefield evolves *during* combat based on player actions.
**Why it's interesting:** Creates a feedback loop. Your strategy changes the terrain, which changes optimal strategy. Fire mages are great... until they've scorched the whole grid and your nature units can't function. Requires balancing your own environmental impact.
**Complexity:** Medium. Cell state machine (5-6 states), transition rules, visual feedback per state.

### N. "Tectonic Grid" — Shifting Plates
**Name:** Tectonic Shifts
**How it works:** The grid is divided into 3-4 tectonic plates (groups of cells). Every N turns, plates shift — sliding one cell in a direction. Units on them move with the plate. This can merge formations, split them apart, push units off edges, or create new adjacencies. Players must plan around upcoming shifts (shown via preview) or use abilities to trigger/prevent shifts.
**Why it's interesting:** Formations are temporary. The grid refuses to let you set-and-forget. Adjacency bonuses you built get disrupted; new unexpected adjacencies form. Adapting to tectonic shifts IS the strategy.
**Complexity:** Medium-High. Plate movement logic, collision handling, shift preview UI, edge-case handling (units pushed off-grid).

### O. "Shadow Grid" — Two-Layer Combat
**Name:** Shadow Grid
**How it works:** There are two overlapping grids: the Material grid and the Shadow grid. Most units exist on one layer. Some units can see/affect both. Enemies might attack from the Shadow grid, invisible to Material-only units. Placing a "Seer" unit lets adjacent allies see into the Shadow layer. The player manages two spatial puzzles simultaneously.
**Why it's interesting:** Adds depth (literally) to grid combat without increasing grid size. Creates specialist roles: some units are shadow-hunters, some are material defenders. The interplay between layers creates surprises and strategic depth.
**Complexity:** High. Two-layer rendering, cross-layer interaction rules, visibility system, potentially confusing UI (needs careful design).

---

## Summary: Top 5 Most Implementable Ideas (Ranked by Impact/Effort)

| Rank | Idea | Impact | Effort | Start Here? |
|------|------|--------|--------|-------------|
| 1 | Memory Inheritance (H) | High | Low | ✅ Yes — core sacrifice mechanic |
| 2 | Emotional Contagion (C) | High | Medium | ✅ Yes — makes adjacency dynamic |
| 3 | Environmental Tile Combos (2/Loop Hero) | Very High | Medium | ✅ Yes — defines the building phase |
| 4 | Dream Combat (D) | High | Medium | Great idle differentiator |
| 5 | Anomaly Tiers (K) | High | Medium | Progression backbone |

**Recommended Core Loop:** Build phase (place units + terrain with Loop Hero-style combos) → Combat phase (auto-battle with Emotional Contagion adjacency) → Idle phase (Dream Combat) → Return phase (review dreams, handle entropy, sacrifice via Memory Inheritance) → Progress via Anomaly Tiers.
