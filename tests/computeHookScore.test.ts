import { describe, expect, it } from "vitest";
import { computeHookScore } from "../src/analysis/diagnose";
import { IN_MEDIAS_RES_ID } from "../src/analysis/rules/inMediasRes";
import { IMAGERY_DENSITY_ID } from "../src/analysis/rules/imageryDensity";
import { SENTENCE_VARIANCE_ID } from "../src/analysis/rules/sentenceVariance";

function rule(id: string, score: number) {
  return { id, label: id, score, detail: "" };
}

describe("computeHookScore", () => {
  it("is 0 when every rule scores 0", () => {
    expect(
      computeHookScore([
        rule(IN_MEDIAS_RES_ID, 0),
        rule(IMAGERY_DENSITY_ID, 0),
        rule(SENTENCE_VARIANCE_ID, 0),
      ]),
    ).toBe(0);
  });

  it("is 100 when every rule scores 100", () => {
    expect(
      computeHookScore([
        rule(IN_MEDIAS_RES_ID, 100),
        rule(IMAGERY_DENSITY_ID, 100),
        rule(SENTENCE_VARIANCE_ID, 100),
      ]),
    ).toBe(100);
  });

  it("moves predictably up when a single rule's score increases", () => {
    const base = [
      rule(IN_MEDIAS_RES_ID, 50),
      rule(IMAGERY_DENSITY_ID, 50),
      rule(SENTENCE_VARIANCE_ID, 50),
    ];
    const improved = [
      rule(IN_MEDIAS_RES_ID, 90),
      rule(IMAGERY_DENSITY_ID, 50),
      rule(SENTENCE_VARIANCE_ID, 50),
    ];
    expect(computeHookScore(improved)).toBeGreaterThan(computeHookScore(base));
  });

  it("ignores unknown rule ids rather than crashing", () => {
    expect(() => computeHookScore([rule("unknown-rule", 80)])).not.toThrow();
    expect(computeHookScore([rule("unknown-rule", 80)])).toBe(0);
  });

  it("returns 0 for an empty rule list", () => {
    expect(computeHookScore([])).toBe(0);
  });
});
