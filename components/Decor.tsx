import type { CSSProperties } from "react";

/** Small hand-drawn-feel decorative graphics used across the site. */

export function Starburst({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <g fill="currentColor">
        {Array.from({ length: 16 }).map((_, i) => (
          <path
            key={i}
            d="M50 50 L47 6 Q50 0 53 6 Z"
            transform={`rotate(${i * 22.5} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="7" />
      </g>
    </svg>
  );
}

export function SunFace({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <circle cx="60" cy="60" r="30" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="60"
            y1="14"
            x2="60"
            y2="24"
            transform={`rotate(${i * 30} 60 60)`}
          />
        ))}
        {/* face */}
        <circle cx="50" cy="55" r="1.5" fill="currentColor" />
        <circle cx="70" cy="55" r="1.5" fill="currentColor" />
        <path d="M50 68 Q60 76 70 68" />
      </g>
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 40" className={className} aria-hidden>
      <path
        d="M4 24 Q 20 4, 36 22 T 68 22 T 100 22 T 132 22 T 156 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HandPoint({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 30 H58" />
        <path d="M58 30 c 0 -8 10 -10 12 -3 c 3 -6 11 -4 11 2 c 5 -3 10 0 9 6 c 4 0 6 5 3 9 c -4 6 -14 10 -22 8 c -7 -2 -12 -6 -13 -12 z" />
        <path d="M70 27 v 8 M81 29 v 8 M90 35 v 6" />
      </g>
    </svg>
  );
}

/** Text on a circle, optionally spinning (wrap with .spin-slow / .spin-slower). */
export function CircularText({
  text,
  className = "",
  fontSize = 11,
  id,
}: {
  text: string;
  className?: string;
  fontSize?: number;
  id: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <path
          id={id}
          d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
        />
      </defs>
      <text
        fill="currentColor"
        fontSize={fontSize}
        letterSpacing="2.5"
        style={{ textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 550 }}
      >
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </svg>
  );
}

export function Asterisk({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden>
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <line x1="20" y1="4" x2="20" y2="36" />
        <line x1="6" y1="12" x2="34" y2="28" />
        <line x1="34" y1="12" x2="6" y2="28" />
      </g>
    </svg>
  );
}
