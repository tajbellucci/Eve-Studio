import type { CSSProperties } from "react";
import type { CaseItem, CaseLayout } from "@/data/cases";

/**
 * Dynamic, theme-matched case artwork.
 *
 * Instead of static screenshots, each case renders a stylized wireframe
 * recreation of the *real* product's interface — driven entirely by
 * `item.layout` and `item.accent`. Everything stays in the site's ivory/ink
 * editorial palette, with the brand accent used only for the load-bearing UI
 * (buttons, active states, "image" fills, chart lines). Adding a case is just
 * data: pick a layout, pick an accent.
 */

const IVORY = "#fbf9f4";
const ink = (o: number) => `rgba(19,18,16,${o})`;

/** deep partner/second tone a few products lean on, keyed by slug */
const SECONDARY: Record<string, string> = {
  "dil-ki-baat": "#18c7b3",
  "aiza-ai": "#1f6f68",
  bagtote: "#c23b2e",
};

export default function CaseArtwork({
  item,
  className,
  style,
}: {
  item: CaseItem;
  className?: string;
  style?: CSSProperties;
}) {
  const uid = item.slug;
  const a = item.accent;
  const as = item.accentSoft;
  const t = SECONDARY[item.slug] ?? a;

  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`${item.title.join(" ")} — interface preview`}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    >
      <defs>
        <linearGradient id={`gr-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f1ea" />
          <stop offset="1" stopColor="#e6e1d4" />
        </linearGradient>
        <radialGradient id={`bl-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={a} stopOpacity="0.22" />
          <stop offset="1" stopColor={a} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`vg-${uid}`} cx="50%" cy="44%" r="74%">
          <stop offset="0%" stopColor="#131210" stopOpacity="0" />
          <stop offset="76%" stopColor="#131210" stopOpacity="0" />
          <stop offset="100%" stopColor="#131210" stopOpacity="0.18" />
        </radialGradient>
        <filter id={`sh-${uid}`} x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="20" stdDeviation="26" floodColor="#131210" floodOpacity="0.16" />
        </filter>
      </defs>

      <rect width="1200" height="900" fill={`url(#gr-${uid})`} />
      <circle cx="980" cy="170" r="380" fill={`url(#bl-${uid})`} />
      <circle cx="200" cy="790" r="320" fill={`url(#bl-${uid})`} />

      <g filter={`url(#sh-${uid})`}>{renderLayout(item.layout, { a, as, t })}</g>

      <rect width="1200" height="900" fill={`url(#vg-${uid})`} />
    </svg>
  );
}

type Ctx = { a: string; as: string; t: string };

function renderLayout(layout: CaseLayout, c: Ctx) {
  switch (layout) {
    case "marketplace-search":
      return <MarketplaceSearch {...c} />;
    case "association-hero":
      return <AssociationHero {...c} />;
    case "companion-app":
      return <CompanionApp {...c} />;
    case "module-dashboard":
      return <ModuleDashboard {...c} />;
    case "storefront-devices":
      return <StorefrontDevices {...c} />;
    case "travel-booking":
      return <TravelBooking {...c} />;
    case "portal-dashboard":
      return <PortalDashboard {...c} />;
    case "logistics-app":
      return <LogisticsApp {...c} />;
  }
}

/* ---------- shared primitives ---------------------------------------- */

/** stacked rounded "text" bars */
function Stack({
  x,
  y,
  gap = 15,
  rows,
}: {
  x: number;
  y: number;
  gap?: number;
  rows: { w: number; h?: number; fill?: string; r?: number }[];
}) {
  let cy = y;
  return (
    <>
      {rows.map((row, i) => {
        const h = row.h ?? 9;
        const el = (
          <rect
            key={i}
            x={x}
            y={cy}
            width={row.w}
            height={h}
            rx={row.r ?? h / 2}
            fill={row.fill ?? ink(0.2)}
          />
        );
        cy += h + gap;
        return el;
      })}
    </>
  );
}

function BrowserChrome({ x, y, w, a }: { x: number; y: number; w: number; a: string }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={42} rx={16} fill="#f1ede4" />
      <rect x={x} y={y + 26} width={w} height={16} fill="#f1ede4" />
      <line x1={x} y1={y + 42} x2={x + w} y2={y + 42} stroke={ink(0.1)} />
      <circle cx={x + 24} cy={y + 21} r={5} fill={a} />
      <circle cx={x + 42} cy={y + 21} r={5} fill={ink(0.16)} />
      <circle cx={x + 60} cy={y + 21} r={5} fill={ink(0.16)} />
      <rect x={x + 92} y={y + 13} width={w - 170} height={16} rx={8} fill={ink(0.05)} />
    </>
  );
}

function Window({
  x,
  y,
  w,
  h,
  a,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  a: string;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={16} fill={IVORY} stroke={ink(0.13)} strokeWidth={2} />
      <BrowserChrome x={x} y={y} w={w} a={a} />
      {children}
    </g>
  );
}

function Phone({
  x,
  y,
  w,
  h,
  rot = 0,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rot?: number;
  children?: React.ReactNode;
}) {
  return (
    <g transform={rot ? `rotate(${rot} ${x + w / 2} ${y + h / 2})` : undefined}>
      <rect x={x} y={y} width={w} height={h} rx={34} fill={IVORY} stroke={ink(0.16)} strokeWidth={2} />
      <rect x={x + w / 2 - 26} y={y + 15} width={52} height={8} rx={4} fill={ink(0.14)} />
      {children}
    </g>
  );
}

/* ---------- 01 · Dil Ki Baat — therapist marketplace ----------------- */

function MarketplaceSearch({ a, as, t }: Ctx) {
  return (
    <Window x={110} y={158} w={980} h={588} a={a}>
      {/* nav */}
      <circle cx={162} cy={228} r={9} fill={a} />
      <Stack x={182} y={220} gap={5} rows={[{ w: 74, h: 9, fill: ink(0.5) }, { w: 50, h: 6, fill: ink(0.25) }]} />
      <rect x={556} y={224} width={42} height={8} rx={4} fill={ink(0.3)} />
      <rect x={618} y={224} width={52} height={8} rx={4} fill={ink(0.3)} />
      <rect x={690} y={224} width={42} height={8} rx={4} fill={ink(0.3)} />
      <rect x={952} y={212} width={108} height={32} rx={16} fill={a} />
      <rect x={974} y={224} width={64} height={8} rx={4} fill={IVORY} opacity={0.92} />

      {/* headline + search */}
      <Stack x={150} y={300} gap={12} rows={[{ w: 250, h: 26, fill: ink(0.85), r: 6 }, { w: 344, h: 26, fill: ink(0.85), r: 6 }]} />
      <rect x={150} y={388} width={300} height={11} rx={5} fill={ink(0.26)} />

      <rect x={150} y={420} width={430} height={52} rx={26} fill="#ffffff" stroke={ink(0.16)} strokeWidth={2} />
      <rect x={178} y={440} width={196} height={12} rx={6} fill={ink(0.22)} />
      <rect x={470} y={430} width={98} height={32} rx={16} fill={a} />
      <rect x={488} y={442} width={62} height={8} rx={4} fill={IVORY} />

      {/* filter chips */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={150 + i * 116} y={496} width={104} height={32} rx={16} fill="none" stroke={ink(0.22)} strokeWidth={1.5} />
          <rect x={168 + i * 116} y={509} width={58} height={7} rx={3.5} fill={ink(0.28)} />
        </g>
      ))}

      {/* therapist avatars */}
      <circle cx={172} cy={576} r={22} fill={t} stroke={IVORY} strokeWidth={3} />
      <circle cx={206} cy={576} r={22} fill={a} stroke={IVORY} strokeWidth={3} />
      <circle cx={240} cy={576} r={22} fill={ink(0.6)} stroke={IVORY} strokeWidth={3} />
      <rect x={278} y={568} width={220} height={13} rx={6} fill={ink(0.24)} />

      {/* phone with illustrated hero */}
      <Phone x={700} y={286} w={250} h={410}>
        <rect x={716} y={322} width={218} height={280} rx={16} fill={as} />
        <circle cx={825} cy={430} r={30} fill={a} />
        <path d="M762 590 q63 -70 126 0 Z" fill={a} opacity={0.9} />
        <circle cx={905} cy={362} r={19} fill={t} stroke={as} strokeWidth={3} />
        <rect x={730} y={620} width={190} height={58} rx={12} fill="#ffffff" stroke={ink(0.1)} />
        <rect x={746} y={634} width={110} height={9} rx={4} fill={ink(0.22)} />
        <rect x={746} y={652} width={70} height={7} rx={3} fill={ink(0.16)} />
        <rect x={848} y={646} width={56} height={20} rx={10} fill={a} />
      </Phone>
    </Window>
  );
}

/* ---------- 02 · PACT — national CBT association --------------------- */

function AssociationHero({ a }: Ctx) {
  const people = Array.from({ length: 10 });
  return (
    <Window x={110} y={158} w={980} h={588} a={a}>
      {/* nav */}
      <rect x={150} y={210} width={44} height={36} rx={5} fill={a} />
      <Stack x={206} y={214} gap={6} rows={[{ w: 96, h: 9, fill: ink(0.5) }, { w: 66, h: 7, fill: ink(0.28) }]} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={760 + i * 70} y={224} width={46} height={8} rx={4} fill={ink(0.3)} />
      ))}

      {/* hero photo band */}
      <rect x={132} y={268} width={936} height={456} rx={10} fill="#d9d3c2" />
      {people.map((_, i) => (
        <g key={i}>
          <circle cx={182 + i * 92} cy={520} r={26} fill={ink(0.34)} />
          <path d={`M${152 + i * 92} 560 h60 v150 h-60 Z`} fill={ink(0.28)} />
        </g>
      ))}
      <rect x={132} y={268} width={936} height={456} rx={10} fill={ink(0.34)} />

      {/* headline + button */}
      <Stack x={300} y={430} gap={16} rows={[{ w: 600, h: 22, fill: "#f2efe6", r: 6 }, { w: 470, h: 22, fill: "#f2efe6", r: 6 }]} />
      <rect x={510} y={528} width={180} height={46} rx={4} fill="none" stroke="#f2efe6" strokeWidth={2} />
      <rect x={556} y={546} width={88} height={10} rx={5} fill="#f2efe6" />
    </Window>
  );
}

/* ---------- 03 · Aiza — CBT AI companion app ------------------------- */

function CompanionApp({ a, as, t }: Ctx) {
  return (
    <g>
      {/* back phone with chat bubbles */}
      <Phone x={648} y={214} w={244} h={462} rot={7}>
        <rect x={690} y={296} width={132} height={44} rx={16} fill={a} opacity={0.92} />
        <rect x={700} y={360} width={150} height={48} rx={16} fill={ink(0.14)} />
        <rect x={686} y={430} width={118} height={42} rx={16} fill={t} opacity={0.9} />
        <rect x={706} y={498} width={140} height={46} rx={16} fill={ink(0.12)} />
      </Phone>

      {/* front phone */}
      <Phone x={420} y={182} w={262} h={500}>
        <Stack
          x={456}
          y={238}
          gap={9}
          rows={[
            { w: 150, h: 18, fill: ink(0.82), r: 5 },
            { w: 108, h: 18, fill: ink(0.82), r: 5 },
            { w: 92, h: 16, fill: a, r: 5 },
          ]}
        />
        {/* mascot */}
        <circle cx={612} cy={262} r={40} fill={as} stroke={a} strokeWidth={2} />
        <circle cx={599} cy={258} r={3.4} fill={ink(0.7)} />
        <circle cx={625} cy={258} r={3.4} fill={ink(0.7)} />
        <path d="M598 272 q14 12 28 0" stroke={ink(0.6)} strokeWidth={2.4} fill="none" strokeLinecap="round" />

        {/* action cards */}
        {[
          { y: 372, c: a },
          { y: 432, c: t },
          { y: 492, c: "#25a15a" },
        ].map((row, i) => (
          <g key={i}>
            <rect x={452} y={row.y} width={208} height={48} rx={12} fill="#ffffff" stroke={ink(0.1)} />
            <circle cx={480} cy={row.y + 24} r={14} fill={row.c} />
            <rect x={510} y={row.y + 14} width={120} height={9} rx={4} fill={ink(0.28)} />
            <rect x={510} y={row.y + 30} width={78} height={7} rx={3} fill={ink(0.14)} />
          </g>
        ))}

        <rect x={452} y={566} width={208} height={40} rx={20} fill={a} />
        <rect x={512} y={582} width={88} height={9} rx={4} fill={IVORY} />
      </Phone>
    </g>
  );
}

/* ---------- 04 · 123CBT — module dashboard --------------------------- */

function ModuleDashboard({ a, as }: Ctx) {
  const tints = [a, ink(0.55), as, a, ink(0.4), as];
  const cols = [322, 548, 774];
  const rows = [282, 414];
  return (
    <Window x={110} y={150} w={980} h={600} a={a}>
      {/* sidebar */}
      <rect x={112} y={194} width={172} height={554} fill={ink(0.04)} />
      <circle cx={148} cy={228} r={10} fill={a} />
      <rect x={168} y={222} width={72} height={10} rx={5} fill={ink(0.4)} />
      <rect x={128} y={266} width={140} height={30} rx={8} fill={as} />
      <rect x={144} y={276} width={96} height={9} rx={4} fill={a} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={144} y={318 + i * 34} width={104} height={9} rx={4} fill={ink(0.22)} />
      ))}

      {/* greeting */}
      <rect x={322} y={214} width={168} height={16} rx={6} fill={ink(0.7)} />
      <rect x={322} y={240} width={112} height={9} rx={4} fill={ink(0.24)} />

      {/* module cards 3×2 */}
      {rows.map((ry, r) =>
        cols.map((cx, cIdx) => {
          const i = r * 3 + cIdx;
          return (
            <g key={i}>
              <rect x={cx} y={ry} width={196} height={112} rx={10} fill="#ffffff" stroke={ink(0.08)} />
              <rect x={cx + 14} y={ry + 14} width={168} height={48} rx={6} fill={tints[i]} opacity={0.85} />
              <rect x={cx + 14} y={ry + 74} width={96} height={8} rx={4} fill={ink(0.24)} />
              <rect x={cx + 14} y={ry + 92} width={168} height={6} rx={3} fill={ink(0.1)} />
              <rect x={cx + 14} y={ry + 92} width={110} height={6} rx={3} fill={a} />
            </g>
          );
        })
      )}

      {/* weekly progress chart */}
      <rect x={322} y={550} width={648} height={168} rx={12} fill="#ffffff" stroke={ink(0.08)} />
      <rect x={344} y={572} width={150} height={11} rx={5} fill={ink(0.3)} />
      <path
        d="M344 686 C 420 610, 470 640, 540 604 S 660 700, 730 646 S 870 596, 948 626 L948 700 L344 700 Z"
        fill={a}
        opacity={0.18}
      />
      <path
        d="M344 686 C 420 610, 470 640, 540 604 S 660 700, 730 646 S 870 596, 948 626"
        fill="none"
        stroke={a}
        strokeWidth={3}
      />
    </Window>
  );
}

/* ---------- 05 · Ministry of Dubai — Shopify storefront -------------- */

function StorefrontDevices({ a, as }: Ctx) {
  return (
    <g>
      {/* tablet (left) */}
      <g>
        <rect x={150} y={330} width={210} height={288} rx={20} fill={IVORY} stroke={ink(0.16)} strokeWidth={2} />
        <rect x={168} y={360} width={174} height={110} rx={8} fill={a} opacity={0.8} />
        <rect x={168} y={484} width={120} height={9} rx={4} fill={ink(0.24)} />
        <rect x={168} y={504} width={78} height={20} rx={10} fill={as} />
      </g>

      {/* phone (right) */}
      <Phone x={912} y={344} w={150} h={300}>
        <rect x={928} y={378} width={118} height={120} rx={10} fill={a} opacity={0.85} />
        <rect x={928} y={512} width={90} height={9} rx={4} fill={ink(0.24)} />
        <rect x={928} y={530} width={60} height={8} rx={4} fill={ink(0.16)} />
        <rect x={928} y={556} width={118} height={30} rx={8} fill={as} />
      </Phone>

      {/* laptop (center, front) */}
      <g>
        <rect x={300} y={250} width={604} height={372} rx={14} fill={IVORY} stroke={ink(0.14)} strokeWidth={2} />
        <BrowserChrome x={300} y={250} w={604} a={a} />
        {/* product hero */}
        <rect x={330} y={314} width={250} height={278} rx={8} fill={as} />
        <path d="M400 348 h110 l24 40 -30 22 v150 h-98 v-150 l-30 -22 Z" fill={a} opacity={0.9} />
        <rect x={610} y={330} width={264} height={16} rx={6} fill={ink(0.7)} />
        <rect x={610} y={360} width={200} height={11} rx={5} fill={ink(0.28)} />
        <rect x={610} y={386} width={228} height={11} rx={5} fill={ink(0.2)} />
        <rect x={610} y={432} width={120} height={34} rx={6} fill={a} />
        {/* thumbnail row */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={610 + i * 66} y={500} width={54} height={54} rx={6} fill={ink(0.08)} stroke={ink(0.12)} />
        ))}
      </g>
      {/* laptop base */}
      <rect x={268} y={620} width={668} height={16} rx={7} fill={ink(0.14)} />

      {/* sale tag */}
      <g>
        <path d="M980 250 h74 l40 40 -40 40 h-74 Z" fill={a} />
        <circle cx={996} cy={266} r={7} fill={IVORY} />
      </g>
    </g>
  );
}

/* ---------- 06 · Abraj Stay — travel booking ------------------------- */

function TravelBooking({ a, as }: Ctx) {
  return (
    <g>
      {/* dashed flight path + plane */}
      <path d="M150 300 Q600 150 1050 290" fill="none" stroke={a} strokeWidth={2.5} strokeDasharray="12 12" opacity={0.55} />
      <path d="M600 196 l34 -8 -10 12 10 10 Z" fill={a} transform="rotate(6 617 202)" />

      {/* browser */}
      <Window x={110} y={228} w={740} h={520} a={a}>
        {/* search bar */}
        <rect x={140} y={296} width={680} height={56} rx={12} fill="#ffffff" stroke={ink(0.14)} strokeWidth={2} />
        <circle cx={172} cy={324} r={8} fill={a} />
        <rect x={192} y={318} width={150} height={12} rx={6} fill={ink(0.24)} />
        <rect x={392} y={318} width={90} height={12} rx={6} fill={ink(0.16)} />
        <rect x={720} y={308} width={82} height={32} rx={8} fill={a} />

        {/* result cards */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={140 + i * 232} y={388} width={210} height={300} rx={12} fill="#ffffff" stroke={ink(0.08)} />
            <rect x={140 + i * 232} y={388} width={210} height={150} rx={12} fill={i % 2 ? as : a} opacity={i % 2 ? 1 : 0.8} />
            <rect x={158 + i * 232} y={560} width={130} height={11} rx={5} fill={ink(0.3)} />
            <rect x={158 + i * 232} y={584} width={90} height={9} rx={4} fill={ink(0.18)} />
            {/* rating dots */}
            {[0, 1, 2, 3, 4].map((d) => (
              <circle key={d} cx={166 + i * 232 + d * 16} cy={618} r={4} fill={d < 4 ? a : ink(0.15)} />
            ))}
            <rect x={158 + i * 232} y={642} width={80} height={22} rx={11} fill={a} opacity={0.9} />
          </g>
        ))}
      </Window>

      {/* phone — My Bookings */}
      <Phone x={866} y={288} w={236} h={442}>
        <rect x={888} y={330} width={192} height={40} rx={12} fill="#ffffff" stroke={ink(0.12)} />
        <circle cx={910} cy={350} r={7} fill={a} />
        <rect x={928} y={344} width={110} height={11} rx={5} fill={ink(0.2)} />
        {/* tabs */}
        <rect x={888} y={388} width={70} height={10} rx={5} fill={a} />
        <rect x={974} y={388} width={62} height={10} rx={5} fill={ink(0.16)} />
        {/* booking cards */}
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x={888} y={416 + i * 148} width={192} height={132} rx={12} fill="#ffffff" stroke={ink(0.08)} />
            <rect x={888} y={416 + i * 148} width={192} height={80} rx={12} fill={i % 2 ? as : a} opacity={i % 2 ? 1 : 0.8} />
            <rect x={906} y={508 + i * 148} width={96} height={9} rx={4} fill={ink(0.26)} />
            <rect x={1010} y={506 + i * 148} width={52} height={16} rx={8} fill={a} />
          </g>
        ))}
      </Phone>
    </g>
  );
}

/* ---------- 07 · Tamayouz — corporate excellence portal -------------- */

function PortalDashboard({ a, as }: Ctx) {
  return (
    <Window x={110} y={158} w={980} h={588} a={a}>
      {/* nav + excellence star badge */}
      <rect x={150} y={214} width={40} height={28} rx={4} fill={a} />
      <rect x={204} y={222} width={90} height={10} rx={5} fill={ink(0.4)} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={720 + i * 66} y={224} width={44} height={8} rx={4} fill={ink(0.3)} />
      ))}
      <Star cx={1040} cy={228} r={16} fill={a} />

      {/* hero band */}
      <rect x={132} y={268} width={936} height={150} rx={10} fill={a} />
      <Stack x={168} y={306} gap={12} rows={[{ w: 300, h: 18, fill: IVORY, r: 5 }, { w: 220, h: 12, fill: "rgba(255,255,255,0.7)", r: 5 }]} />
      <rect x={168} y={368} width={120} height={30} rx={6} fill={IVORY} opacity={0.9} />
      {/* device on band */}
      <rect x={856} y={292} width={180} height={104} rx={8} fill={IVORY} opacity={0.9} />
      <rect x={872} y={308} width={148} height={64} rx={4} fill={as} />

      {/* course/video card */}
      <rect x={132} y={444} width={384} height={276} rx={12} fill="#ffffff" stroke={ink(0.08)} />
      <rect x={154} y={466} width={340} height={150} rx={8} fill={as} />
      <circle cx={324} cy={541} r={26} fill={a} />
      <path d="M316 528 l20 13 -20 13 Z" fill={IVORY} />
      <rect x={154} y={636} width={220} height={11} rx={5} fill={ink(0.3)} />
      <rect x={154} y={660} width={300} height={9} rx={4} fill={ink(0.16)} />

      {/* dashboard: KPI tiles + bar chart + table */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={544 + i * 168} y={444} width={150} height={78} rx={10} fill="#ffffff" stroke={ink(0.08)} />
          <rect x={564 + i * 168} y={462} width={60} height={9} rx={4} fill={ink(0.2)} />
          <rect x={564 + i * 168} y={484} width={90} height={20} rx={5} fill={a} opacity={0.85} />
        </g>
      ))}
      {/* bar chart */}
      <rect x={544} y={542} width={318} height={178} rx={10} fill="#ffffff" stroke={ink(0.08)} />
      {[70, 110, 86, 140, 100, 158, 120].map((bh, i) => (
        <rect key={i} x={566 + i * 40} y={694 - bh} width={24} height={bh} rx={4} fill={i % 2 ? as : a} />
      ))}
      {/* table */}
      <rect x={884} y={542} width={184} height={178} rx={10} fill="#ffffff" stroke={ink(0.08)} />
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={i}>
          <circle cx={906} cy={574 + i * 30} r={7} fill={i === 0 ? a : ink(0.14)} />
          <rect x={922} y={569 + i * 30} width={120} height={9} rx={4} fill={ink(0.18)} />
        </g>
      ))}
    </Window>
  );
}

/* ---------- 08 · Bagtote — luggage-sharing logistics app ------------- */

function LogisticsApp({ a, t }: Ctx) {
  const nodes: [number, number][] = [
    [792, 300],
    [880, 250],
    [960, 330],
    [900, 430],
    [810, 470],
    [1000, 250],
  ];
  return (
    <g>
      {/* node network (blockchain) */}
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % nodes.length];
        return <line key={`l${i}`} x1={n[0]} y1={n[1]} x2={next[0]} y2={next[1]} stroke={a} strokeWidth={2} opacity={0.45} />;
      })}
      {nodes.map((n, i) => (
        <circle key={`n${i}`} cx={n[0]} cy={n[1]} r={i === 0 ? 14 : 9} fill={i === 0 ? t : a} />
      ))}

      {/* phone */}
      <Phone x={430} y={168} w={268} h={534}>
        {/* dark hero */}
        <rect x={448} y={200} width={232} height={150} rx={18} fill={ink(0.88)} />
        <rect x={474} y={250} width={120} height={16} rx={5} fill={IVORY} />
        <rect x={474} y={276} width={80} height={9} rx={4} fill="rgba(255,255,255,0.55)" />

        {/* listing card with route */}
        <rect x={448} y={370} width={232} height={120} rx={14} fill="#ffffff" stroke={ink(0.1)} />
        <rect x={468} y={390} width={54} height={54} rx={8} fill={a} opacity={0.85} />
        <circle cx={556} cy={404} r={6} fill={a} />
        <circle cx={648} cy={404} r={6} fill={t} />
        <line x1={562} y1={404} x2={642} y2={404} stroke={ink(0.25)} strokeWidth={2} strokeDasharray="5 5" />
        <rect x={540} y={430} width={124} height={9} rx={4} fill={ink(0.2)} />
        <rect x={540} y={450} width={80} height={8} rx={4} fill={ink(0.14)} />

        {/* tracking bar */}
        <rect x={448} y={512} width={232} height={54} rx={14} fill="#ffffff" stroke={ink(0.1)} />
        <rect x={468} y={534} width={140} height={8} rx={4} fill={ink(0.12)} />
        <rect x={468} y={534} width={92} height={8} rx={4} fill={a} />
        <circle cx={560} cy={538} r={9} fill={a} />

        {/* nav dots */}
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={480 + i * 58} cy={664} r={7} fill={i === 0 ? a : ink(0.16)} />
        ))}
      </Phone>
    </g>
  );
}

function Star({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const pts = [];
  for (let i = 0; i < 5; i++) {
    const outer = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const inner = outer + Math.PI / 5;
    pts.push(`${cx + Math.cos(outer) * r} ${cy + Math.sin(outer) * r}`);
    pts.push(`${cx + Math.cos(inner) * r * 0.44} ${cy + Math.sin(inner) * r * 0.44}`);
  }
  return <path d={`M${pts.join(" L")} Z`} fill={fill} />;
}
