import { AboutSection } from "@/components/sections/about-section";
import { FeaturedWorkSection } from "@/components/sections/featured-work-section";
import { GrainOverlay } from "@/components/sections/grain-overlay";
import { HomeArchive } from "@/components/sections/home-archive";
import { HomeHero } from "@/components/sections/home-hero";
import { LifeGallerySection } from "@/components/sections/life-gallery-section";
import {
  getFeaturedProjects,
  getLifeGalleryPreview,
  getSiteSettings,
} from "@/lib/sanity";

export default async function HomePage() {
  const [settings, featured, lifeGallery] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getLifeGalleryPreview(),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <GrainOverlay />
      <HomeHero settings={settings} />
      <section
        id="work"
        className="scroll-mt-20 bg-canvas-section px-6 py-24 md:px-12 md:py-32"
      >
        <FeaturedWorkSection
          projects={featured}
          workTitle={settings.workTitle}
          featuredEmptyMessage={settings.workFeaturedEmptyMessage}
          liveLabel={settings.workLiveLabel}
          caseStudyLabel={settings.workCaseStudyLabel}
        />
        <HomeArchive ctaLabel={settings.archiveCtaLabel} />
      </section>
      <LifeGallerySection
        items={lifeGallery}
        title={settings.lifeTitle}
        description={settings.lifeDescription}
        emptyMessage={settings.lifeEmptyMessage}
        galleryCtaLabel={settings.lifeGalleryCtaLabel}
      />
      <AboutSection settings={settings} />
    </div>
  );
}
