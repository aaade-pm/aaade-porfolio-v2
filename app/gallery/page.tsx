import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { getGalleryImages, urlForImage } from "@/lib/sanity";

export default async function GalleryPage() {
  const items = await getGalleryImages();

  return (
    <Section>
      <Container>
        <Heading level={1}>Gallery</Heading>
        <Text muted className="mt-2">
          Life moments with captions from Sanity.
        </Text>

        {!items.length ? (
          <Text muted className="mt-10">
            No gallery items yet. Add documents in Sanity Studio.
          </Text>
        ) : (
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const src = item.image
                ? urlForImage(item.image)?.width(900).height(900).url()
                : null;
              return (
                <li key={item._id} className="space-y-3">
                  {src ? (
                    <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface">
                      <Image
                        src={src}
                        alt={item.image?.alt ?? item.caption ?? "Gallery image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}
                  {item.caption ? (
                    <Text size="sm" muted>
                      {item.caption}
                    </Text>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </Section>
  );
}
