import type { ProjectOutcomeStat } from "@/types/sanity";

type Props = {
  outcomes: ProjectOutcomeStat[] | null;
  lessons: string[] | null;
  attribution: string | null;
  attributionRole: string | null;
};

export function CaseStudyOutcomes({
  outcomes,
  lessons,
  attribution,
  attributionRole,
}: Props) {
  const hasOutcomes = Boolean(outcomes?.length);
  const hasLessonsColumn = Boolean(
    lessons?.length || attribution || attributionRole,
  );

  if (!hasOutcomes && !hasLessonsColumn) {
    return null;
  }

  return (
    <section className="border-y border-primary/10 bg-primary/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-24 md:flex-row md:gap-24">
          {hasOutcomes ? (
            <div className="animate-fade-up flex-1">
              <h3 className="mb-8 text-xs font-bold tracking-[0.5em] text-primary uppercase">
                The Outcome
              </h3>
              <div className="space-y-12">
                {outcomes!.map((o) => (
                  <div key={`${o.value}-${o.label}`} className="flex gap-8">
                    <div className="font-display text-5xl font-bold text-white">
                      {o.value}
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-bold">{o.label}</h4>
                      {o.description ? (
                        <p className="text-sm text-zinc-500">{o.description}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {hasLessonsColumn ? (
            <div className="animate-fade-up flex-1">
              {lessons?.length ? (
                <>
                  <h3 className="mb-8 text-xs font-bold tracking-[0.5em] text-zinc-600 uppercase">
                    Lessons Learned
                  </h3>
                  <div className="space-y-6 leading-relaxed text-zinc-400">
                    {lessons.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </>
              ) : null}
              {attribution || attributionRole ? (
                <div className="pt-8">
                  {attribution ? (
                    <h4 className="mb-2 font-bold text-white">{attribution}</h4>
                  ) : null}
                  {attributionRole ? (
                    <p className="text-xs tracking-widest text-primary uppercase">
                      {attributionRole}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
