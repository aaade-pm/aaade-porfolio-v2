import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import type { SiteSettingsResolved } from "@/types/site-settings";

type Props = {
  settings: SiteSettingsResolved;
  children: React.ReactNode;
};

export function SiteShell({ settings, children }: Props) {
  return (
    <>
      <Navbar settings={settings} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
