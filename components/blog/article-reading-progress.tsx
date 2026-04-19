"use client";

import { useSyncExternalStore } from "react";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function getScrollPct() {
  const el = document.documentElement;
  const height = el.scrollHeight - el.clientHeight;
  if (height <= 0) return 0;
  return (el.scrollTop / height) * 100;
}

export function ArticleReadingProgress() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );

  const widthPct = useSyncExternalStore(
    subscribeScroll,
    getScrollPct,
    () => 0,
  );

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 right-0 left-0 z-[100] h-[3px] bg-zinc-900"
      aria-hidden
    >
      <div
        className="h-full bg-primary transition-[width] duration-100 ease-out"
        style={{ width: `${widthPct}%` }}
      />
    </div>
  );
}
