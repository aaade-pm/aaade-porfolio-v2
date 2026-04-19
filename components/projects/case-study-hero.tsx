import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProjectDetail } from "@/types/sanity";

type Props = {
  project: ProjectDetail;
  heroImageUrl: string | null;
  heroAlt: string;
};

function splitTitle(title: string, accent: string | null) {
  if (!accent || !title.includes(accent)) {
    return { head: title.toUpperCase(), accent: null as string | null };
  }
  const i = title.indexOf(accent);
  const head = title.slice(0, i).trim();
  return { head: head.toUpperCase(), accent };
}

export function CaseStudyHero({ project, heroImageUrl, heroAlt }: Props) {
  const { head, accent } = splitTitle(project.title, project.titleAccent);
  const eyebrow =
    project.caseStudyEyebrow ??
    (project.year != null ? `Case Study / ${project.year}` : "Case Study");

  return (
    <header className="px-6 pt-40 pb-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="animate-fade-up mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <span className="mb-4 block text-xs font-bold tracking-[0.5em] text-primary uppercase">
              {eyebrow}
            </span>
            <h1 className="font-display text-6xl leading-[0.85] font-bold tracking-tighter uppercase md:text-[10vw]">
              {head}
              {accent ? (
                <>
                  {" "}
                  <span className="text-zinc-600 italic">{accent}</span>
                </>
              ) : null}
            </h1>
            {project.description && !project.overview ? (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
                {project.description}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl ? (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all hover:scale-105 hover:bg-primary/90"
              >
                Live Website
                <ExternalLink className="size-4" aria-hidden />
              </Link>
            ) : null}
            {project.githubUrl ? (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded-full border border-zinc-800 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors hover:border-primary/50",
                  !project.liveUrl && "bg-primary text-white hover:bg-primary/90",
                )}
              >
                GitHub
              </Link>
            ) : null}
          </div>
        </div>

        {heroImageUrl ? (
          <div className="animate-fade-up relative aspect-[16/7] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={heroImageUrl}
              alt={heroAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1280px"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"
              aria-hidden
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
