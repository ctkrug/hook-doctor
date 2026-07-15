import type { Diagnosis } from "./types";
import { diagnose } from "./diagnose";
import { OPENERS } from "../data/openers";

/** A benchmark corpus entry: a real opener plus its computed diagnosis. */
export interface CorpusEntry {
  title: string;
  author: string;
  text: string;
  diagnosis: Diagnosis;
}

/**
 * The benchmark corpus, scored with the exact same rules run on user
 * input — no hand-typed scores, so a corpus entry and a pasted sentence
 * are always directly comparable.
 */
export const CORPUS: CorpusEntry[] = OPENERS.map((opener) => ({
  ...opener,
  diagnosis: diagnose(opener.text),
}));
