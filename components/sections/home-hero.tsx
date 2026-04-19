import Link from "next/link";

import { RichText } from "@/components/portable-text";
import { LagosClock } from "@/components/sections/lagos-clock";
import { Container } from "@/components/ui/container";
import type { SiteSettingsResolved } from "@/types/site-settings";

type Props = {
  settings: SiteSettingsResolved;
};

export function HomeHero({ settings }: Props) {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 pb-32 md:px-12 md:pt-28">
      <Container className="max-w-7xl">
        <div className="mb-8 flex animate-fade-up flex-col md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500 md:mb-0">
            {settings.heroLocationPrefix}{" "}
            <span className="text-zinc-200">{settings.heroLocationName}</span>
            <LagosClock timeZone={settings.heroTimezone} />
          </div>
          <div className="hidden text-right md:block">
            <span className="text-xs uppercase tracking-widest text-zinc-500">
              {settings.heroAvailability}
            </span>
          </div>
        </div>

        <div className="group relative">
          <h1 className="animate-fade-up font-display text-[14vw] font-extrabold leading-[0.85] tracking-tighter delay-100 [animation-delay:100ms] transition-all duration-700 md:text-[11vw] md:group-hover:italic">
            {settings.heroLine1}
            <br />
            <span className="text-primary">{settings.heroLine2}</span>
          </h1>
          <div className="absolute -top-6 -right-4 flex h-28 w-28 animate-pulse items-center justify-center rounded-full border border-primary/30 md:-top-10 md:-right-10 md:h-44 md:w-44">
            <span className="text-center text-[10px] uppercase leading-tight tracking-widest text-zinc-400 md:text-xs">
              {settings.heroBadgeLine1}
              <br />
              {settings.heroBadgeLine2}
            </span>
          </div>
        </div>

        <div className="animate-fade-up mt-10 max-w-xl delay-200 [animation-delay:200ms] md:mt-12">
          {settings.heroIntro?.length ? (
            <RichText value={settings.heroIntro} tone="hero" />
          ) : (
            <p className="text-lg font-light leading-relaxed text-zinc-400 md:text-xl">
              Hi, I&apos;m{" "}
              <span className="font-medium text-white">Olatunji Ademola</span>. I
              build digital interfaces that are fast, accessible, and visually
              striking. Crafting seamless user experiences through{" "}
              <Link
                href="/blog"
                className="font-medium text-primary no-underline hover:underline"
              >
                clean code
              </Link>{" "}
              and bold aesthetics.
            </p>
          )}
        </div>
      </Container>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-600">
          {settings.heroScrollLabel}
        </span>
        <div className="relative h-12 w-px overflow-hidden bg-zinc-800">
          <div className="absolute top-0 left-0 h-1/2 w-full bg-primary" />
        </div>
      </div>
    </section>
  );
}
