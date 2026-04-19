import Link from "next/link";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SlideUp } from "@/components/ui/slide-up";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { Text } from "@/components/ui/text";

export default function HomePage() {
  return (
    <>
      <Section size="lg" className="border-b border-border bg-surface">
        <Container>
          <SlideUp>
            <Heading level={1} className="max-w-2xl">
              Designer & developer building thoughtful digital experiences.
            </Heading>
            <Text size="lg" muted className="mt-6 max-w-xl">
              Portfolio, writing, and a living gallery — olive-toned,
              dark-first, and motion-rich.
            </Text>
          </SlideUp>
        </Container>
      </Section>

      <Section>
        <Container>
          <FadeIn>
            <Heading level={2}>Featured work</Heading>
            <Text muted className="mt-2 max-w-2xl">
              Case studies and product work will appear here from Sanity.
            </Text>
          </FadeIn>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
            <StaggerItem className="rounded-xl border border-border bg-surface-elevated p-6">
              <Heading level={3} as="h3">
                Projects
              </Heading>
              <Text muted className="mt-2">
                Explore case studies, tech stack, and links to live sites.
              </Text>
              <Link
                href="/projects"
                className="mt-4 inline-block text-sm font-medium text-olive-400 no-underline hover:text-olive-300"
              >
                View projects →
              </Link>
            </StaggerItem>
            <StaggerItem className="rounded-xl border border-border bg-surface-elevated p-6">
              <Heading level={3} as="h3">
                Blog
              </Heading>
              <Text muted className="mt-2">
                Long-form notes, tutorials, and essays — ready for a subdomain.
              </Text>
              <Link
                href="/blog"
                className="mt-4 inline-block text-sm font-medium text-olive-400 no-underline hover:text-olive-300"
              >
                Read the blog →
              </Link>
            </StaggerItem>
          </Stagger>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface">
        <Container>
          <FadeIn>
            <Heading level={2}>Life gallery</Heading>
            <Text muted className="mt-2">
              Moments with captions, powered by Sanity assets.
            </Text>
            <Link
              href="/gallery"
              className="mt-4 inline-block text-sm font-medium text-olive-400 no-underline hover:text-olive-300"
            >
              Open gallery →
            </Link>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
