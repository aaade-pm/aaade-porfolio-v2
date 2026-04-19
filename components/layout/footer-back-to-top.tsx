"use client";

import { ArrowUp } from "lucide-react";

export function FooterBackToTop() {
  return (
    <button
      type="button"
      id="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
    >
      <ArrowUp
        className="h-5 w-5 transition-transform group-hover:-translate-y-0.5"
        aria-hidden
      />
    </button>
  );
}
