"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll-triggered reveals scoped to a section.
 * Elements inside the ref:
 *  - `.mask-line .mask-line-inner`  → slide up out of an overflow mask
 *  - `.reveal-fade`                 → fade + drift up
 * Both stagger in document order when the section enters the viewport.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll<HTMLElement>(".mask-line .mask-line-inner");
      const fades = el.querySelectorAll<HTMLElement>(".reveal-fade");

      if (lines.length) {
        gsap.to(lines, {
          y: 0,
          duration: 1.3,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        });
      }
      if (fades.length) {
        gsap.to(fades, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export { gsap, ScrollTrigger };
