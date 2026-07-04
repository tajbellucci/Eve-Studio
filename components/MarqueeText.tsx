"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  /** seconds for one full loop */
  speed?: number;
  direction?: 1 | -1;
  className?: string;
  /** number of copies of the content (enough to cover the widest screens) */
  repeat?: number;
};

export default function MarqueeText({
  children,
  speed = 20,
  direction = -1,
  className = "",
  repeat = 4,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      xPercent: direction === -1 ? -50 : 0,
      duration: speed,
      ease: "none",
      repeat: -1,
      ...(direction === 1 ? { startAt: { xPercent: -50 } } : {}),
    });

    return () => {
      tween.kill();
    };
  }, [speed, direction]);

  const copies = Array.from({ length: repeat * 2 });

  return (
    <div className={`marquee ${className}`} aria-hidden>
      <div ref={trackRef} className="marquee-track">
        {copies.map((_, i) => (
          <span key={i} className="flex shrink-0 items-center">
            {children}
          </span>
        ))}
      </div>
    </div>
  );
}
