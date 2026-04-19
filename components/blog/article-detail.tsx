import Image from "next/image";

import { RichText } from "@/components/portable-text";
import type { PostDetail, PostListItem } from "@/types/sanity";

import { ArticleNewsletterCta } from "./article-newsletter-cta";
import { ArticleRelatedGrid } from "./article-related-grid";
import { ArticleTitle } from "./article-title";

function formatArticleDate(iso: string) {
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
  post: PostDetail;
  relatedPosts: PostListItem[];
};

export function ArticleDetail({ post, relatedPosts }: Props) {
  const coverUrl = post.coverUrl;

  return (
    <>
      <header className="mx-auto mb-20 max-w-7xl px-6 md:px-12">
        <div className="animate-fade-up mb-8 flex flex-wrap items-center gap-4 text-xs tracking-[0.3em] text-zinc-500 uppercase">
          {post.publishedAt ? (
            <span>{formatArticleDate(post.publishedAt)}</span>
          ) : null}
          {post.readingTimeMinutes ? (
            <>
              <span className="size-1 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>{post.readingTimeMinutes} Min Read</span>
            </>
          ) : null}
          {post.category ? (
            <>
              <span className="size-1 shrink-0 rounded-full bg-primary" aria-hidden />
              <span className="text-primary">{post.category}</span>
            </>
          ) : null}
        </div>

        <ArticleTitle title={post.title} titleAccent={post.titleAccent} />

        {post.authorName || post.authorImageUrl ? (
          <div className="animate-fade-up mt-8 flex items-center gap-4">
            {post.authorImageUrl ? (
              <Image
                src={post.authorImageUrl}
                alt={post.authorImage?.alt ?? post.authorName ?? "Author"}
                width={48}
                height={48}
                className="size-12 rounded-full border border-zinc-800 object-cover"
              />
            ) : null}
            <div>
              {post.authorName ? (
                <p className="text-sm font-medium text-foreground">
                  {post.authorName}
                </p>
              ) : null}
              {post.authorRole ? (
                <p className="text-xs tracking-widest text-zinc-500 uppercase">
                  {post.authorRole}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </header>

      {coverUrl ? (
        <div className="animate-fade-up mx-auto mb-20 max-w-7xl px-6 md:px-12">
          <div className="group relative aspect-video overflow-hidden rounded-3xl md:aspect-[21/9]">
            <Image
              src={coverUrl}
              alt={post.coverImage?.alt ?? post.title}
              fill
              className="object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 1280px"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-primary/10 mix-blend-overlay"
              aria-hidden
            />
          </div>
          {post.coverCaption ? (
            <p className="mt-4 text-center text-xs tracking-widest text-zinc-600 italic uppercase">
              {post.coverCaption}
            </p>
          ) : null}
        </div>
      ) : null}

      <article className="article-content mx-auto max-w-3xl px-6 md:px-12">
        <RichText value={post.content} tone="article" />
      </article>

      {post.tags?.length ? (
        <div className="mx-auto mt-12 mb-32 flex max-w-3xl flex-wrap gap-2 px-6 md:px-12">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="cursor-default rounded-full bg-zinc-900 px-4 py-2 text-xs text-zinc-400 transition-colors hover:text-white"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : null}

      <ArticleNewsletterCta />
      <ArticleRelatedGrid posts={relatedPosts} />
    </>
  );
}
