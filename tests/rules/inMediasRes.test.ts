import { describe, expect, it } from "vitest";
import { inMediasRes } from "../../src/analysis/rules/inMediasRes";

describe("inMediasRes", () => {
  it("scores dialogue openers in the top half", () => {
    const result = inMediasRes('"Get out," he said, before she could answer.');
    expect(result.score).toBeGreaterThan(60);
    expect(result.detail).toMatch(/dialogue/i);
  });

  it("scores scene-setting stalls in the bottom half", () => {
    const result = inMediasRes(
      "It was a nice day and Sarah walked to the store.",
    );
    expect(result.score).toBeLessThan(50);
    expect(result.detail).toContain("It was");
  });

  it("recognizes a 'There was' stall too", () => {
    const result = inMediasRes("There was a house at the end of the lane.");
    expect(result.score).toBeLessThan(50);
    expect(result.detail).toContain("There was");
  });

  it("scores an action verb within the first few words in the top half", () => {
    const result = inMediasRes(
      "Sarah grabbed the railing as the train lurched.",
    );
    expect(result.score).toBeGreaterThan(60);
    expect(result.detail).toMatch(/grabbed/i);
  });

  it("scores a neutral description-only opener around the midpoint", () => {
    const result = inMediasRes("The house stood quietly on the hill.");
    expect(result.score).toBe(50);
  });

  it("names the specific construction that drove the score", () => {
    const stall = inMediasRes("It was raining.");
    expect(stall.detail.length).toBeGreaterThan(0);
    const action = inMediasRes("She sprinted down the alley.");
    expect(action.detail).toContain("sprinted");
  });

  it("handles empty input without throwing", () => {
    const result = inMediasRes("");
    expect(result.score).toBe(0);
    expect(result.detail).not.toBe("");
  });
});
