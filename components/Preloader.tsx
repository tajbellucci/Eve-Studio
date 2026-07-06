"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import MarqueeText from "@/components/MarqueeText";

const WORDS = ["creative archive", "digital studio", "selected works"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const root = rootRef.current!;
    const counter = counterRef.current!;
    const progress = { value: 0 };

    // lock scroll while loading
    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        setGone(true);
        doneRef.current();
      },
    });

    tl.to(progress, {
      value: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        counter.textContent = String(Math.round(progress.value)).padStart(3, "0");
      },
    })
      .to(root.querySelectorAll(".pre-row"), {
        yPercent: -110,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.in",
      }, "+=0.15")
      .to(root, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      }, "-=0.25");

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className="preloader" aria-hidden>
      <div className="flex flex-col gap-[1.5vh]">
        {WORDS.map((word, i) => (
          <div key={word} className="pre-row">
            <MarqueeText
              speed={14 + i * 5}
              direction={i % 2 === 0 ? -1 : 1}
              repeat={3}
            >
              <span className="font-display mx-[0.35em] text-[clamp(2.5rem,7vw,6.5rem)] uppercase leading-none">
                {word}
              </span>
              <span className="mx-[0.35em] text-[clamp(1.2rem,3vw,2.6rem)]">✳</span>
            </MarqueeText>
          </div>
        ))}
      </div>

      <div className="pre-row absolute bottom-[4vh] left-0 flex w-full items-end justify-between px-[var(--gutter)]">
        <span className="label opacity-60">Ava Studio® — loading</span>
        <span className="font-display text-[clamp(3rem,8vw,7rem)] leading-none">
          <span ref={counterRef}>000</span>
          <span className="text-[0.4em] align-top">%</span>
        </span>
      </div>
    </div>
  );
}
