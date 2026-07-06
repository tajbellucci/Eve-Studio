/**
 * Generates brand-matched abstract SVG artwork for the real case studies
 * (see data/cases.ts). Each piece echoes the real product's palette and a
 * simple geometric idea from its actual UI — never a copied screenshot —
 * layered with the same bokeh/vignette/shadow/grain treatment used for the
 * rest of the site's generated art.
 * Run: node scripts/generate-case-art.mjs
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

function shell(id, r, { bgFrom, bgTo, bgMid, bokehColors, art, shadowColor }) {
  const blurStd = (46 + r() * 38).toFixed(0);
  const bokehCount = 5 + Math.floor(r() * 3);
  let bokeh = "";
  for (let k = 0; k < bokehCount; k++) {
    const cx = W * (0.08 + r() * 0.84);
    const cy = H * (0.08 + r() * 0.84);
    const rad = 90 + r() * 320;
    const fill = bokehColors[k % bokehColors.length];
    const opacity = 0.1 + r() * 0.2;
    bokeh += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(0)}" fill="${fill}" opacity="${opacity.toFixed(2)}" filter="url(#bokeh-${id})"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bgFrom}"/>
      <stop offset="0.55" stop-color="${bgMid}"/>
      <stop offset="1" stop-color="${bgTo}"/>
    </linearGradient>
    <radialGradient id="vig-${id}" cx="50%" cy="46%" r="72%">
      <stop offset="0%" stop-color="#131210" stop-opacity="0"/>
      <stop offset="76%" stop-color="#131210" stop-opacity="0"/>
      <stop offset="100%" stop-color="#131210" stop-opacity="0.2"/>
    </radialGradient>
    <filter id="bokeh-${id}" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="${blurStd}"/>
    </filter>
    <filter id="shadow-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="${shadowColor}" flood-opacity="0.28"/>
    </filter>
    <filter id="grain-${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" result="t"/>
      <feColorMatrix in="t" type="matrix" values="0 0 0 0 0.07 0 0 0 0 0.07 0 0 0 0 0.06 0 0 0 0.6 0"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  ${bokeh}
  <g filter="url(#shadow-${id})">
    ${art}
  </g>
  <rect width="${W}" height="${H}" fill="url(#vig-${id})"/>
  <rect width="${W}" height="${H}" filter="url(#grain-${id})" opacity="0.06"/>
</svg>`;
}

/* --- per-case marks -------------------------------------------------- */

// Dil Ki Baat — concentric search rings (echoes the platform's own motif)
function dilKiBaat(r) {
  const cx = W * 0.32;
  const cy = H * 0.5;
  let rings = "";
  for (let k = 0; k < 8; k++) {
    const rad = 60 + k * 58;
    rings += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="#3c3fb0" stroke-width="${k === 0 ? 5 : 2.4}" opacity="${1 - k * 0.09}"/>`;
  }
  rings += `<circle cx="${cx}" cy="${cy}" r="24" fill="#18c7b3"/>`;
  // therapist/patient dots along a search line
  for (let k = 0; k < 5; k++) {
    const x = W * 0.62 + k * 70;
    rings += `<circle cx="${x.toFixed(0)}" cy="${(H * 0.42 + Math.sin(k) * 40).toFixed(0)}" r="${14 + (k % 2) * 6}" fill="${k % 2 === 0 ? "#3c3fb0" : "#18c7b3"}" opacity="0.85"/>`;
  }
  return rings;
}

// PACT — an institutional seal: rings, solid center, a few document lines
function pact(r) {
  const cx = W * 0.5;
  const cy = H * 0.42;
  let mark = "";
  for (let k = 0; k < 5; k++) {
    mark += `<circle cx="${cx}" cy="${cy}" r="${70 + k * 34}" fill="none" stroke="#5b6b3f" stroke-width="3"/>`;
  }
  mark += `<rect x="${cx - 34}" y="${cy - 34}" width="68" height="68" fill="#5b6b3f"/>`;
  for (let k = 0; k < 6; k++) {
    const y = H * 0.72 + k * 22;
    mark += `<line x1="${W * 0.18}" y1="${y.toFixed(0)}" x2="${W * (0.18 + 0.5 - k * 0.05)}" y2="${y.toFixed(0)}" stroke="#5b6b3f" stroke-width="4" opacity="${0.8 - k * 0.1}"/>`;
  }
  return mark;
}

// Aiza AI — a cluster of soft chat bubbles, one holding a small "spark" face
function aizaAi(r) {
  const bubbles = [
    [W * 0.36, H * 0.4, 150, "#d9714a"],
    [W * 0.6, H * 0.3, 110, "#1f4d4a"],
    [W * 0.66, H * 0.58, 95, "#e6a184"],
    [W * 0.3, H * 0.64, 80, "#1f4d4a"],
  ];
  let shapes = "";
  for (const [x, y, rad, fill] of bubbles) {
    shapes += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad}" fill="${fill}" opacity="0.94"/>`;
  }
  const [fx, fy] = [bubbles[0][0], bubbles[0][1]];
  shapes += `<circle cx="${(fx - 30).toFixed(0)}" cy="${(fy - 10).toFixed(0)}" r="7" fill="#fbead9"/>`;
  shapes += `<circle cx="${(fx + 30).toFixed(0)}" cy="${(fy - 10).toFixed(0)}" r="7" fill="#fbead9"/>`;
  shapes += `<path d="M ${fx - 26} ${fy + 22} Q ${fx} ${fy + 44} ${fx + 26} ${fy + 22}" stroke="#fbead9" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  return shapes;
}

// 123CBT — a module grid echoing the dashboard's card layout
function cbt123(r) {
  const cols = 3;
  const rows = 3;
  const pad = 90;
  const gap = 22;
  const cw = (W - pad * 2 - gap * (cols - 1)) / cols;
  const ch = (H - pad * 2 - gap * (rows - 1)) / rows;
  const palette = ["#d9714a", "#7d8ce0", "#e0b25a", "#5fb0a8", "#c98fd0", "#e08a8a", "#6fb1e0", "#e0c463", "#8fd0b0"];
  let cells = "";
  let idx = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = pad + col * (cw + gap);
      const y = pad + row * (ch + gap);
      const fillIdx = Math.floor(r() * palette.length);
      cells += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${cw.toFixed(0)}" height="${(ch * 0.62).toFixed(0)}" rx="10" fill="${palette[fillIdx]}" opacity="0.92"/>`;
      cells += `<rect x="${x.toFixed(0)}" y="${(y + ch * 0.72).toFixed(0)}" width="${(cw * (0.4 + r() * 0.5)).toFixed(0)}" height="8" rx="4" fill="#dfe3ec"/>`;
      idx++;
    }
  }
  return cells;
}

// Ministry of Dubai Government — storefront product cards + a tag mark
function dubaiGov(r) {
  const cards = 4;
  let shapes = "";
  for (let k = 0; k < cards; k++) {
    const x = W * 0.14 + k * 190;
    const y = H * (0.28 + (k % 2) * 0.12);
    const w = 150;
    const h = 210;
    shapes += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w}" height="${h}" rx="8" fill="#fdf3fa" stroke="#d81b8a" stroke-width="2.5"/>`;
    shapes += `<rect x="${(x + 16).toFixed(0)}" y="${(y + 16).toFixed(0)}" width="${w - 32}" height="${h * 0.55}" rx="4" fill="#d81b8a" opacity="${0.55 + r() * 0.3}"/>`;
    shapes += `<rect x="${(x + 16).toFixed(0)}" y="${(y + h * 0.68).toFixed(0)}" width="${w - 60}" height="8" rx="4" fill="#d81b8a" opacity="0.6"/>`;
  }
  // small tag/badge motif
  const tx = W * 0.82;
  const ty = H * 0.24;
  shapes += `<path d="M ${tx} ${ty} l 70 0 l 40 40 l -40 40 l -70 0 Z" fill="#d81b8a"/>`;
  shapes += `<circle cx="${(tx + 14).toFixed(0)}" cy="${(ty + 14).toFixed(0)}" r="7" fill="#fdf3fa"/>`;
  return shapes;
}

// Abraj Stay — a flight path arc across the canvas + a luggage tag
function abrajStay(r) {
  const y0 = H * 0.72;
  const y1 = H * 0.2;
  let path = `M ${W * 0.08} ${y0} Q ${W * 0.5} ${y1 - 60} ${W * 0.94} ${y0 - 40}`;
  let shapes = `<path d="${path}" fill="none" stroke="#c23b2e" stroke-width="3" stroke-dasharray="14 14"/>`;
  // little plane triangle at the path's midpoint-ish
  const px = W * 0.52;
  const py = y1 - 30;
  shapes += `<g transform="translate(${px.toFixed(0)} ${py.toFixed(0)}) rotate(-18)">
    <path d="M -22 0 L 18 -8 L 8 0 L 18 8 Z" fill="#c23b2e"/>
  </g>`;
  // luggage tag
  const tx = W * 0.24;
  const ty = H * 0.44;
  shapes += `<path d="M ${tx} ${ty} l 130 0 l 0 170 l -65 40 l -65 -40 Z" fill="#fdf0ee" stroke="#c23b2e" stroke-width="3"/>`;
  shapes += `<circle cx="${(tx + 65).toFixed(0)}" cy="${(ty + 34).toFixed(0)}" r="10" fill="none" stroke="#c23b2e" stroke-width="3"/>`;
  for (let k = 0; k < 3; k++) {
    shapes += `<line x1="${(tx + 25).toFixed(0)}" y1="${(ty + 74 + k * 22).toFixed(0)}" x2="${(tx + 105).toFixed(0)}" y2="${(ty + 74 + k * 22).toFixed(0)}" stroke="#c23b2e" stroke-width="3" opacity="${0.8 - k * 0.15}"/>`;
  }
  return shapes;
}

// Tamayouz Excellence Module — an excellence seal with a ribbon
function tamayouz(r) {
  const cx = W * 0.5;
  const cy = H * 0.42;
  let shapes = "";
  for (let k = 0; k < 4; k++) {
    shapes += `<circle cx="${cx}" cy="${cy}" r="${80 + k * 30}" fill="none" stroke="#3b5fe0" stroke-width="3"/>`;
  }
  // five-point star
  const starPts = [];
  for (let k = 0; k < 5; k++) {
    const a = -Math.PI / 2 + (k * 4 * Math.PI) / 5;
    starPts.push([cx + Math.cos(a) * 46, cy + Math.sin(a) * 46]);
  }
  shapes += `<path d="M ${starPts.map(([x, y]) => `${x.toFixed(0)} ${y.toFixed(0)}`).join(" L ")} Z" fill="#3b5fe0"/>`;
  // ribbon tails
  shapes += `<path d="M ${cx - 26} ${cy + 90} L ${cx - 46} ${cy + 200} L ${cx - 8} ${cy + 170} Z" fill="#3b5fe0"/>`;
  shapes += `<path d="M ${cx + 26} ${cy + 90} L ${cx + 46} ${cy + 200} L ${cx + 8} ${cy + 170} Z" fill="#3b5fe0"/>`;
  return shapes;
}

// Bagtote — a suitcase silhouette + connected blockchain-style node network
function bagtote(r) {
  let shapes = "";
  const bx = W * 0.28;
  const by = H * 0.32;
  const bw = 220;
  const bh = 280;
  shapes += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="18" fill="#eef2fd" stroke="#2247c9" stroke-width="4"/>`;
  shapes += `<rect x="${(bx + bw * 0.3).toFixed(0)}" y="${(by - 26).toFixed(0)}" width="${(bw * 0.4).toFixed(0)}" height="30" rx="8" fill="none" stroke="#2247c9" stroke-width="4"/>`;
  shapes += `<line x1="${bx}" y1="${(by + bh * 0.42).toFixed(0)}" x2="${(bx + bw).toFixed(0)}" y2="${(by + bh * 0.42).toFixed(0)}" stroke="#2247c9" stroke-width="3" opacity="0.6"/>`;
  // node network to the right suggesting blockchain
  const nodes = [];
  for (let k = 0; k < 6; k++) {
    nodes.push([W * (0.66 + r() * 0.26), H * (0.2 + r() * 0.55)]);
  }
  for (let k = 0; k < nodes.length; k++) {
    const next = nodes[(k + 1) % nodes.length];
    shapes += `<line x1="${nodes[k][0].toFixed(0)}" y1="${nodes[k][1].toFixed(0)}" x2="${next[0].toFixed(0)}" y2="${next[1].toFixed(0)}" stroke="#2247c9" stroke-width="2" opacity="0.5"/>`;
  }
  nodes.forEach(([x, y], k) => {
    shapes += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${k === 0 ? 14 : 9}" fill="${k === 0 ? "#c23b2e" : "#2247c9"}"/>`;
  });
  return shapes;
}

const configs = [
  {
    file: "dil-ki-baat",
    seed: 101,
    bgFrom: "#f1eee7",
    bgMid: "#e7e7f4",
    bgTo: "#dfe0f0",
    bokehColors: ["#3c3fb0", "#18c7b3", "#f1eee7"],
    shadowColor: "#22246b",
    art: dilKiBaat,
  },
  {
    file: "pact",
    seed: 102,
    bgFrom: "#f1eee7",
    bgMid: "#e9e8d8",
    bgTo: "#dcdcc4",
    bokehColors: ["#5b6b3f", "#f1eee7", "#8a915f"],
    shadowColor: "#3a4326",
    art: pact,
  },
  {
    file: "aiza-ai",
    seed: 103,
    bgFrom: "#faf3ec",
    bgMid: "#f6e3d6",
    bgTo: "#eccdb8",
    bokehColors: ["#d9714a", "#1f4d4a", "#f6e3d6"],
    shadowColor: "#7a3115",
    art: aizaAi,
  },
  {
    file: "123cbt",
    seed: 104,
    bgFrom: "#eef0f6",
    bgMid: "#dde2ee",
    bgTo: "#c9d0e2",
    bokehColors: ["#1c2c4d", "#7d8ce0", "#e0b25a"],
    shadowColor: "#0e1830",
    art: cbt123,
  },
  {
    file: "ministry-of-dubai-government",
    seed: 105,
    bgFrom: "#fdf3fa",
    bgMid: "#fbe1ef",
    bgTo: "#f6c7e2",
    bokehColors: ["#d81b8a", "#fdf3fa", "#e878b8"],
    shadowColor: "#7a0e4c",
    art: dubaiGov,
  },
  {
    file: "abraj-stay",
    seed: 106,
    bgFrom: "#f8ece9",
    bgMid: "#eccbc3",
    bgTo: "#dba299",
    bokehColors: ["#c23b2e", "#f8ece9", "#e07a63"],
    shadowColor: "#6b1c12",
    art: abrajStay,
  },
  {
    file: "tamayouz-excellence-module",
    seed: 107,
    bgFrom: "#eef1fc",
    bgMid: "#dbe3f8",
    bgTo: "#c3d0f2",
    bokehColors: ["#3b5fe0", "#eef1fc", "#7f96ec"],
    shadowColor: "#16256e",
    art: tamayouz,
  },
  {
    file: "bagtote",
    seed: 108,
    bgFrom: "#eef1fb",
    bgMid: "#dbe2f6",
    bgTo: "#c2ceee",
    bokehColors: ["#2247c9", "#eef1fb", "#c23b2e"],
    shadowColor: "#0f1d54",
    art: bagtote,
  },
];

for (const cfg of configs) {
  const r = rng(cfg.seed);
  const svg = shell(cfg.file, r, {
    bgFrom: cfg.bgFrom,
    bgMid: cfg.bgMid,
    bgTo: cfg.bgTo,
    bokehColors: cfg.bokehColors,
    shadowColor: cfg.shadowColor,
    art: cfg.art(r),
  });
  writeFileSync(join(out, `${cfg.file}.svg`), svg);
  console.log(`cases/${cfg.file}.svg`);
}
