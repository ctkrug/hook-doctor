import { describe, expect, it } from "vitest";
import { imageryDensity } from "../../src/analysis/rules/imageryDensity";

describe("imageryDensity", () => {
  it("scores a sentence dense in concrete sensory nouns higher than an equivalent abstract one", () => {
    const concrete = imageryDensity(
      "Blood, glass, and iron covered the stone floor near the fire.",
    );
    const abstract = imageryDensity(
      "Feeling, truth, and justice covered the situation near the idea.",
    );
    expect(concrete.score).toBeGreaterThan(abstract.score);
  });

  it("names a detected concrete word when present", () => {
    const result = imageryDensity("The knife lay in the mud.");
    expect(result.detail).toContain("knife");
  });

  it("names a detected abstract word when present and no concrete words exist", () => {
    const result = imageryDensity("It was about truth and justice.");
    expect(result.detail).toContain("truth");
  });

  it("stays neutral when neither concrete nor abstract words are detected", () => {
    const result = imageryDensity("She walked to the store yesterday.");
    expect(result.score).toBe(50);
  });

  it("clamps the score at 100 for very dense concrete text", () => {
    const result = imageryDensity(
      "Blood glass iron stone steel bone ash smoke fire ice.",
    );
    expect(result.score).toBe(100);
  });

  it("clamps the score at 0 for very dense abstract text", () => {
    const result = imageryDensity(
      "Feeling truth reality situation idea concept notion belief justice freedom.",
    );
    expect(result.score).toBe(0);
  });

  it("handles empty input without throwing", () => {
    const result = imageryDensity("");
    expect(result.score).toBe(0);
    expect(result.detail).not.toBe("");
  });
});
