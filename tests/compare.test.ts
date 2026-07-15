import { describe, expect, it } from "vitest";
import { computeGaps } from "../src/analysis/compare";
import type { Diagnosis } from "../src/analysis/types";

function diagnosisOf(scores: Record<string, number>): Diagnosis {
  return {
    input: "",
    hookScore: 0,
    rules: Object.entries(scores).map(([id, score]) => ({
      id,
      label: id,
      score,
      detail: "",
    })),
  };
}

describe("computeGaps", () => {
  it("flags a rule where the match outscores the user", () => {
    const user = diagnosisOf({ a: 30, b: 60 });
    const matched = diagnosisOf({ a: 80, b: 60 });
    const gaps = computeGaps(user, matched);
    expect(gaps).toHaveLength(1);
    expect(gaps[0].id).toBe("a");
    expect(gaps[0].userScore).toBe(30);
    expect(gaps[0].matchScore).toBe(80);
  });

  it("does not flag a rule where scores are equal", () => {
    const user = diagnosisOf({ a: 50 });
    const matched = diagnosisOf({ a: 50 });
    expect(computeGaps(user, matched)).toHaveLength(0);
  });

  it("does not flag a rule where the user already exceeds the match", () => {
    const user = diagnosisOf({ a: 90 });
    const matched = diagnosisOf({ a: 40 });
    expect(computeGaps(user, matched)).toHaveLength(0);
  });

  it("returns an empty array when there are no rules", () => {
    expect(computeGaps(diagnosisOf({}), diagnosisOf({}))).toEqual([]);
  });
});
