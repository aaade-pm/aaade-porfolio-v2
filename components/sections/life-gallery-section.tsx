import Image from "next/image";

import { Container } from "@/components/ui/container";
import { urlForImage } from "@/lib/sanity";
import type { GalleryItem } from "@/types/sanity";

type Props = {
  items: GalleryItem[];
  title: string;
  description: string;
  emptyMessage: string;
};

export function LifeGallerySection({
  items,
  title,
  description,
  emptyMessage,
}: Props) {
  return (
    <section
      id="life"
      className="scroll-mt-20 bg-black px-6 py-24 md:px-12 md:py-32"
    >
      <Container className="max-w-7xl">
        <div className="mb-16 md:mb-20">
          <h2 className="font-display mb-4 text-4xl font-bold md:text-6xl">
            {title}
          </h2>
          <p className="max-w-lg whitespace-pre-line text-zinc-500">
            {description}
          </p>
        </div>

        {items.length === 0 ? (
          <p className="whitespace-pre-line text-zinc-500">{emptyMessage}</p>
        ) : (
          <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
            {items.map((item) => {
              const src = item.image
                ? urlForImage(item.image)?.width(700).height(900).url()
                : null;
              if (!src) return null;
              return (
                <div
                  key={item._id}
                  className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl shadow-2xl"
                >
                  <Image
                    src={src}
                    alt={
                      item.image?.alt ?? item.caption ?? "Gallery photograph"
                    }
                    width={700}
                    height={900}
                    className="h-auto w-full grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  {item.caption ? (
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="text-sm text-white italic">
                        {item.caption}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
