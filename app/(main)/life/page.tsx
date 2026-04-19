import type { Metadata } from "next";

import { GrainOverlay } from "@/components/sections/grain-overlay";
import { LifeGallerySection } from "@/components/sections/life-gallery-section";
import { getLifeGalleryPreview, getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Life",
  description: "Beyond code — gallery and life outside the screen.",
};

export default async function LifePage() {
  const [settings, lifeGallery] = await Promise.all([
    getSiteSettings(),
    getLifeGalleryPreview(),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <GrainOverlay />
      <LifeGallerySection
        items={lifeGallery}
        title={settings.lifeTitle}
        description={settings.lifeDescription}
        emptyMessage={settings.lifeEmptyMessage}
        galleryCtaLabel={settings.lifeGalleryCtaLabel}
      />
    </div>
  );
}
