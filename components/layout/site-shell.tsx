import { ArchiveModalProvider } from "@/components/layout/archive-modal-provider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about-section";
import type { SiteSettingsResolved } from "@/types/site-settings";
import type { ProjectListItem } from "@/types/sanity";

type Props = {
  settings: SiteSettingsResolved;
  archived: ProjectListItem[];
  children: React.ReactNode;
};

export function SiteShell({ settings, archived, children }: Props) {
  return (
    <ArchiveModalProvider
      archived={archived}
      modalEyebrow={settings.archiveModalEyebrow}
      modalTitle={settings.archiveModalTitle}
      modalDescription={settings.archiveModalDescription}
      gridEmptyMessage={settings.archiveGridEmptyMessage}
      caseStudyLinkLabel={settings.archiveCaseStudyLinkLabel}
    >
      <Navbar settings={settings} />
      <main className="flex flex-1 flex-col">{children}</main>
      <AboutSection settings={settings} />
      <Footer settings={settings} />
    </ArchiveModalProvider>
  );
}
