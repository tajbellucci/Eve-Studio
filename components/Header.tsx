"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const NAV = [
  { label: "Works", href: "#works" },
  { label: "Studio", href: "#studio" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

export default function Header({ start }: { start: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!start || !ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".hdr-item"),
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", delay: 0.2 }
    );
  }, [start]);

  return (
    <header
      ref={ref}
      className="fixed left-0 top-0 z-50 flex w-full items-start justify-between px-[var(--gutter)] py-5 mix-blend-difference text-ivory"
    >
      <a href="#top" className="hdr-item opacity-0" data-cursor="link" data-magnetic>
        <span className="font-condensed text-lg uppercase leading-none tracking-tight">
          Eve
          <br />
          Studio<sup className="text-[0.5em] align-super">®</sup>
        </span>
      </a>

      <div className="hdr-item label hidden opacity-0 md:block">
        Full-service
        <br />
        creative studio
      </div>

      <nav className="hdr-item flex gap-5 opacity-0 md:gap-8">
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="label link-line"
            data-cursor="link"
            data-magnetic
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
