import type { PortableTextBlock } from "@portabletext/types";

const DEFAULT_WPM = 200;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

/** Plain text from one portable-text value (standard block or custom object block). */
function blockToPlainText(block: unknown): string {
  if (!isRecord(block)) return "";

  if (block._type === "articleCode" && typeof block.code === "string") {
    return block.code;
  }

  if (block._type === "articleCalloutGrid") {
    const parts = [
      block.leftTitle,
      block.leftBody,
      block.rightTitle,
      block.rightBody,
    ].filter((p): p is string => typeof p === "string" && p.length > 0);
    return parts.join("\n");
  }

  const ptBlock = block as unknown as PortableTextBlock;
  const children = ptBlock.children;
  if (!Array.isArray(children)) return "";
  return children
    .map((span) => {
      if (span && typeof span === "object" && "text" in span) {
        const t = (span as { text?: string }).text;
        return typeof t === "string" ? t : "";
      }
      return "";
    })
    .join("");
}

/** Flatten portable text blocks to plain text for word counting. */
export function portableTextToPlainText(
  blocks: PortableTextBlock[] | null | undefined,
): string {
  if (!blocks?.length) return "";
  return blocks.map((b) => blockToPlainText(b)).join("\n").trim();
}

/**
 * Estimated minutes to read body copy (~200 wpm). Returns null if there is no text.
 * Uses ceiling so borderline lengths don’t under-report (e.g. 201 words → 2 min).
 */
export function estimateReadingMinutesFromPortableText(
  blocks: PortableTextBlock[] | null | undefined,
  wordsPerMinute: number = DEFAULT_WPM,
): number | null {
  const text = portableTextToPlainText(blocks);
  if (!text) return null;
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words === 0) return null;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
