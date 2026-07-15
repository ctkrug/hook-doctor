import type { Diagnosis } from "./types";

/**
 * Placeholder entrypoint for the scoring engine.
 *
 * The real rules (in medias res, imagery density, sentence-length variance)
 * and the famous-opener benchmark match land in BUILD per docs/BACKLOG.md.
 * This stub keeps the app runnable end-to-end while that lands.
 */
export function diagnose(input: string): Diagnosis {
  return {
    input,
    rules: [],
    hookScore: 0,
  };
}
