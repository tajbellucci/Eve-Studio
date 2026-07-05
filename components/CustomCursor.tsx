"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type CursorState = "default" | "view" | "play" | "link" | "hidden";

/**
 * Circular custom cursor.
 * Elements opt in via `data-cursor="view" | "play" | "link"`.
 * Elements with `data-magnetic` pull themselves toward the pointer.
 *
 * The dot/ring are always mounted (just invisible at opacity 0) so their
 * refs are valid the moment this component's effect runs — gating the
 * whole subtree behind a "should I even render this" state flag meant
 * gsap.quickTo captured `null` targets on first mount and never recovered,
 * even after the real elements showed up later.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("hidden");

  useEffect(() => {
    // Don't trust static (pointer: fine) media queries to gate this — plenty of
    // real mouse-equipped laptops (touchscreen hybrids, some trackpad/browser
    // combos) report `coarse` and would silently disable the cursor forever.
    // Instead react to genuine input: show on the first real mousemove, hide
    // for good the moment a touch event proves this is a touch session.
    let isTouch = false;
    let current: CursorState = "default";

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      if (isTouch) return;
      if (!document.body.dataset.customCursor) {
        document.body.dataset.customCursor = "true";
      }

      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const next = (target?.dataset.cursor as CursorState) ?? "default";
      if (next !== current) {
        current = next;
        setState(next);
      } else if (current === "hidden") {
        // first-ever move: reveal the cursor even if it hasn't crossed a target
        current = "default";
        setState("default");
      }
    };

    const onTouchStart = () => {
      isTouch = true;
      delete document.body.dataset.customCursor;
      current = "hidden";
      setState("hidden");
    };

    const onLeave = () => setState("hidden");
    const onEnter = () => {
      if (!isTouch) setState(current);
    };

    // magnetic pull for tagged elements
    const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups = magnets.map((m) => {
      const xTo = gsap.quickTo(m, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(m, "y", { duration: 0.4, ease: "power3.out" });
      const move = (e: MouseEvent) => {
        const r = m.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const reset = () => {
        xTo(0);
        yTo(0);
      };
      m.addEventListener("mousemove", move);
      m.addEventListener("mouseleave", reset);
      return () => {
        m.removeEventListener("mousemove", move);
        m.removeEventListener("mouseleave", reset);
      };
    });

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cleanups.forEach((fn) => fn());
      delete document.body.dataset.customCursor;
    };
  }, []);

  useEffect(() => {
    const ring = ringRef.current!;
    const dot = dotRef.current!;
    const big = state === "view" || state === "play";

    gsap.to(ring, {
      width: big ? 92 : state === "link" ? 48 : 32,
      height: big ? 92 : state === "link" ? 48 : 32,
      backgroundColor: big ? "rgba(19,18,16,0.92)" : "rgba(19,18,16,0)",
      borderColor: big ? "rgba(19,18,16,0)" : "rgba(19,18,16,0.65)",
      opacity: state === "hidden" ? 0 : 1,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(dot, {
      opacity: state === "hidden" || big ? 0 : 1,
      scale: state === "link" ? 0.5 : 1,
      duration: 0.3,
    });
  }, [state]);

  return (
    <>
      <div
        ref={ringRef}
        data-cursor-ring
        className="pointer-events-none fixed left-0 top-0 z-[95] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border opacity-0"
        style={{ borderColor: "rgba(19,18,16,0.65)" }}
        aria-hidden
      >
        <span
          className="label text-ivory transition-opacity duration-300"
          style={{ opacity: state === "view" || state === "play" ? 1 : 0, letterSpacing: "0.14em" }}
        >
          {state === "play" ? "play" : "view"}
        </span>
      </div>
      <div
        ref={dotRef}
        data-cursor-dot
        className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink opacity-0"
        aria-hidden
      />
    </>
  );
}
