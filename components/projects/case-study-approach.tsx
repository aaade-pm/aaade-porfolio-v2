import type { ProjectApproachStep } from "@/types/sanity";

type Props = {
  steps: ProjectApproachStep[];
};

export function CaseStudyApproach({ steps }: Props) {
  if (!steps.length) return null;

  return (
    <section className="bg-zinc-900/30 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-20 text-center text-xs font-bold tracking-[0.5em] text-primary uppercase">
          The Approach
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={`${step.title}-${i}`}
              className="animate-fade-up rounded-3xl border border-zinc-800 bg-background p-10 transition-colors hover:border-primary/30"
            >
              <span className="mb-8 block font-display text-5xl font-bold text-zinc-800">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <h3 className="font-display mb-4 text-2xl font-bold">
                {step.title}
              </h3>
              {step.body ? (
                <p className="text-sm leading-relaxed text-zinc-500">
                  {step.body}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
