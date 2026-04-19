import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RichText } from "@/components/portable-text";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { getProjectBySlug, urlForImage } from "@/lib/sanity";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description ?? undefined,
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

  return (
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
          <RichText value={project.caseStudy ?? []} className="mt-6" />
        </Container>
      </Section>
    </article>
  );
}
