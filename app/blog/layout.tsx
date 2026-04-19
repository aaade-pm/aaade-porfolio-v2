import { SiteShell } from "@/components/layout/site-shell";
import { getSiteSettings } from "@/lib/sanity";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return <SiteShell settings={settings}>{children}</SiteShell>;
}
