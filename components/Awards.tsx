"use client";

import { useEffect } from "react";
import { useReveal, gsap, ScrollTrigger } from "@/lib/useReveal";
import { Starburst } from "@/components/Decor";

const STATS: [string, number][] = [
  ["Studio of the Year", 1],
  ["Site of the Day", 24],
  ["Developer Award", 23],
  ["Mobile Excellence", 14],
  ["Site of the Year", 2],
  ["FWA of the Day", 6],
  ["Behance Gallery", 2],
  ["Interaction", 7],
  ["XD", 4],
  ["Graphic Design", 1],
  ["Illustrator", 1],
];

export default function Awards() {
  const ref = useReveal<HTMLElement>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // count-up on the stat numbers
      el.querySelectorAll<HTMLElement>(".stat-num").forEach((numEl) => {
        const target = Number(numEl.dataset.count ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: numEl, start: "top 88%", once: true },
          onUpdate: () => {
            numEl.textContent = String(Math.round(obj.v)).padStart(2, "0");
          },
        });
      });

      // gentle horizontal drift of the broken words
      gsap.to(".awards-drift-l", {
        xPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".awards-drift-r", {
        xPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={ref} id="awards" className="relative overflow-hidden pt-32 md:pt-48">
      <div className="flex items-baseline justify-between px-[var(--gutter)]">
        <span className="reveal-fade label text-ink-soft">004 — recognition</span>
        <span className="reveal-fade label text-ink-soft">proof, not promises</span>
      </div>

      {/* broken typographic composition */}
      <div className="relative mt-10 select-none leading-[0.84] md:mt-16">
        <div className="awards-drift-l px-[var(--gutter)]">
          <span className="mask-line">
            <span className="mask-line-inner font-display block text-[length:var(--step-giant)] uppercase">
              awards
            </span>
          </span>
        </div>
        <div className="awards-drift-r px-[var(--gutter)] text-right md:pr-[18vw]">
          <span className="mask-line">
            <span className="mask-line-inner font-display-wonk inline-block text-[length:calc(var(--step-giant)*0.6)]">
              and
            </span>
          </span>
        </div>
        <div className="awards-drift-l px-[var(--gutter)] md:pl-[12vw]">
          <span className="mask-line">
            <span className="mask-line-inner font-display block text-[length:var(--step-giant)] uppercase">
              recogni
            </span>
          </span>
        </div>
        <div className="awards-drift-r flex items-baseline gap-6 px-[var(--gutter)] md:pl-[34vw]">
          <span className="mask-line">
            <span className="mask-line-inner font-display block text-[length:var(--step-giant)] uppercase">
              tions
            </span>
          </span>
          <Starburst className="reveal-fade w-10 shrink-0 self-center text-ink md:w-16" />
        </div>
      </div>

      {/* stats grid */}
      <div className="mt-20 grid grid-cols-1 gap-x-10 px-[var(--gutter)] sm:grid-cols-2 md:mt-32 lg:grid-cols-3">
        {STATS.map(([name, count]) => (
          <div
            key={name}
            className="reveal-fade flex items-baseline justify-between border-t border-ink/20 py-5"
          >
            <span className="font-condensed text-base uppercase tracking-wide md:text-lg">
              {name}
            </span>
            <span
              className="stat-num serif-num text-[clamp(1.8rem,3vw,2.8rem)] leading-none"
              data-count={count}
            >
              00
            </span>
          </div>
        ))}
        <div className="reveal-fade flex items-center border-t border-ink/20 py-5">
          <span className="label text-ink-soft">…and counting. We keep the shelf dusted.</span>
        </div>
      </div>
    </section>
  );
}
