import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseStudyApproach } from "@/components/projects/case-study-approach";
import { CaseStudyChallenge } from "@/components/projects/case-study-challenge";
import { CaseStudyFooterCta } from "@/components/projects/case-study-footer-cta";
import { CaseStudyGalleryRail } from "@/components/projects/case-study-gallery-rail";
import { CaseStudyHero } from "@/components/projects/case-study-hero";
import { CaseStudyMetaStrip } from "@/components/projects/case-study-meta-strip";
import { CaseStudyOutcomes } from "@/components/projects/case-study-outcomes";
import { RichText } from "@/components/portable-text";
import { GrainOverlay } from "@/components/sections/grain-overlay";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import {
  getNextProjectBySlug,
  getProjectBySlug,
  urlForImage,
} from "@/lib/sanity";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project" };

  const firstImage = project.images?.[0];
  const ogImage = firstImage
    ? urlForImage(firstImage)?.width(1200).height(630).url()
    : undefined;

  return {
    title: project.title,
    description: project.description ?? undefined,
    openGraph: ogImage
      ? {
          images: [{ url: ogImage, alt: firstImage?.alt ?? project.title }],
        }
      : undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const firstImage = project.images?.[0];
  const heroUrl = firstImage
    ? urlForImage(firstImage)?.width(1600).height(900).url()
    : null;

  const stackDisplay =
    project.stackSummary?.trim() ||
    (project.techStack?.length ? project.techStack.join(", ") : null);

  const hasStructuredCaseStudy =
    project.role ||
    project.context ||
    project.timeline ||
    stackDisplay ||
    project.challengeTitle ||
    project.overview ||
    project.problem ||
    (project.approachSteps?.length ?? 0) > 0 ||
    (project.outcomes?.length ?? 0) > 0 ||
    (project.lessons?.length ?? 0) > 0;

  const nextProject = await getNextProjectBySlug(slug);

  if (!hasStructuredCaseStudy) {
    return (
      <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
        <GrainOverlay />
        <article>
          <Section className="border-b border-border pb-8">
            <Container className="max-w-3xl">
              <Heading level={1}>{project.title}</Heading>
              {project.description ? (
                <Text muted className="mt-4">
                  {project.description}
                </Text>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                {project.liveUrl ? (
                  <Link
                    href={project.liveUrl}
                    className="font-medium text-olive-400 no-underline hover:text-olive-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live site
                  </Link>
                ) : null}
                {project.githubUrl ? (
                  <Link
                    href={project.githubUrl}
                    className="font-medium text-olive-400 no-underline hover:text-olive-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Link>
                ) : null}
              </div>
              {project.techStack?.length ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Container>
          </Section>

          {heroUrl ? (
            <div className="border-b border-border bg-surface py-8">
              <Container>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
                  <Image
                    src={heroUrl}
                    alt={firstImage?.alt ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                    priority
                  />
                </div>
              </Container>
            </div>
          ) : null}

          <Section>
            <Container className="max-w-3xl">
              <Heading level={2} as="h2">
                Case study
              </Heading>
              <RichText
                value={project.caseStudy ?? []}
                className="mt-6"
                tone="caseStudy"
              />
            </Container>
          </Section>
        </article>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <GrainOverlay />
      <article>
        <CaseStudyHero
          project={project}
          heroImageUrl={heroUrl ?? null}
          heroAlt={firstImage?.alt ?? project.title}
        />
        <CaseStudyMetaStrip project={project} stackDisplay={stackDisplay} />
        <CaseStudyChallenge project={project} />
        <CaseStudyApproach steps={project.approachSteps ?? []} />
        {project.images?.length ? (
          <CaseStudyGalleryRail images={project.images} skipFirst />
        ) : null}
        <CaseStudyOutcomes
          outcomes={project.outcomes}
          lessons={project.lessons}
          attribution={project.lessonsAttribution}
          attributionRole={project.lessonsAttributionRole}
        />
        {project.caseStudy?.length ? (
          <Section className="px-6 md:px-12">
            <div className="mx-auto max-w-3xl">
              <RichText value={project.caseStudy} tone="caseStudy" />
            </div>
          </Section>
        ) : null}
        <CaseStudyFooterCta nextProject={nextProject} />
      </article>
    </div>
  );
}
