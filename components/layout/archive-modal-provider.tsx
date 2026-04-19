"use client";

import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { ProjectArchiveCards } from "@/components/sections/project-archive-cards";
import type { ProjectListItem } from "@/types/sanity";

type ArchiveModalContextValue = {
  openArchive: () => void;
  closeArchive: () => void;
};

const ArchiveModalContext = createContext<ArchiveModalContextValue | null>(
  null,
);

export function useArchiveModal(): ArchiveModalContextValue {
  const ctx = useContext(ArchiveModalContext);
  if (!ctx) {
    throw new Error("useArchiveModal must be used within ArchiveModalProvider");
  }
  return ctx;
}

type ProviderProps = {
  archived: ProjectListItem[];
  modalEyebrow: string;
  modalTitle: string;
  modalDescription: string;
  gridEmptyMessage: string;
  caseStudyLinkLabel: string;
  children: ReactNode;
};

export function ArchiveModalProvider({
  archived,
  modalEyebrow,
  modalTitle,
  modalDescription,
  gridEmptyMessage,
  caseStudyLinkLabel,
  children,
}: ProviderProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const closeArchive = useCallback(() => {
    setOpen(false);
  }, []);

  const openArchive = useCallback(() => {
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({ openArchive, closeArchive }),
    [openArchive, closeArchive],
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeArchive();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeArchive]);

  return (
    <ArchiveModalContext.Provider value={value}>
      {children}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-500 md:p-8 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close archive"
          className="absolute inset-0 cursor-pointer bg-black/90 backdrop-blur-xl"
          onClick={closeArchive}
        />

        <div
          className={`scrollbar-ademola relative z-[70] flex max-h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900 shadow-2xl transition-transform duration-500 ${
            open ? "scale-100" : "scale-95"
          }`}
        >
          <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-zinc-800 bg-zinc-900 p-8 md:p-12">
            <div>
              <span className="mb-4 block text-xs font-bold tracking-[0.4em] text-primary uppercase">
                {modalEyebrow}
              </span>
              <h2
                id={titleId}
                className="font-display text-4xl font-bold md:text-5xl"
              >
                {modalTitle}
              </h2>
              <p className="mt-4 max-w-lg whitespace-pre-line text-zinc-500">
                {modalDescription}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={closeArchive}
              className="shrink-0 rounded-full bg-zinc-800/50 p-2 text-zinc-500 transition-all hover:rotate-90 hover:text-white"
              aria-label="Close"
            >
              <X className="size-8" />
            </button>
          </div>

          <div className="max-h-[min(70vh,800px)] flex-1 overflow-y-auto p-8 md:p-12">
            <ProjectArchiveCards
              projects={archived}
              emptyMessage={gridEmptyMessage}
              caseStudyLinkLabel={caseStudyLinkLabel}
            />
          </div>
        </div>
      </div>
    </ArchiveModalContext.Provider>
  );
}
