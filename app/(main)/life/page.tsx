import type { Metadata } from "next";

import { GrainOverlay } from "@/components/sections/grain-overlay";
import { LifeGallerySection } from "@/components/sections/life-gallery-section";
import { getGalleryImages, getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Life",
  description: "Beyond code — gallery and life outside the screen.",
};

export default async function LifePage() {
  const [settings, gallery] = await Promise.all([
    getSiteSettings(),
    getGalleryImages(),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <GrainOverlay />
      <LifeGallerySection
        items={gallery}
        title={settings.lifeTitle}
        description={settings.lifeDescription}
        emptyMessage={settings.lifeEmptyMessage}
      />
    </div>
  );
}
