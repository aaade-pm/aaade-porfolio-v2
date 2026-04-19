import Image from "next/image";

import type { SanityImage } from "@/types/sanity";
import { urlForImage } from "@/lib/sanity";

type Props = {
  images: SanityImage[];
  /**0-based index to skip (e.g. hero uses images[0]) */
  skipFirst?: boolean;
};

export function CaseStudyGalleryRail({ images, skipFirst }: Props) {
  const list = skipFirst && images.length > 1 ? images.slice(1) : images;
  if (!list.length) return null;

  return (
    <section className="py-32">
      <div className="mb-12 px-6 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-end justify-between gap-6 md:flex-row">
          <h2 className="animate-fade-up font-display text-4xl font-bold md:text-6xl">
            Visual Narrative
          </h2>
          <p className="animate-fade-up max-w-md text-sm text-zinc-500">
            Interface details and moments from the project — scroll to explore.
          </p>
        </div>
      </div>
      <div className="scrollbar-hide flex gap-6 overflow-x-auto px-6 pb-12 md:px-12">
        {list.map((img, i) => {
          const u = urlForImage(img)?.width(1400).height(788).url();
          if (!u) return null;
          return (
            <div
              key={img.asset?._ref ?? i}
              className="relative aspect-video w-[80vw] shrink-0 overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl md:w-[60vw]"
            >
              <Image
                src={u}
                alt={img.alt ?? ""}
                fill
                className="object-cover"
                sizes="80vw"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
