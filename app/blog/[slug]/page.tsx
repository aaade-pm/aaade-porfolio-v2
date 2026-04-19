import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/components/blog/article-detail";
import { ArticleReadingProgress } from "@/components/blog/article-reading-progress";
import { GrainOverlay } from "@/components/sections/grain-overlay";
import {
  getPostBySlug,
  getRelatedPosts,
  urlForImage,
} from "@/lib/sanity";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post" };

  const ogImage = post.coverImage
    ? urlForImage(post.coverImage)?.width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt ?? post.category ?? undefined,
    openGraph: ogImage
      ? {
          images: [{ url: ogImage, alt: post.coverImage?.alt ?? post.title }],
        }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post._id, post.category, 3);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <GrainOverlay />
      <ArticleReadingProgress />
      <main className="pt-32 pb-32 md:pt-40">
        <ArticleDetail post={post} relatedPosts={relatedPosts} />
      </main>
    </div>
  );
}
