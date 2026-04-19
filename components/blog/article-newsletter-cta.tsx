"use client";

import type { FormEvent } from "react";

/**
 * Placeholder — wire to a provider or replace with a link to your form.
 */
export function ArticleNewsletterCta() {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="px-6 pb-40 md:px-12" aria-labelledby="article-newsletter-heading">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-primary px-8 py-16 text-center md:p-24">
        <div
          className="pointer-events-none absolute top-0 right-0 size-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <h2
          id="article-newsletter-heading"
          className="relative z-10 mb-6 font-display text-4xl font-bold tracking-tight text-white md:text-6xl"
        >
          Get the latest experiments
          <br />
          in your inbox.
        </h2>
        <p className="relative z-10 mx-auto mb-10 max-w-md text-lg text-white/80">
          Join the list for creative coding, system design, and build notes — no
          spam.
        </p>
        <form
          className="relative z-10 mx-auto flex max-w-md flex-col gap-4 md:flex-row"
          onSubmit={onSubmit}
        >
          <label htmlFor="article-newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="article-newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="your@email.com"
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:ring-2 focus:ring-white/30 focus:outline-none"
          />
          <button
            type="submit"
            className="font-display rounded-full bg-white px-8 py-4 text-sm font-bold text-primary shadow-xl transition-transform hover:scale-105"
          >
            Subscribe
          </button>
        </form>
        <p className="relative z-10 mt-6 text-xs tracking-widest text-white/40 uppercase">
          Placeholder form — connect in Studio or your ESP when ready.
        </p>
      </div>
    </section>
  );
}
