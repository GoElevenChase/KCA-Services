"use client";

import { useEffect, useRef } from "react";

export type Effect = "up" | "left" | "right" | "zoom" | "fade" | "wipe-l" | "wipe-r" | "wipe-up";
export interface Rule {
  /** CSS selector for the elements to animate when they scroll into view. */
  readonly sel: string;
  readonly fx?: Effect;
  /** Delay in ms added per sibling that matches the same selector. */
  readonly stagger?: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Scroll-driven motion for a page: reveal-on-scroll, parallax, count-up numbers,
 * a scroll progress bar and magnetic buttons. It only adds attributes after
 * hydration, so the static HTML stays fully visible without JavaScript, and it
 * does nothing when the visitor prefers reduced motion.
 */
export function Motion({ rules, parallax = [] }: { rules: readonly Rule[]; parallax?: readonly string[] }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("js-motion");
    const cleanups: Array<() => void> = [];

    // Reveal on scroll
    const targets: HTMLElement[] = [];
    for (const rule of rules) {
      const counts = new Map<Element | null, number>();
      document.querySelectorAll<HTMLElement>(rule.sel).forEach(el => {
        const parent = el.parentElement;
        const index = counts.get(parent) ?? 0;
        counts.set(parent, index + 1);
        el.dataset.fx = rule.fx ?? "up";
        el.style.setProperty("--d", `${Math.min(index, 8) * (rule.stagger ?? 0)}ms`);
        targets.push(el);
      });
    }
    const countUps = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const watcher = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add("is-in");
        watcher.unobserve(el);
        // Once revealed, drop the entrance delay so hover transitions feel instant.
        window.setTimeout(() => el.style.setProperty("--d", "0ms"), 1800);
        if (el.dataset.count) runCount(el);
      }
    }, { threshold: 0.05, rootMargin: "0px 0px 8% 0px" });
    targets.forEach(el => watcher.observe(el));
    countUps.forEach(el => { el.dataset.fx ??= "fade"; watcher.observe(el); });
    cleanups.push(() => watcher.disconnect());
    // Never leave content hidden if something goes wrong.
    const safety = window.setTimeout(() => targets.forEach(el => el.classList.add("is-in")), 6000);
    cleanups.push(() => window.clearTimeout(safety));

    // Parallax, header state, progress
    const layers = parallax.flatMap(sel => Array.from(document.querySelectorAll<HTMLElement>(sel)));
    const header = document.querySelector<HTMLElement>(".site-header");
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("--p", String(max > 0 ? clamp(y / max, 0, 1) : 0));
      header?.classList.toggle("is-scrolled", y > 24);
      for (const layer of layers) {
        const rect = layer.parentElement!.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) continue;
        const offset = clamp((rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight, -0.7, 0.7);
        layer.style.setProperty("--py", `${(offset * -40).toFixed(1)}px`);
      }
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); });

    // Magnetic buttons (fine pointers only)
    if (window.matchMedia("(pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>(".header-cta, .one-button, .two-button, .form-submit, .choice-go").forEach(button => {
        const move = (event: PointerEvent) => {
          const rect = button.getBoundingClientRect();
          const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
          const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
          button.style.setProperty("--mx", `${(x * 10).toFixed(1)}px`);
          button.style.setProperty("--my", `${(y * 8).toFixed(1)}px`);
        };
        const leave = () => { button.style.setProperty("--mx", "0px"); button.style.setProperty("--my", "0px"); };
        button.addEventListener("pointermove", move);
        button.addEventListener("pointerleave", leave);
        cleanups.push(() => { button.removeEventListener("pointermove", move); button.removeEventListener("pointerleave", leave); });
      });
    }

    return () => cleanups.forEach(fn => fn());
  }, [rules, parallax]);

  return <div className="scroll-progress" ref={bar} aria-hidden="true"><i /></div>;
}

function runCount(el: HTMLElement) {
  const end = Number(el.dataset.count);
  if (!Number.isFinite(end)) return;
  const start = Number(el.dataset.from ?? 0);
  const began = performance.now();
  const duration = 1800;
  const tick = (now: number) => {
    const t = clamp((now - began) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = String(Math.round(start + (end - start) * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
