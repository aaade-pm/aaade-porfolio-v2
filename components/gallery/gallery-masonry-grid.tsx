import Image from "next/image";

import { urlForImage } from "@/lib/sanity";
import type { GalleryItem } from "@/types/sanity";

const DISPLAY_WIDTH = 900;

function displayDimensions(item: GalleryItem) {
  const w = item.assetWidth;
  const h = item.assetHeight;
  if (w && h && w > 0) {
    const height = Math.max(1, Math.round(DISPLAY_WIDTH * (h / w)));
    return { width: DISPLAY_WIDTH, height };
  }
  return { width: DISPLAY_WIDTH, height: Math.round(DISPLAY_WIDTH * 0.75) };
}

function captionCopy(item: GalleryItem) {
  const title = item.captionTitle?.trim() || null;
  const description =
    item.captionDescription?.trim() || item.caption?.trim() || null;
  return { title, description };
}

type Props = {
  items: GalleryItem[];
};

export function GalleryMasonryGrid({ items }: Props) {
  return (
    <div className="columns-1 gap-x-6 sm:columns-2 lg:columns-3">
      {items.map((item) => {
        const src = item.image
          ? urlForImage(item.image)?.width(DISPLAY_WIDTH).url()
          : null;
        if (!src) return null;

        const { width, height } = displayDimensions(item);
        const { title, description } = captionCopy(item);

        const captionId = `gallery-caption-${item._id}`;

        return (
          <figure key={item._id} className="mb-8 break-inside-avoid">
            <div
              className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              tabIndex={title || description ? 0 : undefined}
              role={title || description ? "group" : undefined}
              aria-describedby={
                title || description ? captionId : undefined
              }
            >
              <Image
                src={src}
                alt={item.image?.alt ?? title ?? description ?? "Gallery photograph"}
                width={width}
                height={height}
                className="h-auto w-full grayscale transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0 group-focus-within:scale-[1.02] group-focus-within:grayscale-0"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {(title || description) && (
                <figcaption
                  id={captionId}
                  className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/45 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 md:p-6"
                >
                  {title ? (
                    <p className="font-display text-sm font-semibold tracking-tight text-primary md:text-base">
                      {title}
                    </p>
                  ) : null}
                  {description ? (
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-300 md:text-[0.9375rem]">
                      {description}
                    </p>
                  ) : null}
                </figcaption>
              )}
            </div>
          </figure>
        );
      })}
    </div>
  );
}
