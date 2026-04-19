import Link from "next/link";

type Props = {
  nextProject: { slug: string; title: string } | null;
};

export function CaseStudyFooterCta({ nextProject }: Props) {
  return (
    <section className="px-6 py-40 text-center md:px-12">
      <div className="animate-fade-up mx-auto max-w-3xl">
        <h2 className="font-display mb-12 text-4xl font-bold md:text-6xl">
          Loved this? <br />
          <span className="text-zinc-600">Explore more work.</span>
        </h2>
        <div className="flex flex-col justify-center gap-6 md:flex-row">
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="rounded-full border border-zinc-800 bg-zinc-900 px-10 py-5 text-xs font-bold tracking-widest uppercase transition-all hover:border-primary"
            >
              Next: {nextProject.title}
            </Link>
          ) : null}
          <Link
            href="/work"
            className="rounded-full bg-primary px-10 py-5 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-primary/90"
          >
            Back to work
          </Link>
        </div>
      </div>
    </section>
  );
}
