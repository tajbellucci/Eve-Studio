"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { CircularText, Asterisk, Squiggle } from "@/components/Decor";

export default function Hero({ start }: { start: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!start || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".hero-line .mask-line-inner", {
        y: 0,
        duration: 1.5,
        stagger: 0.14,
      })
        .to(".hero-fade", { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, "-=0.9")
        .fromTo(
          ".hero-tag",
          { scale: 0, rotation: () => gsap.utils.random(-14, 14) },
          {
            scale: 1,
            rotation: (i, t) => Number((t as HTMLElement).dataset.rot ?? 0),
            duration: 0.8,
            ease: "back.out(2)",
            stagger: 0.09,
          },
          "-=1.0"
        );

      // slow parallax drift of the giant name on scroll
      gsap.to(".hero-name", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, [start]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-[var(--gutter)] pb-8 pt-28 md:pt-32"
    >
      {/* editorial intro message */}
      <div className="relative z-10 max-w-[46rem]">
        <h1 className="font-display text-[clamp(1.7rem,3.6vw,3.4rem)] leading-[1.08] tracking-tight">
          <span className="mask-line hero-line">
            <span className="mask-line-inner">Ava Studio is a full-service</span>
          </span>
          <span className="mask-line hero-line">
            <span className="mask-line-inner">
              creative studio<sup className="serif-num text-[0.45em]"> (est.’18)</sup> crafting
            </span>
          </span>
          <span className="mask-line hero-line">
            <span className="mask-line-inner font-display-wonk">unforgettable digital experiences.</span>
          </span>
        </h1>

        <p className="hero-fade reveal-fade mt-7 max-w-[26rem] text-[0.95rem] leading-relaxed text-ink-soft md:text-base">
          Strategy, design, development and storytelling — practiced daily,
          all together, under one roof. We build brands and digital products
          that people remember long after the tab is closed.
        </p>
      </div>

      {/* scattered hero tags */}
      <span className="hero-tag label absolute right-[12%] top-[24%] hidden rounded-full border border-ink px-4 py-2 md:block" data-rot="-8" style={{ transform: "scale(0)" }}>
        we
      </span>
      <span className="hero-tag label absolute right-[22%] top-[34%] hidden rounded-full bg-ink px-4 py-2 text-ivory md:block" data-rot="5" style={{ transform: "scale(0)" }}>
        are
      </span>
      <span className="hero-tag label absolute right-[8%] top-[44%] hidden rounded-full border border-ink px-4 py-2 md:block" data-rot="-4" style={{ transform: "scale(0)" }}>
        studio
      </span>
      <span className="hero-tag label absolute right-[30%] top-[18%] hidden md:block" data-rot="0" style={{ transform: "scale(0)" }}>
        all together¹
      </span>
      <span className="hero-tag label absolute left-[52%] top-[52%] hidden md:block" data-rot="0" style={{ transform: "scale(0)" }}>
        since ’18
      </span>
      <span className="hero-tag absolute right-[38%] top-[42%] hidden w-10 text-ink md:block" data-rot="12" style={{ transform: "scale(0)" }}>
        <Asterisk className="w-full" />
      </span>

      {/* giant split studio name */}
      <div className="hero-name relative z-0 -mx-[0.06em] mt-6 select-none leading-[0.82]">
        <span className="mask-line hero-line">
          <span className="mask-line-inner font-display block text-[length:var(--step-hero)] uppercase">
            Ava&nbsp;Stu
          </span>
        </span>
        <span className="mask-line hero-line">
          <span className="mask-line-inner font-display flex items-baseline text-[length:var(--step-hero)] uppercase">
            dio
            <span className="serif-num ml-[0.05em] hidden text-[0.16em] tracking-normal normal-case md:inline-block">
              (creative archive — selected works — no boring pixels)
            </span>
          </span>
        </span>
      </div>

      {/* showreel button */}
      <button
        type="button"
        className="hero-fade reveal-fade group absolute bottom-[22%] right-[var(--gutter)] z-20 hidden h-36 w-36 items-center justify-center rounded-full md:flex lg:h-44 lg:w-44"
        data-cursor="play"
        data-magnetic
        aria-label="Play showreel"
      >
        <span className="absolute inset-0 rounded-full border border-ink transition-transform duration-500 group-hover:scale-110" />
        <CircularText
          id="showreel-circle"
          text="play showreel — play showreel — "
          className="spin-slow absolute inset-2"
          fontSize={10.5}
        />
        <span className="relative z-10 ml-1 inline-block border-y-[9px] border-l-[15px] border-y-transparent border-l-ink transition-transform duration-500 group-hover:scale-125" />
      </button>

      {/* bottom meta row */}
      <div className="hero-fade reveal-fade relative z-10 mt-8 flex items-end justify-between">
        <span className="label text-ink-soft">Scroll to explore ↓</span>
        <Squiggle className="hidden w-28 text-ink md:block" />
        <span className="label text-ink-soft text-right">
          Independent —<br className="md:hidden" /> worldwide
        </span>
      </div>
    </section>
  );
}
