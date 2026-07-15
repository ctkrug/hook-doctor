import { describe, expect, it } from "vitest";
import { sentenceVariance } from "../../src/analysis/rules/sentenceVariance";

describe("sentenceVariance", () => {
  it("scores three-plus near-identical-length sentences low", () => {
    const result = sentenceVariance(
      "The dog ran across the yard. The cat sat on the porch. The bird flew over the fence.",
    );
    expect(result.score).toBeLessThan(40);
  });

  it("scores a stark short/long mix high", () => {
    const result = sentenceVariance(
      "Run. The explosion tore through the iron gate and scattered stone across the yard where children had been playing only moments before.",
    );
    expect(result.score).toBeGreaterThan(70);
  });

  it("degrades gracefully for a single-sentence input", () => {
    const result = sentenceVariance("Only one sentence here.");
    expect(result.score).toBe(50);
    expect(result.detail).toMatch(/one sentence/i);
  });

  it("handles empty input without throwing", () => {
    const result = sentenceVariance("");
    expect(result.score).toBe(0);
    expect(result.detail).not.toBe("");
  });

  it("names the shortest and longest sentence lengths in the detail", () => {
    const result = sentenceVariance(
      "Hi. This sentence has exactly seven words in it.",
    );
    expect(result.detail).toMatch(/\d+/);
  });
});
