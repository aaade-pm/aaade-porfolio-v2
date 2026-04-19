import { GalleryMasonryGrid } from "@/components/gallery/gallery-masonry-grid";
import { Container } from "@/components/ui/container";
import { getGalleryImages, getSiteSettings } from "@/lib/sanity";

export default async function GalleryPage() {
  const [items, settings] = await Promise.all([
    getGalleryImages(),
    getSiteSettings(),
  ]);

  return (
    <section className="min-h-screen bg-black px-6 py-24 text-foreground md:px-12 md:py-32">
      <Container className="max-w-7xl">
        <div className="mb-16 md:mb-20">
          <h1 className="font-display mb-4 text-4xl font-bold text-white md:text-6xl">
            Gallery
          </h1>
          <p className="max-w-lg whitespace-pre-line text-zinc-500">
            {settings.lifeDescription}
          </p>
        </div>

        {!items.length ? (
          <p className="whitespace-pre-line text-zinc-500">
            {settings.lifeEmptyMessage}
          </p>
        ) : (
          <GalleryMasonryGrid items={items} />
        )}
      </Container>
    </section>
  );
}
