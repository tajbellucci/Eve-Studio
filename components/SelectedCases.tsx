"use client";

import { useReveal } from "@/lib/useReveal";
import { CASES } from "@/data/cases";
import CaseCard from "@/components/CaseCard";

export default function SelectedCases() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="works" className="relative pt-28 md:pt-40">
      <div className="flex items-baseline justify-between px-[var(--gutter)]">
        <span className="reveal-fade label text-ink-soft">003 — portfolio</span>
        <span className="reveal-fade label text-ink-soft">2018 → today</span>
      </div>

      <h2 className="mt-8 px-[var(--gutter)] leading-[0.86] md:mt-12">
        <span className="mask-line">
          <span className="mask-line-inner font-display block text-[length:var(--step-giant)] uppercase">
            Selected
          </span>
        </span>
        <span className="mask-line">
          <span className="mask-line-inner flex items-baseline gap-[0.2em] text-[length:var(--step-giant)]">
            <span className="font-display-wonk">cases</span>
            <span className="serif-num text-[0.22em] text-ink-soft">
              ({CASES.length})
            </span>
          </span>
        </span>
      </h2>

      <p className="reveal-fade mt-8 max-w-[24rem] px-[var(--gutter)] text-sm leading-relaxed text-ink-soft md:mt-4 md:ml-auto md:mr-[var(--gutter)]">
        A non-exhaustive, slightly obsessive selection of the work we are
        allowed to talk about. Hover, wander, explore.
      </p>

      <div className="mt-16 md:mt-24">
        {CASES.map((item, i) => (
          <CaseCard key={item.num} item={item} flipped={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
