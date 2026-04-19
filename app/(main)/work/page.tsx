import type { Metadata } from "next";

import { FeaturedWorkSection } from "@/components/sections/featured-work-section";
import { GrainOverlay } from "@/components/sections/grain-overlay";
import { HomeArchive } from "@/components/sections/home-archive";
import {
  getArchivedProjects,
  getFeaturedProjects,
  getSiteSettings,
} from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and archive.",
};

export default async function WorkPage() {
  const [settings, featured, archived] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getArchivedProjects(),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <GrainOverlay />
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
        <HomeArchive
          archived={archived}
          ctaLabel={settings.archiveCtaLabel}
          modalEyebrow={settings.archiveModalEyebrow}
          modalTitle={settings.archiveModalTitle}
          modalDescription={settings.archiveModalDescription}
          gridEmptyMessage={settings.archiveGridEmptyMessage}
          caseStudyLinkLabel={settings.archiveCaseStudyLinkLabel}
        />
      </section>
    </div>
  );
}
