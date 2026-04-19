import type { Metadata } from "next";

import { GrainOverlay } from "@/components/sections/grain-overlay";

export const metadata: Metadata = {
  title: "About",
  description: "The narrative — background, stack, and interests.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <GrainOverlay />
    </div>
  );
}
