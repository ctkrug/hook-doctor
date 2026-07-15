import type { Diagnosis } from "./types";
import { splitSentences } from "./text";
import { IN_MEDIAS_RES_ID } from "./rules/inMediasRes";

/** Below this score the opening sentence gets flagged red-ink marginalia; at or above, a green check. */
const FLAG_THRESHOLD = 60;

/** The red-ink (or green-check) marginalia note attached to one manuscript sentence. */
export interface Annotation {
  sentenceIndex: number;
  sentence: string;
  tone: "flag" | "ok";
  note: string;
}

/**
 * Picks the manuscript sentence to annotate — always the opening sentence,
 * since in medias res is the rule that's inherently about the first line.
 * Returns null when there's no text to annotate.
 */
export function buildAnnotation(diagnosis: Diagnosis): Annotation | null {
  const sentences = splitSentences(diagnosis.input);
  if (sentences.length === 0) return null;

  const inMediasRes = diagnosis.rules.find((r) => r.id === IN_MEDIAS_RES_ID);
  if (!inMediasRes) return null;

  return {
    sentenceIndex: 0,
    sentence: sentences[0],
    tone: inMediasRes.score < FLAG_THRESHOLD ? "flag" : "ok",
    note: inMediasRes.detail,
  };
}
