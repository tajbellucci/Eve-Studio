"use client";

import { useReveal } from "@/lib/useReveal";
import { Starburst, HandPoint, CircularText } from "@/components/Decor";
import MarqueeText from "@/components/MarqueeText";

const SERVICES: { name: string; voice: "serif" | "sans" | "wonk" }[] = [
  { name: "Art Direction", voice: "serif" },
  { name: "Branding", voice: "sans" },
  { name: "Web Design", voice: "wonk" },
  { name: "Mobile Design", voice: "sans" },
  { name: "Content Production", voice: "serif" },
  { name: "Motion Design", voice: "wonk" },
  { name: "Creative Front-end", voice: "sans" },
  { name: "Back-end Development", voice: "serif" },
];

const voiceClass: Record<string, string> = {
  serif: "font-display uppercase",
  sans: "font-condensed uppercase",
  wonk: "font-display-wonk lowercase",
};

export default function AboutServices() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="studio" className="relative pt-32 md:pt-44">
      {/* section marker */}
      <div className="flex items-baseline justify-between px-[var(--gutter)]">
        <span className="reveal-fade label text-ink-soft">( Just about )</span>
        <span className="reveal-fade label text-ink-soft">002 — what we do</span>
      </div>

      {/* statement */}
      <div className="mt-10 px-[var(--gutter)] md:mt-16">
        <p className="font-display text-[length:var(--step-medium)] leading-[1.12]">
          <span className="mask-line">
            <span className="mask-line-inner">We are a compact team of designers,</span>
          </span>
          <span className="mask-line">
            <span className="mask-line-inner">
              developers &amp; storytellers who treat
            </span>
          </span>
          <span className="mask-line">
            <span className="mask-line-inner">
              every pixel like it{" "}
              <em className="font-display-wonk">actually matters.</em>
            </span>
          </span>
        </p>
      </div>

      {/* flowing services wall */}
      <div className="relative mt-20 px-[var(--gutter)] md:mt-32">
        <Starburst className="float-soft absolute -top-8 right-[18%] hidden w-16 text-ink md:block lg:w-24" />
        <div className="relative hidden md:block" style={{ ["--r" as string]: "8deg" }}>
          <CircularText
            id="services-badge"
            text="independent · since 2018 · worldwide · "
            className="spin-slower absolute -top-16 left-[55%] w-28 text-ink lg:w-36"
          />
        </div>

        <ul className="flex flex-wrap items-baseline gap-x-[0.45em] leading-[1.02]">
          {SERVICES.map((s, i) => (
            <li key={s.name} className="flex items-baseline">
              <span className="mask-line">
                <span
                  className={`mask-line-inner text-[length:var(--step-big)] ${voiceClass[s.voice]}`}
                >
                  {s.name}
                </span>
              </span>
              {i < SERVICES.length - 1 && (
                <span className="reveal-fade serif-num mx-[0.25em] hidden text-[length:calc(var(--step-big)*0.28)] text-ink-soft md:inline">
                  {["·", "/", "&", "—", "·", ",", "+"][i % 7]}
                </span>
              )}
            </li>
          ))}
          <li className="reveal-fade ml-4 hidden items-center md:flex">
            <HandPoint className="w-20 text-ink lg:w-28" />
          </li>
        </ul>
      </div>

      {/* meta strip */}
      <div className="mt-16 grid grid-cols-2 gap-6 px-[var(--gutter)] md:mt-24 md:grid-cols-4">
        {[
          ["Approach", "Strategy before pixels, always."],
          ["Team", "12 people, zero account managers."],
          ["Clients", "Brave ones, from startups to museums."],
          ["Belief", "Boring is the only real failure."],
        ].map(([k, v]) => (
          <div key={k} className="reveal-fade border-t border-ink/20 pt-4">
            <span className="label text-ink-soft">{k}</span>
            <p className="mt-2 text-sm leading-relaxed">{v}</p>
          </div>
        ))}
      </div>

      {/* divider marquee */}
      <div className="mt-24 border-y border-ink/15 py-4 md:mt-32">
        <MarqueeText speed={26}>
          <span className="label mx-6 text-ink-soft">digital experiences</span>
          <span className="mx-2 text-ink">✳</span>
          <span className="font-display-wonk mx-6 text-lg">crafted with care</span>
          <span className="mx-2 text-ink">✳</span>
          <span className="label mx-6 text-ink-soft">strategy · design · code</span>
          <span className="mx-2 text-ink">✳</span>
        </MarqueeText>
      </div>
    </section>
  );
}
