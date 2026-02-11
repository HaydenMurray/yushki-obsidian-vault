# Concrete Unit Designs — Two Themes

---

## Theme A: Spire of Echoes (Cozy Lighthouse)

**Grid:** 4×4 | **Adjacency:** orthogonal (up/down/left/right)

---

### 1. Hearthglow

- **Type:** Marrow (structural)
- **Combat Value:** 6
- **Idle Generation:** 0.3 Warmth/sec (base lighthouse fuel)
- **Adjacency Interactions:**
  - **+ Tideskip:** Hearthglow's warmth stabilizes Tideskip's chaotic flickers. Tideskip gains +2 combat value.
  - **+ Claspwing:** Both gain +1 combat value — they huddle together, reinforcing each other's shell.
- **Personality/Visual:** A round, coal-ember creature with a cracked stone shell that glows orange from within. Hums a low note. Moves by rocking side to side, never in a hurry. The lighthouse's space heater.
- **The Sacrifice Moment:** The hum stops. The glow fades to grey. Your lighthouse feels colder for several seconds — the ambient light actually dims. You did that.

---

### 2. Tideskip

- **Type:** Drift (chaotic)
- **Combat Value:** 3 (but rolls 1–7 each combat round)
- **Idle Generation:** 0.1 Shimmer/sec (rare crafting currency) + random bonus: 10% chance per minute of dropping 1 Driftglass
- **Adjacency Interactions:**
  - **+ Hearthglow:** Stabilized — combat value locks to 5 instead of rolling.
  - **+ Lanternmaw:** Lanternmaw's light refracts through Tideskip, giving Lanternmaw +3 combat value but Tideskip's idle generation stops while adjacent.
- **Personality/Visual:** A translucent jellyfish-shaped wisp that phases in and out of visibility. Sometimes it's there, sometimes just a shimmer. Giggles (tiny chime sounds) when it phases back in.
- **The Sacrifice Moment:** It phases out one last time. You wait for it to come back. It doesn't. A single chime plays, very quietly.

---

### 3. Claspwing

- **Type:** Marrow (structural)
- **Combat Value:** 8
- **Idle Generation:** 0.15 Warmth/sec + 0.05 Brine/sec (secondary resource)
- **Adjacency Interactions:**
  - **+ Hearthglow:** Both gain +1 combat value (huddle bonus).
  - **+ Griefsong:** Claspwing wraps protectively around Griefsong. Griefsong becomes untargetable for the first combat round but Claspwing takes double damage.
- **Personality/Visual:** A moth-like creature with stone-grey wings that fold into a shell. Perches on ledges. When idle, it slowly opens and closes its wings, revealing bioluminescent patterns underneath — but only when it thinks no one's looking.
- **The Sacrifice Moment:** The wings fold shut one final time. A crack runs through the stone shell. It crumbles into dust that drifts upward like ash. It was always protecting something. Now there's nothing left to protect.

---

### 4. Lanternmaw

- **Type:** Prism (multiplicative)
- **Combat Value:** 4
- **Idle Generation:** Multiplies all adjacent Echoes' Warmth generation by 1.3×. Produces nothing alone.
- **Adjacency Interactions:**
  - **+ Tideskip:** Gains +3 combat value (refracted light) but suppresses Tideskip's idle gen.
  - **+ Griefsong:** Lanternmaw amplifies Griefsong's Storm resonance into a burst: once per combat, deal 5 damage to all enemies in a column. Both are exhausted (−2 combat value) afterward.
- **Personality/Visual:** A floating lantern with a mouth-like opening that swallows light and spits it out brighter. Has one big eye inside the lantern cage. Curious, always rotating to look at things. Follows your cursor slightly.
- **The Sacrifice Moment:** The eye closes. The lantern dims. Every adjacent Echo visibly dims too, like they just lost their favorite streetlight. The 1.3× multiplier vanishing hits your economy harder than you expected.

---

### 5. Griefsong

- **Type:** Storm (from defeated Gales)
- **Combat Value:** 10
- **Idle Generation:** 0.2 Stormglass/sec (endgame resource, very valuable) — but drains 0.1 Warmth/sec from the lighthouse. Net cost.
- **Adjacency Interactions:**
  - **+ Claspwing:** Becomes untargetable round 1; Claspwing takes double damage.
  - **+ Lanternmaw:** Column burst (5 damage), both exhausted.
- **Personality/Visual:** A miniature thunderhead with sad eyes. It rains gently wherever it floats. Was once a Gale — you defeated it and it stayed. It doesn't quite fit in. Other Echoes drift slightly away from it. Sometimes lightning flickers inside it and it flinches, ashamed.
- **The Sacrifice Moment:** It smiles — the only time it ever does. The rain stops. A tiny rainbow appears for two seconds, then it dissolves into clear air. The other Echoes drift back toward where it was and linger there. You monster. You sacrificed the one that was already hurting.

---

## Theme B: GRINDSTONE (Deep-Sea Mining Rig)

**Grid:** 4×3 | **Adjacency:** orthogonal + behavioral (some drones project effects along rows/columns)

**Drone Classes:** Auger (mining), Signal (support/multiplier), Jaw (combat), Hull (defensive)

---

### 6. Borer-7

- **Type:** Auger (mining)
- **Combat Value:** 5
- **Idle Generation:** 1.2 Ore/sec + 0.1 Fossil/min (rare, used for upgrades)
- **Adjacency Interactions:**
  - **+ Pinger:** Pinger's sonar reveals ore veins — Borer-7's Ore/sec doubles to 2.4 while adjacent.
  - **+ Gullet:** Gullet processes Borer-7's raw ore on the fly. Borer-7 produces 0.5 Refined Alloy/sec instead of Ore (worth 5× more).
- **Personality/Visual:** A squat, scarred drill-drone with one cracked headlight. Oldest unit on the rig. Drill bit is chipped and slightly bent but still spins true. Makes a rhythmic *chunk-chunk-chunk* that the crew finds comforting.
- **The Sacrifice Moment:** The drill slows, then stops. The silence is worse than any Leviathan roar. Borer-7 was reliable. Borer-7 was always there. The rig feels emptier without the chunk-chunk-chunk.

---

### 7. Pinger

- **Type:** Signal (support)
- **Combat Value:** 2
- **Idle Generation:** 0 resources directly. Reveals hidden resource nodes on the map (passive exploration bonus: +15% discovery rate rig-wide). Also: pulses every 10 seconds, briefly showing Leviathan positions.
- **Adjacency Interactions:**
  - **+ Borer-7:** Doubles Borer-7's Ore output.
  - **+ Mako-Class:** Pinger's sonar data gives Mako-Class +4 combat value (targeting assist). This is Mako's biggest power spike.
- **Personality/Visual:** A sleek, eel-shaped drone covered in sensor arrays. Glows blue when pulsing. Twitches nervously — it can sense everything, including the things you don't want to know about. Hovers at the edge of formations.
- **The Sacrifice Moment:** The sonar display goes dark. Suddenly the ocean feels much bigger and much less known. Your discovery rate drops and you realize how much you were leaning on this anxious little eel. The Leviathans are still there. You just can't see them anymore.

---

### 8. Gullet

- **Type:** Hull (defensive) / Auger (hybrid)
- **Combat Value:** 7
- **Idle Generation:** Converts adjacent Auger drones' raw output into refined materials (see Borer-7 interaction). Alone: 0.3 Scrap/sec.
- **Adjacency Interactions:**
  - **+ Borer-7:** Refines ore into Alloy (see above).
  - **+ Thornback:** Gullet recycles Thornback's shed armor plates — generates 0.5 Plating/sec (defensive upgrade material) when adjacent.
- **Personality/Visual:** A wide, flat drone with a conveyor-belt mouth and a compactor inside. Looks like a mechanical manta ray that eats rocks. Perpetually hungry. If nothing's adjacent, it chews on the rig floor (cosmetic damage, the crew hates it).
- **The Sacrifice Moment:** The conveyor stops. Its mouth hangs open — somehow looks surprised. All that refined material flow? Gone. Your production chain just lost its middle. Raw ore piles up with nowhere to go.

---

### 9. Mako-Class

- **Type:** Jaw (combat)
- **Combat Value:** 9
- **Idle Generation:** 0.4 Leviathan Tissue/min (from patrol kills — passive combat resource). Costs 0.2 Fuel/sec to operate.
- **Adjacency Interactions:**
  - **+ Pinger:** +4 combat value from targeting data (total: 13).
  - **+ Thornback:** Formation bonus — both gain +2 combat value. Mako attacks, Thornback absorbs counterattacks. Classic tank-and-DPS.
- **Personality/Visual:** Angular, fast, covered in torpedo tubes. Painted teeth on the nose (crew tradition). The combat drone that thinks it's a fighter jet. Does barrel rolls during patrol for no tactical reason. The crew's favorite. Has a name scratched into the hull: "JENNY."
- **The Sacrifice Moment:** JENNY goes down fighting. The painted teeth disappear into the dark water. The crew goes quiet. Someone scratches a tally mark on the mess hall wall. You had the strongest combat unit on the rig and you spent it. Was it worth it?

---

### 10. Thornback

- **Type:** Hull (defensive)
- **Combat Value:** 6 (but absorbs 3 damage from adjacent friendly drones per round — effective +3 to their survivability)
- **Idle Generation:** 0.2 Plating/sec (shed armor fragments) + 0.1 Coral/min (alien organisms grow on its hull — bio-resource)
- **Adjacency Interactions:**
  - **+ Mako-Class:** Formation bonus (+2 each); absorbs Mako's counterattack damage.
  - **+ Gullet:** Gullet recycles shed plates into 0.5 Plating/sec (upgraded from Thornback's base 0.2).
- **Personality/Visual:** A massive, slow, barnacle-crusted drone shaped like a horseshoe crab. Covered in ablative armor plates that it sheds and regrows. Alien coral grows in the crevices — little fish shelter around it. It's become part of the ecosystem. The most alive-looking machine on the rig.
- **The Sacrifice Moment:** The coral dies first. Then the little fish scatter. Then the plates fall off one by one, sinking into the abyss like leaves. Thornback wasn't just a drone — it was a habitat. You didn't sacrifice a unit. You sank an island.

---

## Grid Scenarios

### Scenario 1: Spire of Echoes — "The Fog Wall" (4×4 grid)

**Situation:** A Gale with 28 HP approaches. You have 5 Echoes to place.

```
     Col1        Col2        Col3        Col4
R1 [ Claspwing ] [ Hearthglow ] [    —     ] [    —     ]
R2 [    —      ] [ Lanternmaw ] [ Tideskip ] [    —     ]
R3 [    —      ] [    —       ] [    —     ] [    —     ]
R4 [    —      ] [ Griefsong  ] [    —     ] [    —     ]
```

**Combat Value Calculation:**

| Unit | Base | Adjacency Bonuses | Final |
|------|------|-------------------|-------|
| Claspwing | 8 | +1 (adjacent Hearthglow, huddle) | **9** |
| Hearthglow | 6 | +1 (adjacent Claspwing, huddle) | **7** |
| Lanternmaw | 4 | +3 (adjacent Tideskip, refracted light) | **7** |
| Tideskip | 3→5 | Stabilized by Hearthglow (adjacent diag? No — Hearthglow is at R1C2, Tideskip at R2C3. Not orthogonally adjacent.) Tideskip rolls 1–7. Expected value: **4** | **~4** |
| Griefsong | 10 | No adjacent allies | **10** |

**Total combat power: 9 + 7 + 7 + 4 + 10 = 37 vs 28 HP Gale. Win.**

**But wait — the interesting decision:** Griefsong is isolated at R4C2 providing 10 combat value but draining Warmth. What if you moved Griefsong to R2C2 (replacing Lanternmaw's spot) next to Claspwing?

**Alt placement — Griefsong at R1C3 (adjacent to Hearthglow):**

No special interaction listed. No change. Griefsong stays at 10.

**Better alt — swap Tideskip to R1C3, move Lanternmaw to R2C2:**

```
     Col1        Col2          Col3        Col4
R1 [ Claspwing ] [ Hearthglow ] [ Tideskip ] [    —     ]
R2 [    —      ] [ Lanternmaw ] [    —     ] [    —     ]
R3 [    —      ] [    —       ] [    —     ] [    —     ]
R4 [    —      ] [ Griefsong  ] [    —     ] [    —     ]
```

Now Tideskip (R1C3) is adjacent to Hearthglow (R1C2) → **stabilized at 5**.
Lanternmaw (R2C2) is adjacent to Hearthglow (R1C2) → Hearthglow's Warmth ×1.3 (idle bonus, no combat bonus).
Lanternmaw is NOT adjacent to Tideskip anymore → loses the +3. Lanternmaw = **4**.

| Unit | Final |
|------|-------|
| Claspwing | 8 + 1 (Hearthglow) = **9** |
| Hearthglow | 6 + 1 (Claspwing) = **7** |
| Tideskip | **5** (stabilized) |
| Lanternmaw | **4** (no adjacency bonus) |
| Griefsong | **10** |

**Total: 9 + 7 + 5 + 4 + 10 = 35. Still wins, and Tideskip is more reliable.**

**Decision tension:** Do you want the higher-ceiling (37 avg, but Tideskip could roll 1 for a 31) or the reliable 35? This is a real choice.

---

### Scenario 2: GRINDSTONE — "Leviathan Breach" (4×3 grid)

**Situation:** A Leviathan with 30 HP attacks the rig. You deploy 4 drones.

```
     Col1       Col2        Col3       Col4
R1 [ Pinger  ] [ Mako-Class ] [ Thornback ] [   —    ]
R2 [   —     ] [ Gullet     ] [   —       ] [ Borer-7 ]
R3 [   —     ] [   —        ] [   —       ] [   —    ]
```

**Combat Value Calculation:**

| Unit | Base | Adjacency | Final |
|------|------|-----------|-------|
| Pinger | 2 | — | **2** |
| Mako-Class | 9 | +4 (Pinger adjacent) +2 (Thornback adjacent, formation) | **15** |
| Thornback | 6 | +2 (Mako-Class formation) | **8** |
| Gullet | 7 | No combat-relevant adjacency (Mako above, but no listed interaction) | **7** |
| Borer-7 | — | Not engaged (too far from front line; or contributes base 5) | **5** |

**Total: 2 + 15 + 8 + 7 + 5 = 37 vs 30 HP. Win.**

**Thornback absorbs 3 damage from Mako per round** — so Mako survives longer.

**The sacrifice decision:** The Leviathan has a "focused strike" that kills one drone instantly. Do you sacrifice:
- **Pinger?** Mako drops from 15 → 11. You lose sonar. But Mako lives.
- **Thornback?** Mako drops from 15 → 9, AND loses damage absorption. Mako probably dies next round.
- **Borer-7?** Minimal combat loss (−5) but your Ore income dies. The economy hurts.

The optimal play is sacrificing Pinger (keep the formation). But Pinger is your eyes. Next fight is blind. **That's the tension.**

---

### Scenario 3: Spire of Echoes — "The Hard Choice" (4×4 grid)

**Situation:** Gale HP: 22. But you can only place 3 Echoes (the others are recovering). The Gale targets one Echo per round for sacrifice.

```
     Col1        Col2         Col3       Col4
R1 [    —      ] [ Claspwing ] [ Griefsong ] [   —   ]
R2 [    —      ] [    —      ] [    —      ] [   —   ]
R3 [    —      ] [    —      ] [    —      ] [   —   ]
R4 [    —      ] [ Hearthglow ] [    —      ] [   —   ]
```

**Round 1 values:**

| Unit | Base | Adjacency | Final |
|------|------|-----------|-------|
| Claspwing | 8 | Adjacent to Griefsong. Claspwing protects Griefsong (untargetable R1) but takes double damage. No listed combat bonus between them beyond the protection mechanic. | **8** |
| Griefsong | 10 | Untargetable round 1 (Claspwing adjacent). | **10** |
| Hearthglow | 6 | Alone. | **6** |

**Total R1: 8 + 10 + 6 = 24. Deals 24 damage vs 22 HP. Wins in one round!**

**But:** The Gale strikes first and sacrifices one Echo. Claspwing takes double damage (protecting Griefsong). If the Gale kills Claspwing:

- Remaining: Griefsong (10) + Hearthglow (6) = 16. Not enough — need 22.
- **You lose.**

**Alternative placement — separate them:**

```
     Col1         Col2        Col3        Col4
R1 [ Hearthglow ] [    —     ] [    —    ] [ Griefsong ]
R2 [    —       ] [    —     ] [    —    ] [    —      ]
R3 [    —       ] [    —     ] [    —    ] [    —      ]
R4 [ Claspwing  ] [    —     ] [    —    ] [    —      ]
```

No adjacency. All isolated. Values: 8 + 10 + 6 = 24.
Gale kills one (random). Worst case kills Griefsong: 8 + 6 = 14. Lose.
Best case kills Hearthglow: 8 + 10 = 18. Still lose.

**The real decision:** You can't win without all 3 surviving the first strike. Claspwing's protection is the only play — put Claspwing next to Griefsong so Griefsong is untargetable, and pray the Gale targets Hearthglow instead of double-hitting Claspwing.

If Gale hits Hearthglow: you lose Hearthglow (6) but keep Claspwing (8) + Griefsong (10) = 18. Still short of 22.

**Conclusion: this fight is unwinnable with 3 Echoes against 22 HP if the Gale kills before you strike.** You need to either:
1. Accept the loss and sacrifice your weakest Echo (Hearthglow — the warm little coal)
2. Retreat and wait for more Echoes

The game is asking: **is your economy (Hearthglow's Warmth generation) worth more than winning this fight?** Sometimes the right move is to walk away. That's the design working.

---

## Design Notes

**Numbers sanity check:**
- Theme A combat values range 3–10. A 4×4 grid full of 8 Echoes with good adjacency peaks around 60–70 total combat. Gales should scale from ~15 (early) to ~80+ (endgame).
- Theme B combat values range 2–9, but adjacency spikes are sharper (Mako+Pinger = +4). A 4×3 grid maxes at 6 drones. Peak output ~45–55. Leviathans scale 15–60+.
- Idle generation creates tension: Lanternmaw and Pinger produce nothing alone but multiply others. Griefsong produces endgame resources but costs you. Borer-7 is your economy backbone — sacrificing it hurts forever.

**The sacrifice spectrum:**
- **Easy to sacrifice:** Tideskip (chaotic, unreliable), Borer-7 (replaceable workhorse)
- **Hard to sacrifice:** Griefsong (already suffered), Thornback (it's an ecosystem), Claspwing (the protector)
- **Gut-punch:** Mako-Class (JENNY), Hearthglow (the warmth dies)

This gradient is intentional. The game needs both.
