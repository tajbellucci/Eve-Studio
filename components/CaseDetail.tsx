"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CASES, type CaseItem } from "@/data/cases";
import { asset } from "@/lib/asset";
import { useReveal } from "@/lib/useReveal";
import { Asterisk } from "@/components/Decor";

export default function CaseDetail({ item, next }: { item: CaseItem; next: CaseItem }) {
  const ref = useReveal<HTMLElement>();

  const accentVars = {
    "--case-accent": item.accent,
    "--case-accent-soft": item.accentSoft,
  } as CSSProperties;

  return (
    <article ref={ref} style={accentVars} className="pt-28 md:pt-36">
      {/* eyebrow + back link */}
      <div className="flex items-baseline justify-between px-[var(--gutter)]">
        <Link
          href="/#works"
          className="label link-line text-ink-soft"
          data-cursor="link"
          data-magnetic
        >
          ← All work
        </Link>
        <span className="label text-ink-soft">
          {item.num} / {String(CASES.length).padStart(2, "0")}
        </span>
      </div>

      {/* hero title */}
      <header className="mt-10 px-[var(--gutter)] md:mt-16">
        <span
          className="reveal-fade label inline-block rounded-full px-4 py-1.5"
          style={{ backgroundColor: "var(--case-accent-soft)", color: "var(--case-accent)" }}
        >
          {item.industry}
          {item.credit ? ` · ${item.credit}` : ""}
        </span>

        <h1 className="mt-6 font-display text-[var(--step-giant)] uppercase leading-[0.88]">
          <span className="mask-line">
            <span className="mask-line-inner block">{item.title[0]}</span>
          </span>
          <span className="mask-line">
            <span
              className="mask-line-inner font-display-wonk block normal-case"
              style={{ color: "var(--case-accent)" }}
            >
              {item.title[1]}
            </span>
          </span>
        </h1>

        <div className="reveal-fade mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="serif-num text-lg text-ink-soft">{item.year}</span>
          <span className="label text-ink-soft">{item.tags}</span>
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="pill"
              data-cursor="link"
              data-magnetic
            >
              Visit live site <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </header>

      {/* hero image */}
      <div className="reveal-fade mt-14 px-[var(--gutter)] md:mt-20">
        <div className="case-media aspect-[16/9] w-full overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(item.image)}
            alt={`${item.title.join(" ")} — case visual`}
            style={{ transform: "scale(1)" }}
          />
        </div>
      </div>

      {/* meta sidebar + overview */}
      <div className="mt-16 grid gap-10 px-[var(--gutter)] md:mt-24 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-16">
        <div className="reveal-fade flex flex-col gap-8">
          <div>
            <span className="label text-ink-soft">Industry</span>
            <p className="mt-2 font-display text-lg">{item.industry}</p>
          </div>
          <div>
            <span className="label text-ink-soft">Tech Stack</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-3 py-1 text-xs"
                  style={{ borderColor: "var(--case-accent)", color: "var(--case-accent)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="label text-ink-soft">Scope of Work</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.scopeOfWork.map((s) => (
                <span
                  key={s}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{ backgroundColor: "var(--case-accent-soft)", color: "var(--case-accent)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal-fade">
          <span className="label text-ink-soft">Overview</span>
          <p className="mt-3 max-w-[42rem] font-display text-xl leading-relaxed md:text-2xl">
            {item.overview}
          </p>
        </div>
      </div>

      {/* requirements */}
      <section className="mt-20 px-[var(--gutter)] md:mt-28">
        <div className="grid gap-6 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-16">
          <span className="reveal-fade label text-ink-soft">Requirements</span>
          <ul className="reveal-fade flex flex-col gap-4">
            {item.requirements.map((req) => (
              <li key={req} className="flex gap-4 border-t border-ink/15 pt-4 text-base leading-relaxed md:text-lg">
                <Asterisk className="mt-1 h-4 w-4 shrink-0" style={{ color: "var(--case-accent)" }} />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* solution */}
      <section className="mt-20 px-[var(--gutter)] md:mt-28">
        <div className="grid gap-6 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-16">
          <span className="reveal-fade label text-ink-soft">Solution</span>
          <ul className="reveal-fade flex flex-col gap-4">
            {item.solution.map((sol) => (
              <li key={sol} className="flex gap-4 border-t border-ink/15 pt-4 text-base leading-relaxed md:text-lg">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--case-accent)" }}
                />
                <span>{sol}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* mini gallery — same generated art, reframed */}
      <section className="mt-20 grid grid-cols-1 gap-4 px-[var(--gutter)] sm:grid-cols-2 md:mt-28">
        <div className="reveal-fade case-media aspect-[4/3] overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(item.image)}
            alt=""
            aria-hidden
            style={{ transform: "scale(1.25)", objectPosition: "20% 30%" }}
          />
        </div>
        <div className="reveal-fade case-media aspect-[4/3] overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(item.image)}
            alt=""
            aria-hidden
            style={{ transform: "scale(1.25)", objectPosition: "80% 70%" }}
          />
        </div>
      </section>

      {/* next case */}
      <section className="mt-24 border-t border-ink/15 px-[var(--gutter)] py-14 md:mt-32 md:py-20">
        <span className="reveal-fade label text-ink-soft">Next case</span>
        <Link
          href={`/work/${next.slug}`}
          className="group mt-4 flex items-baseline justify-between gap-6"
          data-cursor="view"
        >
          <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[0.9] transition-transform duration-500 group-hover:translate-x-2">
            {next.title[0]} <span className="font-display-wonk normal-case">{next.title[1]}</span>
          </h2>
          <span className="pill shrink-0" aria-hidden>
            View <span aria-hidden>→</span>
          </span>
        </Link>
      </section>
    </article>
  );
}
