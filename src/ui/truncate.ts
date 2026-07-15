export interface TruncateResult {
  text: string;
  wordCount: number;
  truncated: boolean;
}

/**
 * Caps analysis input at `limit` whitespace-separated words so an extremely
 * long paste (>2000 words per docs/BACKLOG.md 3.3) can't make the rules
 * engine do unbounded work on every keystroke.
 */
export function truncateToWordLimit(text: string, limit: number): TruncateResult {
  const words = text.trim() === "" ? [] : text.trim().split(/\s+/);
  if (words.length <= limit) {
    return { text, wordCount: words.length, truncated: false };
  }
  return {
    text: words.slice(0, limit).join(" "),
    wordCount: words.length,
    truncated: true,
  };
}
