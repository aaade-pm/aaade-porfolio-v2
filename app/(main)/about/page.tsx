import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/about-section";
import { GrainOverlay } from "@/components/sections/grain-overlay";
import { getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About",
  description: "The narrative — background, stack, and interests.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <GrainOverlay />
      <AboutSection settings={settings} />
    </div>
  );
}
