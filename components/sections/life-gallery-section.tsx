import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GalleryMasonryGrid } from "@/components/gallery/gallery-masonry-grid";
import { Container } from "@/components/ui/container";
import type { GalleryItem } from "@/types/sanity";

type Props = {
  items: GalleryItem[];
  title: string;
  description: string;
  emptyMessage: string;
  galleryCtaLabel: string;
};

export function LifeGallerySection({
  items,
  title,
  description,
  emptyMessage,
  galleryCtaLabel,
}: Props) {
  return (
    <section
      id="life"
      className="scroll-mt-20 bg-black px-6 py-24 md:px-12 md:py-32"
    >
      <Container className="max-w-7xl">
        <div className="mb-16 md:mb-20">
          <h2 className="font-display mb-4 text-4xl font-bold text-white md:text-6xl">
            {title}
          </h2>
          <p className="max-w-lg whitespace-pre-line text-zinc-500">
            {description}
          </p>
        </div>

        {items.length === 0 ? (
          <p className="whitespace-pre-line text-zinc-500">{emptyMessage}</p>
        ) : (
          <>
            <GalleryMasonryGrid items={items} />
            <div className="mt-20 flex justify-center">
              <Link
                href="/gallery"
                className="group font-display flex items-center gap-2 rounded-full border border-primary px-8 py-4 text-lg tracking-widest text-primary uppercase transition-all duration-300 hover:bg-primary hover:text-white"
              >
                {galleryCtaLabel}
                <ArrowRight
                  className="size-5 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
