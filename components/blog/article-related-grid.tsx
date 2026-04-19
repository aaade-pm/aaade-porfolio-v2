import Image from "next/image";
import Link from "next/link";

import type { PostListItem } from "@/types/sanity";

function formatListDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

type Props = {
  posts: PostListItem[];
};

export function ArticleRelatedGrid({ posts }: Props) {
  if (!posts.length) return null;

  return (
    <section className="px-6 pb-32 md:px-12" aria-labelledby="keep-reading-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h3
            id="keep-reading-heading"
            className="font-display text-2xl font-bold text-foreground"
          >
            Keep Reading
          </h3>
          <Link
            href="/blog"
            className="text-xs font-bold tracking-widest text-primary uppercase transition-colors hover:text-primary/80"
          >
            View All Articles
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className={`group flex flex-col ${i === 2 ? "hidden lg:flex" : ""}`}
            >
              <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl bg-zinc-900">
                {post.coverUrl ? (
                  <Image
                    src={post.coverUrl}
                    alt={post.coverImage?.alt ?? post.title}
                    width={800}
                    height={450}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs tracking-widest text-zinc-600 uppercase">
                    No cover
                  </div>
                )}
              </div>
              <div className="mb-2 flex flex-wrap items-center gap-3 text-[10px] tracking-widest text-zinc-500 uppercase">
                {post.category ? (
                  <span className="text-primary">{post.category}</span>
                ) : null}
                {post.category && post.readingTimeMinutes ? (
                  <span aria-hidden>•</span>
                ) : null}
                {post.readingTimeMinutes ? (
                  <span>{post.readingTimeMinutes} Min Read</span>
                ) : null}
                {post.publishedAt ? (
                  <>
                    <span aria-hidden>•</span>
                    <time dateTime={post.publishedAt}>
                      {formatListDate(post.publishedAt)}
                    </time>
                  </>
                ) : null}
              </div>
              <h4 className="font-display text-xl font-bold transition-colors group-hover:text-primary">
                {post.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
