import type { ProjectDetail } from "@/types/sanity";

type Props = {
  project: ProjectDetail;
  stackDisplay: string | null;
};

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="animate-fade-up">
      <h4 className="mb-2 text-xs tracking-widest text-zinc-600 uppercase">
        {label}
      </h4>
      <p className="text-zinc-200">{value}</p>
    </div>
  );
}

export function CaseStudyMetaStrip({ project, stackDisplay }: Props) {
  if (!project.role && !project.context && !project.timeline && !stackDisplay) {
    return null;
  }

  return (
    <section className="px-6 pb-32 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 border-y border-zinc-800 py-12 md:grid-cols-4">
        {project.role ? <MetaCell label="Role" value={project.role} /> : null}
        {project.context ? (
          <MetaCell label="Context" value={project.context} />
        ) : null}
        {project.timeline ? (
          <MetaCell label="Timeline" value={project.timeline} />
        ) : null}
        {stackDisplay ? <MetaCell label="Stack" value={stackDisplay} /> : null}
      </div>
    </section>
  );
}
