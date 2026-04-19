"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { PostListItem } from "@/types/sanity";

const LOAD_INCREMENT = 6;
const INITIAL_VISIBLE = 6;

function formatListDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function JournalPostCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card group flex flex-col"
    >
      <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900">
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt={post.coverImage?.alt ?? post.title}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="blog-image h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div
            className="blog-image flex h-full w-full items-center justify-center bg-zinc-900 text-xs tracking-widest text-zinc-600 uppercase transition-all duration-700 group-hover:scale-105"
            aria-hidden
          >
            No cover
          </div>
        )}
        {post.category ? (
          <div className="absolute top-4 right-4">
            <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] tracking-widest text-white uppercase backdrop-blur-md">
              {post.category}
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex-1">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          {post.publishedAt ? (
            <time
              dateTime={post.publishedAt}
              className="text-[10px] tracking-widest text-zinc-500 uppercase"
            >
              {formatListDate(post.publishedAt)}
            </time>
          ) : null}
          {post.readingTimeMinutes ? (
            <>
              {post.publishedAt ? (
                <span
                  className="size-1 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
              ) : null}
              <span className="text-[10px] tracking-widest text-zinc-500 uppercase">
                {post.readingTimeMinutes} min read
              </span>
            </>
          ) : null}
        </div>
        <h2 className="font-display mb-4 text-2xl leading-tight font-bold transition-colors duration-300 group-hover:text-primary group-hover:italic">
          {post.title}
        </h2>
        {post.excerpt ? (
          <p className="line-clamp-3 text-sm leading-relaxed font-light text-zinc-500">
            {post.excerpt}
          </p>
        ) : null}
      </div>
      <div className="mt-6 flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase transition-all duration-300 group-hover:gap-4">
        Read article
        <ArrowRight className="size-4 shrink-0" aria-hidden />
      </div>
    </Link>
  );
}

type Props = {
  posts: PostListItem[];
  /** When false, empty list may mean missing env — show setup hint. */
  sanityConfigured: boolean;
};

export function JournalBlogListing({ posts, sanityConfigured }: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of posts) {
      if (p.category?.trim()) set.add(p.category.trim());
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filtered = useMemo(() => {
    if (!activeCategory) return posts;
    return posts.filter((p) => (p.category ?? "").trim() === activeCategory);
  }, [posts, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  if (!posts.length) {
    if (!sanityConfigured) {
      return (
        <p className="animate-fade-up delay-100 text-zinc-500">
          Connect Sanity to load posts: set{" "}
          <code className="rounded bg-surface-elevated px-1.5 py-0.5 text-sm text-foreground">
            NEXT_PUBLIC_SANITY_PROJECT_ID
          </code>{" "}
          and{" "}
          <code className="rounded bg-surface-elevated px-1.5 py-0.5 text-sm text-foreground">
            NEXT_PUBLIC_SANITY_DATASET
          </code>{" "}
          in{" "}
          <code className="rounded bg-surface-elevated px-1.5 py-0.5 text-sm text-foreground">
            .env.local
          </code>
          .
        </p>
      );
    }
    return (
      <p className="animate-fade-up delay-100 text-zinc-500">
        No posts published yet. Add a <strong className="text-zinc-400">Blog Post</strong>{" "}
        in Sanity Studio and publish it.
      </p>
    );
  }

  return (
    <>
      <div
        className={cn(
          "animate-fade-up mb-16 flex gap-6 overflow-x-auto pb-4 delay-100",
          "scrollbar-hide",
        )}
        role="tablist"
        aria-label="Filter by category"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === null}
          onClick={() => {
            setActiveCategory(null);
            setVisibleCount(INITIAL_VISIBLE);
          }}
          className={cn(
            "shrink-0 rounded-full px-6 py-2 text-xs font-bold tracking-widest uppercase transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
            activeCategory === null
              ? "bg-primary text-white"
              : "border border-zinc-800 text-zinc-400 hover:border-primary hover:text-primary",
          )}
        >
          All Posts
        </button>
        {categories.map((cat) => {
          const selected = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(INITIAL_VISIBLE);
              }}
              className={cn(
                "shrink-0 rounded-full px-6 py-2 text-xs font-bold tracking-widest uppercase transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                selected
                  ? "bg-primary text-white"
                  : "border border-zinc-800 text-zinc-400 hover:border-primary hover:text-primary",
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-zinc-500">No posts in this category yet.</p>
      ) : (
        <>
          <div className="animate-fade-up grid grid-cols-1 gap-x-8 gap-y-16 delay-200 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <JournalPostCard key={post._id} post={post} />
            ))}
          </div>

          {hasMore ? (
            <div className="mt-32 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((c) => c + LOAD_INCREMENT)
                }
                className="font-display rounded-full border border-primary px-10 py-5 text-lg tracking-widest text-primary uppercase transition-all duration-300 hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                Load more stories
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
