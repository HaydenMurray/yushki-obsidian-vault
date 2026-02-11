# Visual Direction — Game Concepts

> For a solo dev learning Unity. Pixel art. Be honest about scope.

---

# Theme A: Spire of Echoes (Cozy Lighthouse)

## 1. Pixel Art Style Reference

**Resolution target:** 320×180 native (16:9), scaled up. This is the "HD pixel art" sweet spot — detailed enough to be expressive, small enough for one person to manage. Think 32-bit era aesthetic with 16-bit discipline.

**Key references:**
- **Spiritfarer** (Thunder Lotus) — The gold standard for cozy pixel-adjacent art. Study their use of warm lighting, character silhouettes, and how environments feel *lived-in*. You're not matching their frame count, but steal their color philosophy.
- **Celeste** (Matt Thorson / Pedro Medeiros) — Specifically the overworld/dialogue art. Clean, readable pixel work with strong silhouettes. Pedro's pixel art tutorials are free and directly applicable.
- **Eastward** (Pixpil) — 32-bit pixel art with gorgeous lighting. Their interior scenes are what your lighthouse rooms should feel like.
- **Nausicaä / Laputa** (Ghibli) — For composition and color mood boards. Not pixel art, but your *emotional* reference.
- **Artists:** Pedro Medeiros (@saint11), Fool (fooltown.com), waneella (atmospheric pixel scenes)

**Palette constraints:**
- Limit yourself to **48-64 colors max** across the entire game. Use a curated palette (like Endesga 64 as a starting base), then customize.
- Warm bias. Even your blues should lean warm (teal, not ice).
- Every scene should have one dominant warm color and one cool accent. Never 50/50.

---

## 2. Screen-by-Screen Breakdown

### Title / Menu Screen
The lighthouse seen from the ocean at dusk. Fog rolls across the lower third. The lighthouse beam sweeps slowly (one animated element). Title text in a hand-drawn serif font, warm gold. Menu options ("New Voyage," "Continue," "Settings") appear as glowing text below, like light reflecting on water. **Simple. One parallax layer of fog, one rotating beam. That's it.**

### Idle Phase (Main Gameplay Screen)
**The heart of the game. This screen gets 60% of your art budget.**

The player sees the lighthouse interior — a cozy vertical cross-section (think Fallout Shelter, but one building). 3-4 visible floors. Each floor is a room: workshop, kitchen, observatory, beacon room. Echoes (small glowing creatures, 16×16 sprites with 2-frame idle animations) potter around the rooms doing tasks. Through windows on the left side, you see the ocean and sky — this is where weather changes telegraph what's coming.

Resources are generated passively. Small floating number particles (+3 Glow, +1 Driftwood) rise from active rooms. The lighthouse beam pulses gently at the top — it's your "health bar" in ambient form. Brighter = stronger.

**Key detail:** The ocean outside the windows shifts color based on game state. Calm = soft teal. Storm brewing = deep indigo. Post-combat = golden sunrise.

### Tension Phase (Boss Approaching)
Same screen, but the mood shifts. The sky outside darkens. Rain streaks appear on the windows (simple diagonal line particles). The lighthouse beam flickers. Echoes stop their idle animations and gather near the beacon room, looking outward. A shadow rises on the horizon — the Gale approaching. It should look beautiful, not scary. Think Howl's Moving Castle storm clouds — purple, electric blue, with golden lightning edges.

A "Prepare" prompt pulses at the bottom of the screen. The player has time to arrange their grid before combat begins.

### Grid Combat Screen
**Full-screen transition.** The cozy interior slides away (or fades to a vignette border). The grid fills the center of the screen — **8×8 tiles, each tile roughly 20×20 pixels at native res.** The grid sits on a stylized ocean surface. Tiles are circular or hexagonal with soft edges (not harsh squares — this is cozy combat).

Above the grid: the Gale — a swirling storm entity, 64×64 pixels, with 3-4 frame animation. It should look like a living weather pattern. Eyes in the clouds. Lightning as attack tells.

Below the grid: your Echoes lined up as "units." Each Echo type has a distinct silhouette and color. When you match tiles, Echoes leap forward with a small attack animation (2-3 frames + a particle burst).

**Juice priority:** Screen shake on matches. Tile-clear particles. Brief flash frames on big combos. These sell the combat with minimal animation.

### Post-Combat Results
The storm clears. Screen fades to a sunrise over the ocean (static painted background — invest in ONE gorgeous piece here). Results overlay: resources earned, Echoes that leveled up, damage taken. Presented as a "captain's log" — parchment-style panel with handwritten font. Echoes bounce happily at the bottom. A "Return to Lighthouse" button glows warmly.

### Prestige / Upgrade Screen
The **Observatory room**, zoomed in. A large circular table in the center with a star map / nautical chart. This is your tech tree — nodes on the map represent upgrades. Connected by dotted lines like sea routes. Unlocked nodes glow; locked ones are foggy. Spending resources lights up a node with a small sparkle animation.

Side panel shows current resources (Glow, Driftwood, Echo Essence). Keep it clean — icons + numbers, left-aligned.

**Achievable because:** It's mostly a static background + UI overlays. The "wow" is in the illustrated map, not animation.

### Settings / Codex
Simple panel overlay on a blurred background. Two tabs: Settings (standard sliders/toggles) and Codex. The Codex is a bestiary — each Echo and Gale gets a small portrait (32×32) and a text description. Frame it as a naturalist's journal with sketch-style borders. **This is low-priority art. Do it last. Placeholder rectangles are fine for months.**

---

## 3. UI Layout Concepts

```
┌─────────────────────────────────────┐
│ [☀️ Glow: 142] [🪵 Wood: 37] [⭐ Essence: 8]  │  ← Top bar, left-aligned. Small icons + numbers.
│                                     │     Semi-transparent dark background strip.
│                                     │
│         ┌───────────────┐           │
│  Ocean  │  LIGHTHOUSE   │  Ocean    │  ← Lighthouse cross-section, centered.
│  BG     │  (rooms with  │  BG      │     ~60% of screen width.
│  layer  │   Echoes)     │  layer   │     Ocean is parallax BG on both sides.
│         │               │          │
│         │               │          │
│         └───────────────┘          │
│                                     │
│ [📖 Codex] [⚙️ Settings] [🔭 Upgrades] │  ← Bottom bar, centered. Icon buttons.
│              [⚡ Storm in 2:34]       │  ← Storm timer, centered below buttons.
└─────────────────────────────────────┘
```

**Grid combat layout:**
```
┌─────────────────────────────────────┐
│  [❤️ Lighthouse HP ████████░░]       │  ← Top: health bar (lighthouse beam strength)
│                                     │
│           🌀 GALE BOSS 🌀           │  ← Boss sprite, centered, top third
│          [Boss HP ██████░░░░]        │
│                                     │
│         ┌──────────────┐            │
│         │  8×8  GRID   │            │  ← Grid: centered, middle of screen
│         │              │            │     ~50% screen height
│         │              │            │
│         └──────────────┘            │
│                                     │
│  🟡🔵🟢🟠🟡  ← Echo squad (bottom)   │  ← Your units, with small HP pips
│  [Moves: 12]  [Combo: x3]          │  ← Bottom bar: turn counter + combo
└─────────────────────────────────────┘
```

**Information hierarchy (most → least prominent):**
1. The lighthouse / grid (center, largest)
2. Boss or storm state (top, animated)
3. Resources / HP (top bar, always visible but unobtrusive)
4. Action buttons (bottom, accessible but not dominant)
5. Timers and secondary info (small text, bottom center)

---

## 4. Animation Priorities

### MUST animate (sells the experience):
- **Lighthouse beam rotation** — 1 slow rotation, looping. This is your signature visual.
- **Echo idle animations** — 2 frames each, gentle bob. They need to feel alive.
- **Tile matching particles** — Burst of 4-6 particles on match. Color-coded. Cheap to implement, massive juice.
- **Ocean waves** — 2-3 frame loop on the background water. Palette swap technique (shift 3 blue values cyclically). Nearly free performance-wise.
- **Screen shake** — On big matches and boss attacks. Code-only, no art needed.
- **Weather transitions** — Palette shifts (lerp between color ramps). Code-driven, minimal art.

### Nice to have (do later):
- Echo walk cycles (4 frames)
- Boss attack animations (3-4 frames)
- Room crafting animations
- Fog/cloud parallax layers
- UI button hover effects

### Can be static:
- Room interiors (furniture, decorations)
- Upgrade screen star map
- Codex portraits
- Post-combat background
- Menu background (except the beam)

---

## 5. Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Warm Gold | 🟡 | `#F2C744` | Lighthouse beam, Glow resource, highlights |
| Sunset Orange | 🟠 | `#E88B47` | Warm accents, fire, cozy interiors |
| Deep Teal | 🔵 | `#2D6E7E` | Ocean, calm sky, cool shadows |
| Fog Lavender | 🟣 | `#B8A9C9` | Fog, mystery, storm approaching |
| Driftwood Brown | 🟤 | `#8B6B4A` | Wood, UI frames, lighthouse structure |
| Cream White | ⚪ | `#F5ECD7` | Text, Echo glow, highlights |
| Storm Indigo | 🔵 | `#3D2B56` | Gale bosses, deep shadows, night sky |
| Seafoam Green | 🟢 | `#7EC8A0` | Echo creatures, healing, nature |

**Rule:** Every screen should be 60% warm tones, 30% cool tones, 10% bright accent.

---

## 6. The Screenshot Test

**The ONE image that sells this game:**

The idle phase screen. Dusk. The lighthouse glows warmly from within — you can see through the windows into 3-4 cozy rooms. An Echo sits on the roof, legs dangling, looking at a purple-orange sunset. The beam sweeps through light fog. The ocean below is deep teal with golden reflections. In the far distance, barely visible, a beautiful storm with lightning edges approaches on the horizon. The UI is minimal — just a few resource icons in the corner. The whole image says: "This is your home. Something is coming. You're ready."

**What makes it work:** Contrast between cozy warmth and vast, beautiful danger. The player immediately understands the loop — tend your home, face the storm.

---
---

# Theme B: GRINDSTONE (Deep-Sea Mining Rig)

## 1. Pixel Art Style Reference

**Resolution target:** 320×180 native, same as Theme A. But here, push toward a **crisper, more geometric** style. Think clean lines, hard edges, neon against dark. 32-bit aesthetic with a modern indie sensibility.

**Key references:**
- **Hyper Light Drifter** (Heart Machine) — The absolute reference for this vibe. Minimal UI, saturated neons against dark environments, and a sense of vast loneliness. Study their use of negative space.
- **Subnautica** (Unknown Worlds) — Not pixel art, but your *world-building* reference. The sense of depth, bioluminescence as both beauty and danger, the claustrophobia of deep water.
- **Rain World** (Videocult) — Pixel art with incredible atmosphere. The way creatures move, the environmental storytelling. Your Leviathans should feel this alive.
- **Caves of Qud** / **Cogmind** (grid-based UI inspiration) — For making a grid feel like a tactical readout, not a candy-crush board.
- **Artists:** Ansimuz (clean sci-fi pixel art), kldpxl (atmospheric scenes), waneella (neon cityscapes for color reference)

**Palette constraints:**
- **Dark-dominant.** 70%+ of pixels should be dark blues, blacks, charcoals.
- Limited palette: **32-40 colors max.** Bioluminescent colors pop BECAUSE the base is dark.
- No pure white. Brightest color is a pale cyan or electric blue.
- Accent colors must feel like they're *emitting light* — achieve this with 1px glow halos around bright elements.

---

## 2. Screen-by-Screen Breakdown

### Title / Menu Screen
Black ocean. Complete darkness except: the mining rig, seen from below, descending into frame from the top. Its floodlights cut through murky water. Tiny bioluminescent particles drift lazily (simple 1px dots with slow sine-wave movement). The title "GRINDSTONE" in blocky, industrial stencil font — electric cyan with a subtle flicker. Menu options in monospace font below. **One ambient sound does the heavy lifting here. Visually, it's dark + a few lights + particles. Very achievable.**

### Idle Phase (Main Gameplay Screen)
**The rig interior.** Top-down or slight isometric view of the mining platform — a series of connected modules (drill bay, refinery, drone hangar, command center). Think a space station, but underwater. Through transparent floor panels and viewports, you see the abyss — dark water with occasional bioluminescent creatures drifting past (parallax background layer).

Drones (your units) move between modules on set paths. Resource counters tick up: Ore, Fuel, Bio-Samples. The drill at the center of the rig pulses — it's your main "progress" indicator. Deeper drill = more resources = bigger threats attracted.

**Key atmosphere detail:** Sonar pings. Every 10-15 seconds, a green sonar ring radiates outward from the rig across the background. When a Leviathan is approaching, a red blip appears on the ring. This is your tension telegraph — no UI needed, it's diegetic.

### Tension Phase (Boss Approaching)
Lights flicker. The rig switches to red emergency lighting (palette swap the entire base — cheap, dramatic). Viewport backgrounds show something HUGE moving in the dark — just a shadow and two bioluminescent eyes. Drones automatically return to the hangar. A klaxon icon flashes. The sonar ring shows the creature getting closer with each ping.

**The key emotion:** You're small. It's big. But you have a plan.

A "Deploy Grid" button appears. This is the player committing to combat.

### Grid Combat Screen
Full-screen. The grid is a **tactical overlay** — think submarine radar / targeting computer aesthetic. 8×8 grid with thin cyan gridlines on a near-black background. Tiles are geometric shapes (hexagons or diamonds, not rounded — this is industrial).

The Leviathan occupies the top of the screen — a massive creature, mostly in shadow, with glowing features (eyes, patterns, tendrils). Only parts of it are visible — it's too big to show fully. **This sells scale with minimal art.** You draw one section of the creature (64×96 pixels) and imply the rest extends off-screen.

Below the grid: your drone squad. Each drone type has a distinct geometric silhouette and a signature color (cyan for scouts, orange for miners, magenta for combat). When tiles match, drones fire — laser lines streak across the grid to the target. Simple, satisfying, and just a line renderer.

**Juice:** Grid tiles light up on hover. Matched tiles shatter with angular particle fragments. Drone attacks are straight laser lines with brief impact flashes. All cheap to implement.

### Post-Combat Results
The Leviathan retreats into the dark. Screen fades to the rig's command center — a single room with monitors. Results display on an in-world screen (diegetic UI): resources salvaged from the creature, drone damage report, depth progress. Styled like a terminal readout — monospace font, scrolling text effect. A "bio-scan" of the defeated creature fills in a silhouette in your codex.

**Clean and cheap.** It's a text panel with a frame around it.

### Prestige / Upgrade Screen
The **Drone Hangar**, zoomed in. Drones are displayed on maintenance racks. Select a drone to upgrade — its stats appear on a side panel as a technical schematic. Upgrade paths are linear (Mk I → Mk II → Mk III) with branching specializations. Spend resources to fill progress bars.

The rig itself can be upgraded too — shown as a top-down schematic blueprint. Add new modules, reinforce existing ones. Each module is a simple rectangular tile on the blueprint.

**Achievable because:** Schematics and blueprints are inherently low-detail. Clean lines on dark backgrounds. The art style *is* the UI here.

### Settings / Codex
Same terminal aesthetic as the results screen. The Codex is a "Deep Sea Database" — each creature gets a sonar-scan silhouette that fills in with detail as you encounter them more. Start as a blurry outline, become a full pixel portrait after multiple kills. Text entries read like scientific field notes. **Low art priority but high flavor.**

---

## 3. UI Layout Concepts

```
┌─────────────────────────────────────┐
│ [⛏️ Ore: 2,841] [⛽ Fuel: 67%] [🧬 Bio: 14] │  ← Top bar. Monospace font. Left-aligned.
│ [DEPTH: 847m ▼]              [⚡ALERT]│  ← Depth counter (always ticking). Alert icon.
│                                     │
│     ┌─────────────────────┐         │
│     │                     │         │
│     │    MINING RIG       │         │  ← Rig schematic, centered. ~65% screen.
│     │    (top-down)       │         │     Dark BG with bioluminescent particles.
│     │                     │         │
│     │         ◉ DRILL     │         │
│     └─────────────────────┘         │
│  ╔══════════╗                       │
│  ║ SONAR    ║  [🔧 Hangar] [📡 Upgrades] │  ← Bottom-left: mini sonar display
│  ║  · · ◉   ║  [📋 Codex]  [⚙️ Settings] │     Bottom-right: navigation buttons
│  ╚══════════╝                       │
└─────────────────────────────────────┘
```

**Grid combat layout:**
```
┌─────────────────────────────────────┐
│  ◤◤◤ LEVIATHAN ◥◥◥                  │  ← Creature, top. Partially off-screen.
│  [████████░░░░░░] CARAPACE INTEGRITY │  ← Boss HP as "structural integrity"
│  ═══════════════════════════════════ │  ← Divider line (scanline effect)
│                                     │
│         ┌──────────────┐            │
│         │              │            │
│         │   8×8 GRID   │            │  ← Grid: centered, clean lines
│         │  (tactical   │            │     Tiles are angular, not rounded
│         │   overlay)   │            │
│         └──────────────┘            │
│                                     │
│  [🤖×4 Drones] [Matches: 3] [Depth Charge: READY] │  ← Bottom: squad status + abilities
│  [RIG HULL ████████████░░]          │  ← Your HP bar
└─────────────────────────────────────┘
```

**Information hierarchy:**
1. The Leviathan / grid (center stage)
2. Rig hull HP (bottom — your survival)
3. Boss integrity (top — your target)
4. Drone status and abilities (bottom bar)
5. Resources (top bar, persistent but small)
6. Sonar / depth (ambient, atmospheric)

---

## 4. Animation Priorities

### MUST animate (sells the experience):
- **Sonar ping** — Radiating circle, 1-2 second loop. This IS the game's identity. Simple ring expanding outward with fade.
- **Bioluminescent particles** — 1px dots with slow drift and gentle pulse (sine wave on opacity). 10-20 on screen at once. Shader or simple script.
- **Leviathan eyes / glow patterns** — 2-frame pulse on bioluminescent features. The creature breathes with light.
- **Drill rotation** — 2-4 frame loop. Central to the idle screen.
- **Laser attacks** — Line renderer from drone to target. Instant on, brief fade. Code-only, no sprite animation needed.
- **Emergency lighting** — Palette swap / tint shift. Code-driven.

### Nice to have:
- Drone movement paths (lerp between points)
- Leviathan shadow movement in tension phase
- Water caustic overlay (tiling animated texture)
- Terminal text scroll effect
- Grid tile hover glow

### Can be static:
- Rig module interiors
- Drone hangar / upgrade screen
- Codex creature portraits
- Background deep-sea environment (beyond particles)
- Menu screen (except particles)

---

## 5. Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Abyss Black | ⚫ | `#0A0E17` | Primary background, deep ocean |
| Rig Steel | 🔘 | `#3A4A5C` | Rig structure, UI frames, inactive elements |
| Sonar Cyan | 🔵 | `#00E5FF` | Sonar, scanner UI, drone highlights, primary accent |
| Biolume Magenta | 🟣 | `#FF2D78` | Leviathan features, danger, combat accents |
| Ore Amber | 🟠 | `#FFB830` | Resources, progress, warmth (rare — use sparingly) |
| Toxic Green | 🟢 | `#39FF14` | Bio-samples, mutations, sonar blips |
| Deep Navy | 🔵 | `#141E30` | Secondary background, gradient mid-tone |
| Alert Red | 🔴 | `#FF3344` | Emergency, damage, critical warnings |

**Rule:** Cyan is your "safe" color, magenta is "danger." The player should read threat level from color alone. 80%+ of the screen is dark at all times. Light is information.

---

## 6. The Screenshot Test

**The ONE image that sells this game:**

The grid combat screen. Mid-fight. The grid is center-screen, electric cyan lines on darkness. Three tiles are mid-shatter, angular fragments flying. A laser line streaks from a drone squad at the bottom toward the top of the screen. And at the top — the Leviathan. You can only see its lower jaw and two massive bioluminescent eyes peering down at your tiny rig. Magenta light spills from patterns along its hide. The sonar ring is mid-pulse in the background. One stat in the corner reads "DEPTH: 2,847m."

**What makes it work:** The scale contrast — your tiny grid and drones against something enormous and alive. The darkness makes every light source feel precious. The player immediately understands: you are deep, you are small, and you are fighting something ancient. The tactical grid says "I have tools." The creature says "You'll need them."

---
---

# Production Notes for Solo Dev

## Start Here (Art Priority Order)
1. **Grid tiles and match effects** — This is your core loop. Grey-box everything else until this feels good.
2. **One Echo / one Drone sprite** — Prove your character art pipeline before making all variants.
3. **Idle screen background** — One painted BG per theme. This is where you spend real time.
4. **Boss placeholder** — Silhouette + glowing eyes. Iterate on detail later.
5. **UI frames and fonts** — Pick a pixel font (suggestion: m5x7 or Press Start 2P) and commit.
6. Everything else comes after the game is playable.

## Tools
- **Aseprite** — Industry standard for pixel art and animation. Worth the $20.
- **Lospec Palette List** — Browse existing palettes instead of making your own from scratch.
- **ShaderGraph (Unity)** — For palette swaps, glow effects, and screen tints. Learn it early — it replaces dozens of sprite variants.
- **TextMeshPro (Unity)** — For all UI text. Pixel fonts need specific import settings (Point filtering, no compression).

## Scope Reality Check
- A 320×180 game with 48 colors and 2-frame animations is **very achievable** solo.
- Budget ~2-4 hours per unique character sprite (with animation).
- Budget ~4-8 hours per detailed background scene.
- Budget ~1-2 hours per set of grid tiles.
- The cozy theme (A) needs more detailed environments but simpler VFX.
- The deep-sea theme (B) needs less environment detail but more lighting/shader work.
- **Pick one theme and commit.** Don't prototype both.
