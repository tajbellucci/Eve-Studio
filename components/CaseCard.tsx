"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { CaseItem } from "@/data/cases";

export default function CaseCard({
  item,
  flipped,
}: {
  item: CaseItem;
  flipped: boolean;
}) {
  const rowRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const media = mediaRef.current;
    if (!row || !media) return;

    const ctx = gsap.context(() => {
      // clip reveal of the image + gentle parallax while scrolling through
      gsap.fromTo(
        media,
        { clipPath: "inset(12% 6% 12% 6%)", y: 60 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        media.firstElementChild,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      // image subtly follows the cursor
      if (window.matchMedia("(pointer: fine)").matches) {
        const xTo = gsap.quickTo(media, "x", { duration: 0.7, ease: "power3.out" });
        const rTo = gsap.quickTo(media, "rotation", { duration: 0.7, ease: "power3.out" });
        const move = (e: MouseEvent) => {
          const rect = row.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          xTo(nx * 34);
          rTo(nx * 1.6);
        };
        const reset = () => {
          xTo(0);
          rTo(0);
        };
        row.addEventListener("mousemove", move);
        row.addEventListener("mouseleave", reset);
        return () => {
          row.removeEventListener("mousemove", move);
          row.removeEventListener("mouseleave", reset);
        };
      }
    }, row);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={rowRef}
      className="case-row group grid items-center gap-8 border-t border-ink/15 px-[var(--gutter)] py-14 md:grid-cols-2 md:gap-14 md:py-24 lg:gap-20"
      data-cursor="view"
    >
      {/* text column */}
      <div
        className={`relative flex flex-col justify-center ${
          flipped ? "md:order-2 md:items-end md:text-right" : "md:order-1"
        }`}
      >
        <span className="serif-num text-[clamp(2.2rem,4.5vw,4rem)] leading-none text-ink-soft/70">
          {item.num}
        </span>
        <h3 className="case-title mt-3 font-display text-[clamp(2.4rem,5.5vw,5.5rem)] uppercase leading-[0.92] tracking-tight">
          {item.title[0]}
          <br />
          <span className="font-display-wonk normal-case">{item.title[1]}</span>
        </h3>
        <p
          className={`mt-5 max-w-[24rem] text-sm leading-relaxed text-ink-soft md:text-[0.95rem] ${
            flipped ? "md:ml-auto" : ""
          }`}
        >
          {item.description}
        </p>
        <div
          className={`mt-4 flex items-center gap-4 ${flipped ? "md:flex-row-reverse" : ""}`}
        >
          <span className="label text-ink-soft/80">{item.tags}</span>
          <span className="serif-num text-sm text-ink-soft/60">{item.year}</span>
        </div>
        <a
          href="#contact"
          className="pill mt-8 w-fit"
          data-cursor="link"
          data-magnetic
          aria-label={`Explore ${item.title.join(" ")}`}
        >
          Explore <span aria-hidden>→</span>
        </a>
      </div>

      {/* media column */}
      <div className={flipped ? "md:order-1" : "md:order-2"}>
        <div
          ref={mediaRef}
          className="case-media aspect-[4/3] w-full will-change-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={`${item.title.join(" ")} — abstract case visual`} loading="lazy" />
        </div>
      </div>
    </article>
  );
}
