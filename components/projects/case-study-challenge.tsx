import { cn } from "@/lib/utils";
import type { ProjectDetail } from "@/types/sanity";

type Props = {
  project: ProjectDetail;
};

function ChallengeHeading({ text }: { text: string }) {
  const idx = text.indexOf(":");
  if (idx === -1) {
    return <>{text}</>;
  }
  return (
    <>
      {text.slice(0, idx + 1)}
      <br />
      <span className="text-primary">{text.slice(idx + 1).trim()}</span>
    </>
  );
}

export function CaseStudyChallenge({ project }: Props) {
  if (!project.challengeTitle && !project.overview && !project.problem) {
    return null;
  }

  const title = project.challengeTitle ?? "The challenge";

  return (
    <section className="px-6 py-32 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-12 md:gap-24">
        <div className="md:col-span-5">
          <div className="sticky top-28 md:top-32">
            <h2 className="animate-fade-up mb-8 font-display text-4xl leading-tight font-bold md:text-5xl">
              <ChallengeHeading text={title} />
            </h2>
            <div className="h-1 w-24 bg-primary" aria-hidden />
          </div>
        </div>
        <div
          className={cn(
            "md:col-span-7 space-y-12 text-lg leading-relaxed text-zinc-400 md:text-xl",
          )}
        >
          {project.overview ? (
            <div className="animate-fade-up">
              <h4 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">
                Overview
              </h4>
              <p>{project.overview}</p>
            </div>
          ) : null}
          {project.problem ? (
            <div className="animate-fade-up">
              <h4 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">
                The Problem
              </h4>
              <p>{project.problem}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
