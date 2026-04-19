"use client";

import { ArrowRight } from "lucide-react";

import { useArchiveModal } from "@/components/layout/archive-modal-provider";

type Props = {
  ctaLabel: string;
};

/**
 * “Browse archive” control. The vault modal UI lives in {@link ArchiveModalProvider} (SiteShell).
 */
export function HomeArchive({ ctaLabel }: Props) {
  const { openArchive } = useArchiveModal();

  return (
    <div className="mt-20 flex justify-center px-6 md:px-12">
      <button
        type="button"
        onClick={openArchive}
        className="group font-display flex items-center gap-2 rounded-full border border-primary px-8 py-4 text-lg tracking-widest text-primary uppercase transition-all duration-300 hover:bg-primary hover:text-white"
      >
        {ctaLabel}
        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
