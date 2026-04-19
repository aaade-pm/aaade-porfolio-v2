import { SiteShell } from "@/components/layout/site-shell";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
