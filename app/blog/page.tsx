import type { Metadata } from "next";

import { JournalBlogListing } from "@/components/blog/journal-blog-listing";
import { JournalHero } from "@/components/blog/journal-hero";
import { GrainOverlay } from "@/components/sections/grain-overlay";
import { getPosts } from "@/lib/sanity";
import { isSanityConfigured } from "@/sanity/config/client";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Articles and notes — frontend, creative systems, and technology.",
};

export default async function BlogIndexPage() {
  const posts = await getPosts();
  const sanityConfigured = isSanityConfigured();

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <GrainOverlay />
      <div className="px-6 pt-40 pb-32 md:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <JournalHero />
          <JournalBlogListing posts={posts} sanityConfigured={sanityConfigured} />
        </div>
      </div>
    </div>
  );
}
