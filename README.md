# Ava Studio®

An Awwwards-style portfolio site for **Ava Studio**, a fictional full-service
creative studio. Editorial, kinetic, monochrome — warm ivory paper, deep ink
typography, and premium motion throughout.

Original design inspired by the visual language of experimental creative-agency
sites. No third-party brand assets are used: all imagery is generated locally
as abstract SVG artwork, and both fonts are self-hosted open-source variable
fonts.

## Stack

- **Next.js 15** (App Router) + **React 19** + TypeScript
- **Tailwind CSS v4**
- **GSAP 3** (ScrollTrigger) for all animation
- **Lenis** for smooth scrolling
- **Fraunces Variable** (high-contrast editorial serif) + **Archivo Variable**
  (grotesk, with a width axis used for condensed labels), via Fontsource

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

| Component | Role |
| --- | --- |
| `Preloader` | Full-screen intro — marquee word rows + 0→100% counter, slide-up exit |
| `Header` | Fixed nav in `mix-blend-difference`, magnetic links |
| `Hero` | Oversized split studio name, scattered sticker labels, rotating "play showreel" button |
| `AboutServices` | "Just about" statement + flowing services wall in three typographic voices |
| `SelectedCases` / `CaseCard` | 14 alternating case rows — clip reveals, scroll parallax, cursor-follow images |
| `Awards` | Broken-word typographic composition + count-up stats grid |
| `Footer` | Interactive poster — CTA, marquee, sun-face graphic, full-bleed closing wordmark |
| `CustomCursor` | Circular cursor with `view` / `play` / `link` states (shows on real mouse input, hides on touch) |
| `MarqueeText` | Reusable infinite horizontal loop |
| `Decor` | Starburst, sun face, squiggle, circular text and other hand-drawn marks |

Case thumbnails live in `public/cases/` and are produced by
`node scripts/generate-art.mjs` (deterministic abstract compositions — arcs,
bars, waves, grids, blobs — in the site's ink/paper palette).

Reduced-motion preferences are respected for ambient animations, cursor
effects are disabled on touch devices, and all type scales fluidly from
mobile to widescreen.
