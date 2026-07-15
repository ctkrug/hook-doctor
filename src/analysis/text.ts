/**
 * Small, dependency-free text utilities shared by the scoring rules.
 *
 * These are intentionally simple heuristics (regex-based splitting and
 * tokenizing), not a real NLP pipeline — the product's premise is that
 * transparent, explainable heuristics beat a black box. See docs/VISION.md.
 */

/** Splits text into sentences on `.`/`!`/`?` boundaries. Empty input yields []. */
export function splitSentences(text: string): string[] {
  const trimmed = text.trim();
  if (trimmed === "") return [];
  return trimmed
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** Extracts lowercase word tokens (letters and internal apostrophes only). */
export function tokenizeWords(text: string): string[] {
  return text.match(/[A-Za-z']+/g)?.map((w) => w.toLowerCase()) ?? [];
}

/** Clamps a number to the inclusive [min, max] range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
