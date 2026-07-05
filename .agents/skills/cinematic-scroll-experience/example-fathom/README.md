# Example — FATHOM

A reference build produced by the **cinematic-scroll-experience** skill, run
against a fresh brief (an ocean descent) to demonstrate that the boilerplate is
theme-agnostic. Open `index.html` in a browser — it runs offline; three.js,
GSAP, ScrollTrigger and Lenis are vendored under `lib/`.

## How the theme layer (§1 of SKILL.md) was filled

| Slot | Value |
|---|---|
| Narrative arc | Sunlit ocean surface → bioluminescent abyss |
| Art direction | Painterly cyanotype deep-sea, procedural WebGL plates |
| Signature particle | Bubbles rising → plankton glowing (color + direction swap at the pivot) |
| State A / B | Turquoise sunlit surface → indigo abyss |
| Accent mark | 2-stroke wave glyph; rationed anglerfish-lure amber (`--accent`) |
| Script accent | Vertical kanji strips (Noto Serif JP) + depth numerals |
| Wordmark | FATHOM, JS-fitted to viewport width in the footer |

## What it exercises from the formula

- Loader → hero as one continuous shot (§4, §5.1)
- WebGL background shader with a **noise-threshold surface→abyss dissolve** (§5.5)
- Instanced particle system with pointer scatter and a day/night character swap (§5.1)
- Scroll-scrubbed "descent" chapter with depth gauge (§5.3, adapted to procedural content)
- Manifesto with inline image tokens + counting stats (§5.2)
- Pinned horizontal gallery with inner parallax and outlined numbers that fill at center (§5.4)
- Metamorphosis pivot: plate expands to full-bleed while the dissolve shader crossfades zones (§5.5)
- Footer "dawn" reversal, JS-fitted wordmark, magnetic CTA (§5.7)
- Nav light/dark auto-swap, progress rail, custom cursor, animated grain, reduced-motion fallbacks (§6, §7)

## Notes

- Fonts load from Google Fonts via a `<link>`; if offline they fall back gracefully.
- Uses procedural WebGL gradients as "plates" instead of photographic imagery.
  For a real project, drop image plates into `THREE.TextureLoader` exactly as the
  skill's §2 asset table describes.
