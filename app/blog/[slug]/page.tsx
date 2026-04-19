import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RichText } from "@/components/portable-text";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { getPostBySlug, urlForImage } from "@/lib/sanity";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.category ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const coverUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1600).height(900).url()
    : null;

  return (
    <article>
      <Section className="border-b border-border pb-8">
        <Container className="max-w-3xl">
          <Text size="sm" muted>
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : null}
            {post.category ? ` · ${post.category}` : ""}
          </Text>
          <Heading level={1} className="mt-4">
            {post.title}
          </Heading>
        </Container>
      </Section>

      {coverUrl ? (
        <div className="border-b border-border bg-surface py-8">
          <Container>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
              <Image
                src={coverUrl}
                alt={post.coverImage?.alt ?? ""}
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
          <RichText value={post.content ?? []} />
        </Container>
      </Section>
    </article>
  );
}
