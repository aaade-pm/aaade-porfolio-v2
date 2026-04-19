import type { Metadata } from "next";

import { GrainOverlay } from "@/components/sections/grain-overlay";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for collaborations and opportunities.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const mailto = settings.contactEmail.includes("@")
    ? `mailto:${settings.contactEmail.replace(/^mailto:/i, "")}`
    : `mailto:${settings.contactEmail}`;
  const label = settings.contactEmail.replace(/^mailto:/i, "");

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <GrainOverlay />
      <section className="scroll-mt-20 px-6 py-24 md:px-12 md:py-32">
        <Container className="max-w-7xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Contact
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-500">
            Open to collaborations, product engineering roles, and interesting
            freelance work. Reach out by email.
          </p>
          <a
            href={mailto}
            className="font-display shadow-cta mt-10 inline-block transform rounded-full bg-primary px-10 py-5 text-xl text-white transition-all duration-300 hover:scale-105 hover:bg-primary-hover md:px-12 md:py-6 md:text-2xl"
          >
            {label}
          </a>
        </Container>
      </section>
    </div>
  );
}
