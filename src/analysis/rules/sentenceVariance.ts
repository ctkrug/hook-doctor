import type { RuleResult } from "../types";
import { clamp, splitSentences, tokenizeWords } from "../text";

export const SENTENCE_VARIANCE_ID = "sentence-variance";

/**
 * Scales the coefficient of variation (stddev / mean word count) into a
 * 0-100 score. Calibrated so a stark short/long mix (e.g. 4 then 22 words)
 * lands well above 70 and a near-uniform run of sentences lands below 40.
 */
const VARIANCE_SCALE = 150;

function mean(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function stddev(values: number[], avg: number): number {
  const variance = mean(values.map((v) => (v - avg) ** 2));
  return Math.sqrt(variance);
}

/**
 * Scores rhythm across the first few sentences: uniform sentence length
 * reads flat even when the words are fine. See docs/VISION.md's third
 * structural rule.
 */
export function sentenceVariance(input: string): RuleResult {
  const label = "Sentence Rhythm";
  const sentences = splitSentences(input);

  if (sentences.length === 0) {
    return {
      id: SENTENCE_VARIANCE_ID,
      label,
      score: 0,
      detail: "There's no text yet — paste an opening line to diagnose it.",
    };
  }

  if (sentences.length === 1) {
    return {
      id: SENTENCE_VARIANCE_ID,
      label,
      score: 50,
      detail:
        "Only one sentence — variance needs at least two to measure, so this shows a neutral baseline.",
    };
  }

  const counts = sentences.map((s) => tokenizeWords(s).length);
  const avg = mean(counts);
  const shortest = Math.min(...counts);
  const longest = Math.max(...counts);

  if (avg === 0) {
    return {
      id: SENTENCE_VARIANCE_ID,
      label,
      score: 0,
      detail: "No words detected across sentences.",
    };
  }

  const coefficientOfVariation = stddev(counts, avg) / avg;
  const score = clamp(
    Math.round(coefficientOfVariation * VARIANCE_SCALE),
    0,
    100,
  );

  const detail =
    score >= 70
      ? `Sentence lengths swing from ${shortest} to ${longest} words — strong rhythmic variance.`
      : score < 40
        ? `Sentence lengths stay close (${shortest}-${longest} words) — uniform rhythm reads flat.`
        : `Sentence lengths range from ${shortest} to ${longest} words — moderate variance.`;

  return { id: SENTENCE_VARIANCE_ID, label, score, detail };
}
