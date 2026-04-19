import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { getProjects } from "@/lib/sanity";

export default async function ProjectsIndexPage() {
  const projects = await getProjects();

  return (
    <Section>
      <Container>
        <Heading level={1}>Projects</Heading>
        <Text muted className="mt-2">
          Case studies, experiments, and client work.
        </Text>

        {!projects.length ? (
          <Text muted className="mt-10">
            No projects yet. Publish documents in Sanity or set environment
            variables.
          </Text>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project._id}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="block rounded-xl border border-border bg-surface-elevated p-6 no-underline transition-colors hover:border-olive-700"
                >
                  <span className="text-lg font-medium text-foreground">
                    {project.title}
                  </span>
                  {project.description ? (
                    <Text muted className="mt-2">
                      {project.description}
                    </Text>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
