/** Recognizable UI archetype each case's generated artwork recreates. */
export type CaseLayout =
  | "marketplace-search"
  | "association-hero"
  | "companion-app"
  | "module-dashboard"
  | "storefront-devices"
  | "travel-booking"
  | "portal-dashboard"
  | "logistics-app";

export type CaseItem = {
  slug: string;
  num: string;
  title: [string, string];
  /** short line shown on the index row */
  description: string;
  /** short tag list shown on the index row */
  tags: string;
  year: string;
  /** which stylized interface mockup CaseArtwork renders for this case */
  layout: CaseLayout;
  /** brand accent used only on this case's own detail page */
  accent: string;
  accentSoft: string;
  industry: string;
  techStack: string[];
  scopeOfWork: string[];
  overview: string;
  requirements: string[];
  solution: string[];
  liveUrl?: string;
  /** set when the work was delivered under a partner agency banner */
  credit?: string;
};

export const CASES: CaseItem[] = [
  {
    slug: "dil-ki-baat",
    num: "01",
    title: ["Dil Ki", "Baat"],
    description:
      "A therapist marketplace connecting people to certified CBT therapists — search, video consultation, and online prescriptions in one calm, approachable platform.",
    tags: "Web Design · Development · Platform",
    year: "2024",
    layout: "marketplace-search",
    accent: "#3c3fb0",
    accentSoft: "#e3e4fa",
    industry: "Mental Health / Telehealth",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    scopeOfWork: ["Web Design", "Front-end & Back-end Development", "Booking System"],
    overview:
      "Dil Ki Baat needed to feel like the largest, calmest room in the building — a place where searching for a Cognitive Behavioral Therapy therapist doesn't feel clinical or intimidating. The brief was a full web design and development pass on a therapist marketplace built for a Canadian audience.",
    requirements: [
      "A search experience that filters by condition, location, therapist type and availability without overwhelming a first-time visitor",
      "Video consultation booking and certified-therapist verification built into the flow, not bolted on",
      "A visual language warm enough for a mental-health audience, credible enough for a healthcare product",
    ],
    solution: [
      "Designed and built the full marketing site and therapist-search flow, from the illustrated hero through to booking confirmation",
      "Built a searchable therapist directory with condition, location and therapist-type filtering",
      "Wired up video consultation scheduling and an online prescription hand-off for returning patients",
      "Established the indigo-and-teal visual system — soft geometry, illustrated hero, WhatsApp-first support — carried across every page",
    ],
    liveUrl: "https://www.dilkibaat.ca",
  },
  {
    slug: "pact",
    num: "02",
    title: ["PACT", "Cognitive Therapy"],
    description:
      "Web design and development for Pakistan's first national CBT association — a credible, resource-rich home for the country's cognitive therapy community.",
    tags: "Web Design · Development",
    year: "2023",
    layout: "association-hero",
    accent: "#5b6b3f",
    accentSoft: "#e6e8d6",
    industry: "Professional Association / Nonprofit",
    techStack: ["WordPress", "PHP", "MySQL"],
    scopeOfWork: ["Web Design", "Development", "Content Structure"],
    overview:
      "PACT — the Pakistan Association of Cognitive Therapy — is the first national CBT organization in Asia and the Middle East. The site needed to carry that weight: an institutional home for members, resources, training programs and a growing photo record of the association's work, without reading like a dated nonprofit template.",
    requirements: [
      "A structure that could hold About, Gallery, PICT (training) and Resources sections without becoming a maze",
      "A homepage strong enough to state the association's national/regional standing in one screen",
      "An editable content system the association's own team could maintain after handoff",
    ],
    solution: [
      "Designed and built the full site on a CMS the internal team could run independently",
      "Structured navigation around About Us, Gallery, PICT and Resources so each audience — members, trainees, the public — finds its own path",
      "Built a full-bleed photographic homepage anchored by a clear statement of the association's regional standing",
    ],
    liveUrl: "https://www.pact.com.pk",
  },
  {
    slug: "aiza-ai",
    num: "03",
    title: ["Aiza", "AI Companion"],
    description:
      "Pakistan's first CBT-based AI companion — talk, call, or message in four languages, with a calm voice built to feel human without pretending to be a therapist.",
    tags: "Product Design · Branding · App",
    year: "2026",
    layout: "companion-app",
    accent: "#d9714a",
    accentSoft: "#f6e6dd",
    industry: "Mental Health / AI",
    techStack: ["Android (Kotlin)", "LLM Integration", "WhatsApp API"],
    scopeOfWork: ["Product Design", "Brand Identity", "Android App Development"],
    overview:
      "Aiza is a CBT-informed AI companion built for a Pakistani audience — reachable by chat, voice call, or WhatsApp, in Urdu, English, Punjabi or Sindhi. The product needed a personality: calm, private, never pretending to be a licensed therapist, but present at 3am when nothing else is.",
    requirements: [
      "A companion that feels emotionally safe across four languages and several ways of reaching it (chat, call, WhatsApp)",
      "CBT-grounded structure underneath — mood check-ins, journaling, a self-care library — without feeling like homework",
      "A clear, honest boundary around what the product is and isn't, with a path to a live therapist when someone needs more",
    ],
    solution: [
      "Designed the Android app end to end — chat, voice call and WhatsApp entry points, daily check-ins, journal & reports, and a self-care library",
      "Built the brand: name, mascot, and a warm terracotta-and-teal palette that reads as companionship rather than clinical software",
      "Designed the crisis-help and live-therapist handoff so the app never strands someone who needs more than a chatbot",
    ],
  },
  {
    slug: "123cbt",
    num: "04",
    title: ["123CBT", "Structured Care"],
    description:
      "A self-guided, module-based CBT program — nine structured lessons from Stress to Staying Well, each one trackable and illustrated to feel like a course, not a worksheet.",
    tags: "Web App · Development",
    year: "2023",
    layout: "module-dashboard",
    accent: "#1c2c4d",
    accentSoft: "#dfe3ec",
    industry: "Mental Health / E-learning",
    techStack: ["React", "Node.js", "Chart.js"],
    scopeOfWork: ["Web App Design", "Front-end & Back-end Development"],
    overview:
      "123CBT turns a full course of Cognitive Behavioral Therapy — Stress, Danger Centre, Examine Thoughts, Challenge Thoughts, Balanced Thoughts, Problem Solving, Balanced Activities, Relationships, Staying Well — into a self-paced dashboard someone can actually finish, with progress they can see.",
    requirements: [
      "Nine CBT modules that read as a program, not a pile of disconnected pages",
      "Visible progress — per-module completion and a weekly trend — so the work feels cumulative",
      "A private space for journaling ('My Healthy Thoughts') that doesn't feel exposed inside a dashboard",
    ],
    solution: [
      "Designed and built the full logged-in dashboard: nine illustrated modules, each with its own progress bar",
      "Built a weekly-progress chart so completing modules translates into a visible trend over time",
      "Added a private journaling space and a downloadable-resources library alongside the core modules",
    ],
  },
  {
    slug: "ministry-of-dubai-government",
    num: "05",
    title: ["Ministry of", "Dubai Government"],
    description:
      "An end-to-end e-commerce rebuild for a Dubai government ministry — a fast, mobile-first storefront built on Shopify.",
    tags: "Website Development · Graphic Design",
    year: "2023",
    layout: "storefront-devices",
    accent: "#d81b8a",
    accentSoft: "#fbe1ef",
    industry: "Government / E-commerce",
    techStack: ["Shopify", "HTML/CSS", "JavaScript"],
    scopeOfWork: ["Website Development", "Graphic Design"],
    overview:
      "Delivered an end-to-end design and development solution for a Ministry of the Dubai Government, focused on building a modern and scalable storefront. The approved designs were implemented into a fully functional Shopify-based front-end, prioritizing mobile responsiveness and cross-browser compatibility.",
    requirements: [
      "A modern, scalable front-end that could grow with the ministry's catalogue without a rebuild",
      "Full mobile responsiveness and consistent behaviour across browsers",
      "A storefront that felt polished and editorial, not like a generic Shopify theme",
    ],
    solution: [
      "Delivered graphic design and a full Shopify build from approved designs through to launch",
      "Implemented a responsive front-end in HTML/CSS/JavaScript on top of Shopify's platform",
      "Structured the catalogue and storefront for cross-browser consistency and long-term scalability",
    ],
    credit: "via Wenawa",
  },
  {
    slug: "abraj-stay",
    num: "06",
    title: ["Abraj", "Stay"],
    description:
      "A travel platform that makes booking flights, hotels, tours and rentals simple and fast — a clean, mobile-first interface for planning a trip without the usual friction.",
    tags: "Website Development · Graphic Design",
    year: "2024",
    layout: "travel-booking",
    accent: "#c23b2e",
    accentSoft: "#f7e2df",
    industry: "Travel & Hospitality",
    techStack: ["Shopify", "HTML/CSS", "JavaScript"],
    scopeOfWork: ["Website Development", "Graphic Design"],
    overview:
      "Abraj Stay needed one platform to cover flights, hotels, tours and rentals without the booking flow turning into four different products stitched together. The brief was a clean, intuitive interface built mobile-first, so planning a trip stays simple even when the itinerary isn't.",
    requirements: [
      "A single, coherent booking flow across flights, hotels, tours and rentals rather than four disconnected tools",
      "Mobile-first performance, since most travel research and booking happens on a phone",
      "A visual identity confident enough to compete with established travel platforms",
    ],
    solution: [
      "Designed and built the full booking site — search, listings and checkout — across flights, hotels, tours and rentals",
      "Prioritized a mobile-first layout and navigation so the experience holds up on a phone first, desktop second",
      "Delivered the brand's dark, warm visual identity across the marketing site and booking flow",
    ],
    credit: "via Wenawa",
  },
  {
    slug: "tamayouz-excellence-module",
    num: "07",
    title: ["Tamayouz", "Excellence Module"],
    description:
      "A corporate intranet module built to Qatar's Governance Excellence Program standards — workflow automation and reporting for organizational compliance.",
    tags: "Website Development · Graphic Design",
    year: "2024",
    layout: "portal-dashboard",
    accent: "#3b5fe0",
    accentSoft: "#e2e8fb",
    industry: "Corporate / Enterprise Software",
    techStack: ["HTML/CSS", "JavaScript", "Custom CMS"],
    scopeOfWork: ["Website Development", "Graphic Design"],
    overview:
      "Tamayouz — Arabic for excellence — needed a corporate intranet module that could hold an organization accountable to Qatar's Governance Excellence Program without turning compliance into paperwork. The brief was workflow automation and reporting built into a portal people would actually use.",
    requirements: [
      "Structured practice management that maps directly to the Governance Excellence Program's standards",
      "Workflow automation so compliance tracking doesn't rely on manual reporting",
      "Real-time reporting an internal team can read at a glance, not just an auditor",
    ],
    solution: [
      "Designed and built the intranet module's front-end, structured around the program's practice areas",
      "Implemented workflow automation to move compliance tasks through the system with less manual handling",
      "Built real-time reporting views so operational efficiency and compliance status are visible as they happen",
    ],
    credit: "via Wenawa",
  },
  {
    slug: "bagtote",
    num: "08",
    title: ["Bagtote", "App"],
    description:
      "A mobile platform connecting travelers with spare luggage space to people who need affordable shipping — secure, blockchain-backed, and built for real-time tracking.",
    tags: "App Design · Development",
    year: "2024",
    layout: "logistics-app",
    accent: "#2247c9",
    accentSoft: "#dde6fb",
    industry: "Logistics / C2C Marketplace",
    techStack: ["React Native", "Blockchain", "Node.js"],
    scopeOfWork: ["Product Design", "Graphic Design", "App Development"],
    overview:
      "Bagtote turns a traveler's spare suitcase space into a shipping lane — matching people who have room to carry with people who need something delivered, faster and cheaper than traditional couriers. Trust was the whole problem: strangers coordinating shipments needed transactions that were secure and transparent by default.",
    requirements: [
      "A trust layer strangers can rely on when one is carrying the other's belongings across a trip",
      "Real-time tracking so both sides can see where a shipment actually is",
      "A mobile experience simple enough to use mid-trip, not just at a desk",
    ],
    solution: [
      "Designed and built the mobile app end to end — listing spare luggage space, matching, and handoff confirmation",
      "Used blockchain-backed transactions to keep payment and proof-of-delivery secure and transparent for both sides",
      "Built real-time tracking into the shipment flow so status is visible from pickup to drop-off",
    ],
    credit: "via Wenawa",
  },
];
