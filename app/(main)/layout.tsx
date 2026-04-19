import { SiteShell } from "@/components/layout/site-shell";
import { getArchivedProjects, getSiteSettings } from "@/lib/sanity";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, archived] = await Promise.all([
    getSiteSettings(),
    getArchivedProjects(),
  ]);
  return (
    <SiteShell settings={settings} archived={archived}>
      {children}
    </SiteShell>
  );
}
