/**
 * Generates 14 abstract monochrome SVG artworks used as case thumbnails.
 * Deterministic per index — run `node scripts/generate-art.mjs` to regenerate.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "cases");
mkdirSync(out, { recursive: true });

const W = 1200;
const H = 900;

function rng(seed) {
  let s = seed * 2654435761 % 2 ** 32;
  return () => {
    s = (s * 1664525 + 1013904223) % 2 ** 32;
    return s / 2 ** 32;
  };
}

const inks = ["#131210", "#2a2824", "#3d3a34", "#55524b"];
const papers = ["#f1eee7", "#e9e5db", "#dfdacd", "#d3cdbd"];

const defs = (i) => `
  <defs>
    <linearGradient id="g${i}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${papers[i % 4]}"/>
      <stop offset="1" stop-color="${papers[(i + 2) % 4]}"/>
    </linearGradient>
    <filter id="n${i}">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="t"/>
      <feColorMatrix in="t" type="matrix" values="0 0 0 0 0.07 0 0 0 0 0.07 0 0 0 0 0.06 0 0 0 0.55 0"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>`;

const grainRect = (i, opacity = 0.16) =>
  `<rect width="${W}" height="${H}" filter="url(#n${i})" opacity="${opacity}"/>`;

/* --- composition archetypes ------------------------------------------ */

function arcs(i, r) {
  const ink = inks[i % 4];
  let paths = "";
  const cx = W * (0.3 + r() * 0.4);
  const cy = H * (0.55 + r() * 0.3);
  for (let k = 0; k < 9; k++) {
    const rad = 80 + k * (60 + r() * 30);
    paths += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(0)}"
      fill="none" stroke="${ink}" stroke-width="${(2 + r() * 3).toFixed(1)}"
      stroke-dasharray="${k % 3 === 0 ? "none" : `${(40 + r() * 200).toFixed(0)} ${(30 + r() * 90).toFixed(0)}`}"/>`;
  }
  return paths + `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="26" fill="${ink}"/>`;
}

function bars(i, r) {
  const ink = inks[(i + 1) % 4];
  let rects = "";
  const n = 14;
  for (let k = 0; k < n; k++) {
    const h = H * (0.15 + r() * 0.75);
    const w = W / n;
    rects += `<rect x="${(k * w).toFixed(0)}" y="${(H - h).toFixed(0)}" width="${(w * 0.62).toFixed(0)}" height="${h.toFixed(0)}" fill="${k % 4 === 0 ? ink : "none"}" stroke="${ink}" stroke-width="2.5"/>`;
  }
  return rects;
}

function orb(i, r) {
  const ink = inks[i % 4];
  const cx = W * (0.35 + r() * 0.3);
  const cy = H * (0.35 + r() * 0.25);
  const rad = H * (0.28 + r() * 0.12);
  let lines = "";
  for (let k = 0; k < 22; k++) {
    const y = cy - rad + (k / 21) * rad * 2;
    const half = Math.sqrt(Math.max(rad * rad - (y - cy) ** 2, 0));
    lines += `<line x1="${(cx - half).toFixed(0)}" y1="${y.toFixed(0)}" x2="${(cx + half).toFixed(0)}" y2="${y.toFixed(0)}" stroke="${ink}" stroke-width="${(1.5 + r() * 2).toFixed(1)}"/>`;
  }
  return `${lines}<line x1="0" y1="${(cy + rad + 60).toFixed(0)}" x2="${W}" y2="${(cy + rad + 60).toFixed(0)}" stroke="${ink}" stroke-width="3"/>`;
}

function waves(i, r) {
  const ink = inks[(i + 2) % 4];
  let paths = "";
  for (let k = 0; k < 12; k++) {
    const y = H * 0.15 + k * (H * 0.065);
    const amp = 18 + r() * 55;
    const freq = 1.5 + r() * 2;
    let d = `M 0 ${y.toFixed(0)}`;
    for (let x = 0; x <= W; x += 24) {
      d += ` L ${x} ${(y + Math.sin((x / W) * Math.PI * 2 * freq + k) * amp).toFixed(1)}`;
    }
    paths += `<path d="${d}" fill="none" stroke="${ink}" stroke-width="${(1.4 + r() * 2.2).toFixed(1)}"/>`;
  }
  return paths;
}

function grid(i, r) {
  const ink = inks[i % 4];
  let cells = "";
  const cols = 8;
  const rows = 6;
  for (let cy = 0; cy < rows; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      const x = (cx * W) / cols;
      const y = (cy * H) / rows;
      const v = r();
      if (v < 0.24) {
        cells += `<circle cx="${(x + W / cols / 2).toFixed(0)}" cy="${(y + H / rows / 2).toFixed(0)}" r="${(W / cols) * 0.32}" fill="${ink}"/>`;
      } else if (v < 0.42) {
        cells += `<rect x="${(x + 12).toFixed(0)}" y="${(y + 12).toFixed(0)}" width="${(W / cols - 24).toFixed(0)}" height="${(H / rows - 24).toFixed(0)}" fill="none" stroke="${ink}" stroke-width="2.5"/>`;
      } else if (v < 0.52) {
        cells += `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x + W / cols).toFixed(0)}" y2="${(y + H / rows).toFixed(0)}" stroke="${ink}" stroke-width="2.5"/>`;
      }
    }
  }
  return cells;
}

function blob(i, r) {
  const ink = inks[(i + 3) % 4];
  const cx = W * 0.5;
  const cy = H * 0.5;
  let shapes = "";
  for (let ring = 3; ring >= 0; ring--) {
    const base = 90 + ring * 95;
    let d = "";
    const pts = 10;
    for (let k = 0; k <= pts; k++) {
      const a = (k / pts) * Math.PI * 2;
      const rad = base + Math.sin(a * 3 + i) * (18 + r() * 42);
      const x = cx + Math.cos(a) * rad * 1.25;
      const y = cy + Math.sin(a) * rad;
      d += k === 0 ? `M ${x.toFixed(0)} ${y.toFixed(0)}` : ` L ${x.toFixed(0)} ${y.toFixed(0)}`;
    }
    shapes += `<path d="${d} Z" fill="${ring === 0 ? ink : "none"}" stroke="${ink}" stroke-width="2.5"/>`;
  }
  return shapes;
}

function diagonal(i, r) {
  const ink = inks[i % 4];
  let lines = "";
  for (let k = -8; k < 26; k++) {
    const x = k * 70;
    lines += `<line x1="${x}" y1="${H}" x2="${x + H * 0.7}" y2="0" stroke="${ink}" stroke-width="${k % 5 === 0 ? 9 : 2}"/>`;
  }
  lines += `<circle cx="${(W * (0.55 + r() * 0.25)).toFixed(0)}" cy="${(H * (0.25 + r() * 0.3)).toFixed(0)}" r="${(70 + r() * 60).toFixed(0)}" fill="${papers[(i + 1) % 4]}" stroke="${ink}" stroke-width="3"/>`;
  return lines;
}

const archetypes = [arcs, bars, orb, waves, grid, blob, diagonal];

for (let i = 1; i <= 14; i++) {
  const r = rng(i * 7 + 3);
  const art = archetypes[(i - 1) % archetypes.length](i, r);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
${defs(i)}
  <rect width="${W}" height="${H}" fill="url(#g${i})"/>
  ${art}
  ${grainRect(i)}
</svg>`;
  writeFileSync(join(out, `${String(i).padStart(2, "0")}.svg`), svg);
  console.log(`cases/${String(i).padStart(2, "0")}.svg`);
}
