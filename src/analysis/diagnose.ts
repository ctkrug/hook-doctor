import type { Diagnosis, RuleResult } from "./types";
import { IN_MEDIAS_RES_ID, inMediasRes } from "./rules/inMediasRes";
import { IMAGERY_DENSITY_ID, imageryDensity } from "./rules/imageryDensity";
import {
  SENTENCE_VARIANCE_ID,
  sentenceVariance,
} from "./rules/sentenceVariance";

/**
 * Weighted average used for the composite Hook Score. In medias res is
 * weighted highest since a reader's first impression forms in the opening
 * words; imagery and rhythm follow. Weights sum to 1.
 */
const WEIGHTS: Record<string, number> = {
  [IN_MEDIAS_RES_ID]: 0.4,
  [IMAGERY_DENSITY_ID]: 0.35,
  [SENTENCE_VARIANCE_ID]: 0.25,
};

/** Pure composite calculation, exported so weighting behavior is independently testable. */
export function computeHookScore(rules: RuleResult[]): number {
  const total = rules.reduce(
    (sum, rule) => sum + rule.score * (WEIGHTS[rule.id] ?? 0),
    0,
  );
  return Math.round(total);
}

/**
 * Runs every structural rule against the pasted text and rolls the results
 * up into a composite Hook Score. See docs/VISION.md for the rule rationale.
 */
export function diagnose(input: string): Diagnosis {
  const rules = [
    inMediasRes(input),
    imageryDensity(input),
    sentenceVariance(input),
  ];
  return {
    input,
    rules,
    hookScore: computeHookScore(rules),
  };
}
