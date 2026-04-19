import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { urlForImage } from "@/lib/sanity";
import type { ProjectListItem } from "@/types/sanity";

type Props = {
  projects: ProjectListItem[];
  workTitle: string;
  featuredEmptyMessage: string;
  liveLabel: string;
  caseStudyLabel: string;
};

export function FeaturedWorkSection({
  projects,
  workTitle,
  featuredEmptyMessage,
  liveLabel,
  caseStudyLabel,
}: Props) {
  const countLabel = String(projects.length || 0).padStart(2, "0");

  return (
    <Container className="max-w-7xl">
      <div className="mb-16 flex items-center gap-4 md:mb-20">
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
          {workTitle}
        </h2>
        <div className="mt-2 h-px flex-1 bg-zinc-800" />
        <span className="font-display text-2xl text-primary">
          {countLabel}
        </span>
      </div>

      {projects.length === 0 ? (
        <p className="whitespace-pre-line text-zinc-500">{featuredEmptyMessage}</p>
      ) : (
        <div className="space-y-0">
          {projects.map((project, index) => {
            const n = String(index + 1).padStart(2, "0");
            const label = project.category
              ? `${n} / ${project.category.toUpperCase()}`
              : `${n}`;
            const preview = project.images?.[0];
            const previewUrl = preview
              ? urlForImage(preview)?.width(900).height(506).url()
              : null;

            return (
              <div
                key={project._id}
                className="project-row group relative flex cursor-pointer flex-col justify-between gap-8 overflow-hidden border-b border-zinc-800 py-12 transition-all duration-500 md:flex-row md:items-center md:py-20"
              >
                <div className="project-hover-title relative z-10 transition-all duration-500">
                  <span className="mb-2 block font-mono text-sm text-zinc-600">
                    {label}
                  </span>
                  <h3 className="font-display text-4xl font-bold uppercase tracking-tighter md:text-7xl">
                    {project.title}
                  </h3>
                  {project.techStack?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-zinc-800 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="relative z-10 max-w-sm md:mt-0 md:text-right">
                  {project.description ? (
                    <p className="mb-6 text-sm leading-relaxed text-zinc-500">
                      {project.description}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap gap-6 md:justify-end">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-underline text-xs font-bold tracking-widest text-white uppercase"
                      >
                        {liveLabel}
                      </a>
                    ) : null}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-bold tracking-widest text-primary uppercase no-underline hover:underline"
                    >
                      {caseStudyLabel}
                    </Link>
                  </div>
                </div>

                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt={preview?.alt ?? `${project.title} preview`}
                    width={900}
                    height={506}
                    sizes="(max-width: 768px) 256px, 384px"
                    className="project-hover-image absolute top-1/2 left-1/2 z-0 aspect-video w-64 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-xl object-cover md:w-96"
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
