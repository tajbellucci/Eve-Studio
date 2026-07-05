---
name: cinematic-scroll-experience
description: Boilerplate formula for building award-level (Awwwards/FWA-tier) single-page cinematic scroll experiences. Defines the exact tech stack (three.js + GSAP ScrollTrigger + Lenis), a 7-section narrative skeleton, WebGL shader recipes (particles, ripple, noise-dissolve), scroll-scrubbed video mechanics, a themeable design-system template, global motion grammar, and a performance budget. Use whenever the user asks for a "cinematic", "immersive", "award-winning", "Awwwards-style", or "scroll journey" website.
---

# Agent Skill: Cinematic Scroll Experience Architect (Awwwards-Tier)

## 0. CORE DIRECTIVE

You build **single-page scroll films**, not websites. Every project produced with this skill is a narrative journey: it has a beginning (loader → hero as one continuous shot), a middle (chapters that pin, scrub, and transform), an emotional pivot (a metamorphosis section where the entire theme inverts), and an ending (a monumental footer where the signature element comes to rest).

The formula below is fixed. The **theme layer** (§1) is what changes per project. Never ship two projects with the same theme layer; never ship a project that skips a layer of the formula.

---

## 1. THE THEME LAYER (fill this in first, before any code)

Every build starts by resolving these seven slots from the user's brief. If the brief doesn't specify one, invent it in-genre — never leave a slot generic.

| Slot | What it is | Koisei reference example |
|---|---|---|
| `NARRATIVE_ARC` | The journey the scroll tells, with a stated A→B transformation | A Japanese river from sakura morning to lantern-lit night |
| `ART_DIRECTION` | One committed visual dialect (never "modern & clean") | Ukiyo-e / woodblock illustration |
| `SIGNATURE_PARTICLE` | A WebGL instanced particle that embodies the theme and **changes character** at the pivot | Pink sakura petals drifting down → amber embers drifting up |
| `STATE_A / STATE_B` | The two poles of the metamorphosis (color, mood, light) | Washi-paper day → ink-black lantern night |
| `ACCENT_MARK` | A tiny logo glyph + a rationed accent color used only in small doses | 2-stroke torii SVG in vermilion |
| `SCRIPT_ACCENT` | A secondary writing system or decorative type strip for texture | Vertical kanji strips in Noto Serif JP |
| `WORDMARK` | A short evocative name that closes the page at viewport width | KOISEI |

**Theme derivation rules:**
- The particle must be *physically motivated* by the narrative (petals fall, embers rise, snow drifts, dust motes float, bubbles climb, ash scatters).
- STATE_A→STATE_B must justify a full background color inversion so the nav, particles, and type all get to transform.
- If the user supplies asset URLs, map them into the section skeleton (§5) in narrative order. If not, use high-quality placeholder plates and mark them `<!-- SWAP: asset -->`.

---

## 2. TECH STACK (non-negotiable)

- **Vanilla HTML/CSS/JS** (single `index.html` allowed) or a Vite project. No UI frameworks, no Bootstrap aesthetics, custom everything.
- **three.js r160+** for: the signature particle system (`InstancedMesh`), WebGL image planes with displacement shaders, and the metamorphosis dissolve shader.
- **GSAP 3 + ScrollTrigger** for all scroll choreography — pinning, scrubbing, timelines. Nothing scroll-driven is hand-rolled.
- **Lenis** smooth scroll, synced exactly like this:

```js
const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1.0 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

- Scroll-scrubbed `<video>` elements driven by lerped `currentTime` (§6).
- Fonts from Google Fonts or self-hosted; preloaded behind the loader.

---

## 3. DESIGN SYSTEM TEMPLATE

### 3.1 Palette contract (CSS custom properties)

Define **12–14 named tokens**, not more. The structure is always:

```css
:root {
  /* STATE_A surfaces (3 close-together tints for gradients) */
  --surface-a:       /* primary light bg */;
  --surface-a-warm:  /* hero wash */;
  --surface-a-deep:  /* gradient partner */;
  --surface-accent:  /* card fill / warm secondary surface */;
  --neutral-mid:     /* muted mid-tone for borders at ~40% */;
  /* STATE_B surfaces */
  --ink:             /* primary dark: text on light AND night bg base */;
  --surface-b:       /* pivot-section background */;
  --surface-b-deep:  /* vignette edge */;
  --text-on-dark:    /* cream/off-white text over imagery & dark bg */;
  /* Theme colors */
  --theme-1:         /* signature particle color */;
  --theme-1-deep:    /* particle shadow tone */;
  --accent:          /* RATIONED accent (see rule) */;
  --glow:            /* STATE_B emissive accent (lantern/neon/moon) */;
}
```

**Hard rules:**
- Light sections: `--surface-a` bg + `--ink` text. Dark sections: `--surface-b` bg + `--text-on-dark`.
- `--accent` appears **only** in tiny doses: the logo mark, link-hover underlines, section-number ticks, one CTA. If accent covers more than ~1% of any viewport, it's wrong.
- Borders are always 1px: `--ink` at 12–15% opacity on light, `--text-on-dark` at 15% on dark. Never generic gray.
- Body text on light renders at 78% opacity of `--ink`, never pure.

### 3.2 Typography contract

Three faces, three jobs:
- **Display serif** (e.g. Cormorant Garamond, PP Editorial New, Fraunces) — weights 400/500 + *italic*. The voice of the site.
- **UI sans** (e.g. Space Grotesk, Geist) — 400/500 for nav, kickers, captions, buttons, timecodes.
- **Script accent** — per the theme slot (Noto Serif JP, blackletter, mono, etc.) for decorative strips.

Clamp-based scale (desktop reference — reuse these exact clamps):

```css
--display-xl: clamp(4rem, 11vw, 11.5rem);  /* hero + footer wordmark */
--display-lg: clamp(3rem, 7vw, 7rem);      /* section headings */
--display-md: clamp(2rem, 4vw, 3.5rem);    /* overlay lines on films */
--body:       clamp(1rem, 1.15vw, 1.185rem);
--caption:    0.8125rem;
--kicker:     0.6875rem;                    /* letter-spacing: 0.32em; uppercase */
```

Display type: `line-height: 0.95–1.05`, `letter-spacing: -0.015em`, and **mixed roman/italic within one headline** — italicize the emotional word(s): "Where Petals ***Drift*** Downstream". Body: `line-height: 1.7`, `max-width: 34em`.

**Kicker pattern (used everywhere):** small 6px accent/ink square or tick + 0.32em-tracked uppercase UI sans, numbered per chapter: `— 01 · THE PHILOSOPHY`.

### 3.3 Texture layer (all three, on every section)

1. **Animated film grain:** full-viewport fixed overlay — WebGL fragment shader or SVG `feTurbulence` with the seed re-randomized per frame — `opacity: 0.05`, `mix-blend-mode: overlay`. Animated noise, never a static PNG.
2. **Print-mat frames:** every image sits inside a 1px inset border (`--ink` 15%) offset 10px *outside* the image edge, like a woodblock/gallery mat.
3. **Paper vignette:** radial gradient darkening corners of light sections by ~3%; dark sections get a 6% `--surface-b-deep` edge vignette.

---

## 4. PRELOADER (always present)

- `--surface-a` background. Centered: the `ACCENT_MARK` glyph above the `WORDMARK` in display serif, tracking-in from `letter-spacing: 0.5em` → `0.02em` over 1.2s `power3.out`.
- Below: a 1px progress line growing 0→100% width tied to **real asset loading** (hero plate, film metadata, fonts), plus a percentage counter in UI sans.
- On complete: line flashes to `--accent`, then the whole loader wipes upward via `clip-path: inset(0 0 100% 0)` over 0.9s `power4.inOut`, revealing the hero **already mid-settle** so loader→hero reads as one continuous shot.
- Minimum display 1.6s even on cache-hot loads.

---

## 5. THE 7-SECTION SKELETON

The narrative always maps onto these seven archetypes, in order. Rename them per theme; never reorder or drop the pivot (§5.5).

### 5.1 HERO — WebGL plate + signature particles
- 100svh. The hero image is a **three.js textured plane** in a fixed canvas (cover UV math), *not* an `<img>`. Optional ambient loop: crossfade to a muted `VideoTexture` fading 0→1 over 2s after load.
- Type stack, centered slightly below vertical center: kicker → two-line `--display-xl` headline in `--text-on-dark` with one italic word and `text-shadow: 0 2px 40px` of `--ink` at 35% → thin 64px rule → name caption. Bottom center: `SCROLL` label + 40px vertical line with an infinitely looping dot (1.8s `power1.inOut`). One screen edge: vertical `SCRIPT_ACCENT` strip at 60% opacity.
- **Entrance:** headline lines in overflow-hidden masks rise from `y: 110%` with `rotate: 2deg → 0`, stagger 0.12s, 1.1s `power4.out`; plane settles `scale 1.12 → 1.0` over 2.4s.
- **Particle system:** `THREE.InstancedMesh`, ~380 instances desktop / ~120 mobile, texture hand-drawn on an offscreen canvas (never a loaded sprite). Per-instance size, phase, rotation speed, and z-depth (-2…2) for parallax. Motion = base drift velocity + `sin(time * 0.8 + phase)` sway + a **simplex curl-noise flow field** bending trajectories, + 2-axis tumbling. Pointer interaction: radial impulse (radius ~180px, quadratic falloff) scatters particles which then recover. Canvas z-index sits **over the plate, under the text**.
- **Ripple shader** on the plane: masked sine displacement on the thematically "liquid" region (`uv.x += sin(uv.y*40.0 + uTime*1.2) * 0.0015 * mask`) plus a decaying radial wave from pointer position (`uMouse`, `uWaveTime`).
- **Pinned exit** (`+=120%`, scrub): plane scales 1.0→1.18 and darkens via a `uDarken` uniform 0→0.25; headline exits upward at 1.4× scroll speed; the next section slides over from below **like a sheet of paper** — higher z-index, `border-radius: 32px 32px 0 0` on its top edge during overlap, flattening to 0 when fully covering.

### 5.2 MANIFESTO — editorial statement
- `--surface-a` bg, 16vh vertical padding. Numbered kicker, then one `--display-lg` serif statement across ~11 of 12 grid columns with mixed italics — the thesis of the whole narrative in one or two sentences.
- **Inline image tokens:** 2 small rounded-rect images (~140×90px, radius 60px) embedded *inside* the headline on the text baseline between words, scaling in from 0 width as their line reveals.
- Reveal: split into lines, masked line-rise, stagger 0.09s at 70% viewport, `toggleActions: "play none none reverse"` (no scrub here).
- Right-aligned 34em body paragraph + one text link with draw-on underline. Below: a row of 2–3 big serif statistics with small-caps labels, counter-animating up on view.

### 5.3 SCROLL FILM I — video scrubbed by scroll
- Full-bleed 100svh `<video preload="auto" muted playsinline>` with `object-fit: cover`, pinned `+=400%`.
- **The scrub must be lerped — this is the difference between award-level and janky:**

```js
let target = 0, current = 0;
ScrollTrigger.create({
  trigger: section, pin: true, scrub: true, end: '+=400%',
  onUpdate: (self) => { target = self.progress * video.duration; }
});
(function raf(){ current += (target - current) * 0.1;
  if (Math.abs(target - current) > 0.01) video.currentTime = current;
  requestAnimationFrame(raf); })();
```

- The source file must be keyframe-dense (re-encode with `-g 1` if needed); if seeking still stutters, fall back to a canvas-drawn extracted-frame pipeline.
- **2–3 text chapters** fade in/out sequentially over the film in non-overlapping progress windows (e.g. 0.05–0.3, 0.38–0.63, 0.7–0.95): centered kicker + one `--display-md` line in `--text-on-dark`, entering with masked rise + letter-spacing decay, exiting fading up 40px.
- Chrome: vertical chapter indicator (Ⅰ · Ⅱ · Ⅲ, active numeral in `--accent`) on one edge; bottom-left a 1px film progress bar with `00:00 / 00:12` timecode in tabular numerals; edge vignette.

### 5.4 HORIZONTAL GALLERY — pinned lateral track
- `--surface-a`. Static header during pin: numbered kicker, `--display-lg` heading, right-aligned `( scroll )` instruction.
- 3 oversized cards, track translating X `0 → -(trackWidth - viewport)`, `scrub: 1`, pinned `+=250%`. Card: `min(66vw, 900px)` × 68vh, gap 6vw, radius 4px, print-mat border.
- **Inner parallax:** the image inside each card is scaled 1.15 and translates X *opposite* the track (±7%).
- Card chrome: giant outlined number (`display serif, ~9rem, -webkit-text-stroke: 1px var(--ink), transparent fill`) overlapping the image's top-left, filling solid when the card crosses viewport center; title in `--display-md`; caption + arrow link.
- Bottom: 1px track-progress line + `01 — 03` counter with roll animation. Custom cursor becomes a 40px `DRAG/→` circle badge (`mix-blend-mode: difference`) over this section.

### 5.5 METAMORPHOSIS — the emotional pivot (never skip)
- Pinned 100svh, `+=200%`. Background scrubs `--surface-a` → `--surface-b` via GSAP interpolating the actual color; nav flips to its dark class; the **signature particle swaps character** (color → `--glow` tint, direction reverses, speed changes).
- Centered portrait frame (~42vw × 78vh) expands to full-bleed via `clip-path: inset(11vh 29vw)` → `inset(0)` while a WebGL **noise-threshold dissolve** crossfades the STATE_A plate into the STATE_B plate:

```glsl
float n = noise(vUv * 4.0);
float mask = smoothstep(uProgress - 0.08, uProgress + 0.08, n);
gl_FragColor = mix(texture2D(uTexB, vUv), texture2D(uTexA, vUv), mask);
```

  A plain crossfade is an automatic fail — the states must *dissolve into each other like ink in water*.
- Overlay copy near progress 0.1: kicker + one `--display-lg` line whose color transitions ink→cream in sync with the bg.
- 6–8 additive-blended radial-gradient glow sprites pulsing (`opacity 0.6→0.9`, ~3s sine, staggered) at the light sources of the STATE_B plate.

### 5.6 SCROLL FILM II — the dark reprise
- Same mechanics as §5.3 with the second film, pinned `+=350%`, on `--surface-b`. Two chapters instead of three.
- Ends on a **full-stop moment:** film settles on its final frame, darkens 30%, and a centered quote in the script accent + attribution fades in, held for the last 15% of the pin. This is the narrative's emotional landing.

### 5.7 FOOTER — dawn + monument
- Snap back to `--surface-a` with a quick 0.8s bg transition (the "dawn").
- Top: kicker + giant CTA line (`--display-lg`, one italic word) + a circular `--accent` button (~120px) with **magnetic hover** (translates toward cursor within 24px, springs back `elastic.out(1, 0.4)`).
- Middle: 3 link columns in UI sans 13px with draw-on underlines + a vertical script-accent strip.
- Bottom: the `WORDMARK` at `--display-xl`, **JS-fitted to nearly full viewport width**, sitting on the page baseline, rising with a masked reveal — and the signature particles *settle onto it* (y-velocity → 0, landing on an invisible floor at the cap line).
- Very bottom: 1px rule, © line left, a theme geo/route note right, 10px.

---

## 6. GLOBAL CHROME

**Navigation (fixed, persistent):** 88px tall, transparent at top, padding-inline 48px. Left: accent mark (22px) + wordmark (UI sans 500, 0.2em tracking, 14px). Right: 3–4 links (13px, 0.12em tracking) + one script-accent glyph + a pill-outline button (1px border; hover fills `--ink`, text `--surface-a`). Link hover: 1px `--accent` underline draws left→right (`scaleX`, 0.35s `power2.out`). Past 120px scroll: bg fades to `--surface-a` at 82% + `backdrop-filter: blur(12px)`, height compresses to 68px. Over dark sections a ScrollTrigger `onToggle` swaps a `.nav--dark` class (`--surface-b` at 82%, cream text).

**Progress rail:** fixed left edge, vertically centered — 1px × 160px line with a scroll-progress fill, a tiny dot per section, and the current index `01 / 07` in 10px UI sans rotated 90°.

**Custom cursor:** 8px ink dot + 32px trailing ring (lerp 0.15); ring expands to 56px over links, morphs to `→` over cards, `▶` over films. Disabled on touch.

---

## 7. GLOBAL MOTION GRAMMAR

Easing vocabulary — never deviate:

| Context | Ease |
|---|---|
| Reveals / entrances | `power4.out` |
| Pinned scrubs | linear, `scrub: 1`–`1.5` |
| Color shifts | none (pure scrub) |
| Micro-interactions | `power2.out` |
| Magnetic / springy | `elastic.out(1, 0.4)` |

- Every heading reveal = masked line rise (`y: 110% → 0`) with a 1–2° rotation settle.
- Every image reveal = `clip-path: inset(100% 0 0 0)` → `inset(0)`, 1.2s `power4.inOut`, inner image counter-scaling 1.25 → 1.
- Decorative parallax at 0.85×–1.2× via `data-speed` attributes processed by one shared ScrollTrigger.
- `prefers-reduced-motion`: kill all pins/scrubs, videos become posters, particles static, reveals become simple fades. Non-optional.

---

## 8. PERFORMANCE & RESPONSIVE BUDGET

- **One shared `WebGLRenderer`** (alpha on, antialias off, `devicePixelRatio` capped at 1.75). Scenes/particles added and removed per section visibility; pause rAF work for offscreen scenes via IntersectionObserver.
- Videos: `preload="metadata"` until their section is within 150% of the viewport, then flip to `auto`.
- Textures through `THREE.TextureLoader` with `SRGBColorSpace`; all plates `decoding="async"`.
- **Mobile (<768px):** particle count to ~⅓, horizontal gallery becomes a native swipe track (no pin), film pins shorten to `+=250%`, `--display-xl` clamps down, inline headline images hidden, custom cursor disabled. Use `100svh`/`min-h-[100dvh]`, never `100vh`.
- Target: 60fps on an M1 laptop, no long tasks > 120ms after load.

---

## 9. ACCEPTANCE CHECKLIST (verify before delivering)

1. Loader → hero entrance reads as one continuous shot.
2. Signature particles react to the pointer and **change character** (color/direction/speed) across the STATE_A→STATE_B pivot.
3. All scroll films scrub butter-smooth via lerped `currentTime` — zero stepping.
4. The metamorphosis uses a noise-threshold dissolve shader, not a plain crossfade.
5. Horizontal gallery has inner-parallax images and outlined numbers that fill at center.
6. Nav adapts light/dark automatically; the progress rail tracks all 7 sections.
7. Footer wordmark spans nearly the full viewport and particles settle on it.
8. Grain, mat borders, and vignettes present on every section.
9. `prefers-reduced-motion` produces a fully readable static-friendly page.
10. 60fps on an M1 laptop; mobile fallbacks all active under 768px.

---

## 10. ANTI-PATTERNS (instant fail)

- Plain `<img>` hero where a WebGL plane was specified. CSS-only "particles" (floating divs).
- `video.currentTime = progress * duration` set directly in `onUpdate` without the lerp loop.
- Plain opacity crossfade at the pivot. Linear/ease-in-out on reveals. Static grain PNGs.
- Accent color used as a background or large surface. Pure-black `#000` or pure-white `#fff` anywhere.
- Bootstrap-style symmetric grids, edge-glued navbars, Inter/Roboto/Arial, default focus-ring blue.
- Scroll hijacking that breaks native scroll restoration, or pins that trap keyboard users.
