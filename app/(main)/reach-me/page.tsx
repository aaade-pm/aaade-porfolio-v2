import type { Metadata } from "next";

import { ReachOutIntro } from "@/components/sections/reach-out-intro";

export const metadata: Metadata = {
  title: "Reach me",
  description: "Get in touch for collaborations and opportunities.",
};

export default async function ReachMePage() {
  return <ReachOutIntro title="Reach me" />;
}
