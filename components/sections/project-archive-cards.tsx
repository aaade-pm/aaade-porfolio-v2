import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/lib/sanity";
import type { ProjectListItem } from "@/types/sanity";

type Props = {
  projects: ProjectListItem[];
  emptyMessage: string;
  caseStudyLinkLabel: string;
};

export function ProjectArchiveCards({
  projects,
  emptyMessage,
  caseStudyLinkLabel,
}: Props) {
  if (!projects.length) {
    return (
      <p className="whitespace-pre-line py-12 text-center text-zinc-500">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {projects.map((project) => {
        const img = project.images?.[0];
        const src = img ? urlForImage(img)?.width(600).height(338).url() : null;
        const yearLabel =
          project.year != null ? String(project.year) : undefined;

        return (
          <div
            key={project._id}
            className="group rounded-3xl border border-zinc-800/50 bg-black/30 p-6 transition-colors hover:border-primary/50"
          >
            <div className="mb-6 aspect-video overflow-hidden rounded-xl bg-zinc-800">
              {src ? (
                <Image
                  src={src}
                  alt={img?.alt ?? project.title}
                  width={600}
                  height={338}
                  className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
                />
              ) : null}
            </div>
            <div className="mb-2 flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-bold">{project.title}</h3>
              {yearLabel ? (
                <span className="shrink-0 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
                  {yearLabel}
                </span>
              ) : null}
            </div>
            {project.description ? (
              <p className="mb-4 text-sm text-zinc-500">{project.description}</p>
            ) : null}
            {project.techStack?.length ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-zinc-800 px-2 py-1 text-[9px] tracking-widest text-zinc-400 uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs font-bold tracking-widest text-primary uppercase no-underline hover:underline"
            >
              {caseStudyLinkLabel}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
