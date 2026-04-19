import { RichText } from "@/components/portable-text";
import { Container } from "@/components/ui/container";
import type { SiteSettingsResolved } from "@/types/site-settings";

type Props = {
  settings: SiteSettingsResolved;
};

export function AboutSection({ settings }: Props) {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-black px-6 py-24 md:px-12 md:py-32"
    >
      <Container className="max-w-7xl">
        <div className="flex flex-col gap-16 md:flex-row md:gap-20 lg:gap-24">
          <div className="w-full md:w-1/2">
            <h2 className="mb-8 text-xs font-bold tracking-[0.4em] text-primary uppercase">
              {settings.aboutEyebrow}
            </h2>
            {settings.aboutBody?.length ? (
              <RichText value={settings.aboutBody} tone="about" />
            ) : (
              <div className="font-display space-y-8">
                <p className="text-2xl leading-tight text-white md:text-3xl lg:text-4xl">
                  I&apos;m a{" "}
                  <span className="font-medium text-white">
                    Frontend Engineer
                  </span>{" "}
                  who believes code should be as expressive as it is functional.
                </p>
                <p className="text-xl leading-relaxed text-zinc-400 md:text-2xl md:leading-relaxed lg:text-3xl">
                  My journey began with a curiosity for how things look, which
                  quickly evolved into an obsession with how they{" "}
                  <em className="text-zinc-300 italic">feel</em>{" "}
                  under a user&apos;s cursor.
                </p>
                <p className="text-xl leading-relaxed text-zinc-400 md:text-2xl md:leading-relaxed lg:text-3xl">
                  I build robust systems with modern tech, always leaving room
                  for that little bit of magic {"\u2728"} that makes a project
                  memorable.
                </p>
              </div>
            )}
          </div>

          <div className="flex w-full flex-col justify-between gap-16 md:w-1/2 md:gap-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
              <div>
                <h3 className="mb-4 text-xs font-bold tracking-[0.25em] text-primary uppercase">
                  {settings.aboutCoreStackTitle}
                </h3>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {settings.aboutCoreStack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-xs font-bold tracking-[0.25em] text-primary uppercase">
                  {settings.aboutInterestsTitle}
                </h3>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {settings.aboutInterests.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-8">
              <p className="mb-4 text-sm leading-relaxed text-zinc-400 italic md:text-base">
                &ldquo;{settings.aboutQuote}&rdquo;
              </p>
              <p className="text-right text-xs font-medium tracking-[0.2em] text-zinc-600 uppercase">
                {settings.aboutQuoteAttribution}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
