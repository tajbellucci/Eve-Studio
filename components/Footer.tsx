"use client";

import { useReveal } from "@/lib/useReveal";
import MarqueeText from "@/components/MarqueeText";
import { SunFace, Squiggle, Asterisk } from "@/components/Decor";

const SOCIALS = ["Instagram", "Behance", "Dribbble", "LinkedIn", "X"];

export default function Footer() {
  const ref = useReveal<HTMLElement>();

  return (
    <footer ref={ref} id="contact" className="relative mt-32 overflow-hidden md:mt-48">
      {/* divider marquee */}
      <div className="border-y border-ink/15 py-4">
        <MarqueeText speed={22}>
          <span className="font-display mx-6 text-2xl uppercase md:text-4xl">
            say hello
          </span>
          <span className="mx-2 text-ink">✳</span>
          <span className="font-display-wonk mx-6 text-2xl md:text-4xl">
            no boring pixels
          </span>
          <span className="mx-2 text-ink">✳</span>
        </MarqueeText>
      </div>

      {/* big CTA */}
      <div className="relative px-[var(--gutter)] pt-24 md:pt-36">
        <SunFace className="float-soft absolute right-[8%] top-16 hidden w-24 text-ink md:block lg:w-32" />
        <span
          className="float-soft absolute left-[55%] top-40 hidden lg:block"
          style={{ ["--r" as string]: "18deg" }}
        >
          <Asterisk className="w-8 text-ink" />
        </span>

        <h2 className="font-display max-w-[16ch] text-[length:var(--step-big)] leading-[0.98]">
          <span className="mask-line">
            <span className="mask-line-inner">Let’s do something</span>
          </span>
          <span className="mask-line">
            <span className="mask-line-inner">
              <em className="font-display-wonk">stunning</em> together.
            </span>
          </span>
        </h2>

        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between">
          <div className="reveal-fade">
            <span className="label text-ink-soft">New business</span>
            <br />
            <a
              href="mailto:hello@avastudio.example"
              className="link-line mt-2 inline-block font-display text-[clamp(1.4rem,3vw,2.6rem)]"
              data-cursor="link"
              data-magnetic
            >
              hello@avastudio.example
            </a>
            <br />
            <Squiggle className="mt-3 w-32 text-ink" />
          </div>

          <nav className="reveal-fade flex flex-wrap gap-x-7 gap-y-2">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#contact"
                className="label link-line"
                data-cursor="link"
                data-magnetic
              >
                {s}
              </a>
            ))}
          </nav>

          <div className="reveal-fade label text-ink-soft">
            Somewhere on Earth
            <br />
            Mon–Fri, ideas 24/7
          </div>
        </div>
      </div>

      {/* oversized closing wordmark */}
      <div className="relative mt-20 select-none md:mt-28">
        <div className="-mb-[0.16em] overflow-hidden px-[var(--gutter)] leading-[0.8]">
          <span className="mask-line">
            <span className="mask-line-inner font-display block whitespace-nowrap text-[length:var(--step-wordmark)] uppercase tracking-[-0.04em]">
              Ava Studio<sup className="text-[0.18em] align-[3em]">®</sup>
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 px-[var(--gutter)] py-5">
        <span className="label text-ink-soft">© 2018–2026 Ava Studio</span>
        <span className="label text-ink-soft">Real work, shown as it shipped</span>
        <a href="#top" className="label link-line" data-cursor="link" data-magnetic>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
