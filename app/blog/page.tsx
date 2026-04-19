import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { getPosts } from "@/lib/sanity";

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <Section>
      <Container>
        <Heading level={1}>Blog</Heading>
        <Text muted className="mt-2">
          Articles and notes from the studio.
        </Text>

        {!posts.length ? (
          <Text muted className="mt-10">
            No posts yet. Add content in Sanity Studio or configure{" "}
            <code className="rounded bg-surface-elevated px-1.5 py-0.5 text-sm text-foreground">
              .env.local
            </code>
            .
          </Text>
        ) : (
          <ul className="mt-10 space-y-6">
            {posts.map((post) => (
              <li
                key={post._id}
                className="border-b border-border pb-6 last:border-0"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block no-underline"
                >
                  <span className="text-lg font-medium text-foreground group-hover:text-olive-400">
                    {post.title}
                  </span>
                  <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted">
                    {post.publishedAt ? (
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                    ) : null}
                    {post.category ? <span>{post.category}</span> : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
