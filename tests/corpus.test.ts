import { describe, expect, it } from "vitest";
import { CORPUS } from "../src/analysis/corpus";

describe("CORPUS", () => {
  it("contains at least 30 entries", () => {
    expect(CORPUS.length).toBeGreaterThanOrEqual(30);
  });

  it("gives every entry a title, author, and text", () => {
    for (const entry of CORPUS) {
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.author.length).toBeGreaterThan(0);
      expect(entry.text.length).toBeGreaterThan(0);
    }
  });

  it("computes all three rule scores for every entry via diagnose()", () => {
    for (const entry of CORPUS) {
      expect(entry.diagnosis.rules).toHaveLength(3);
      for (const rule of entry.diagnosis.rules) {
        expect(typeof rule.score).toBe("number");
        expect(rule.score).toBeGreaterThanOrEqual(0);
        expect(rule.score).toBeLessThanOrEqual(100);
      }
      expect(entry.diagnosis.hookScore).toBeGreaterThanOrEqual(0);
      expect(entry.diagnosis.hookScore).toBeLessThanOrEqual(100);
    }
  });

  it("includes the canonical weak opener as a real, low-scoring example", () => {
    const badOpener = CORPUS.find((e) => e.title === "Paul Clifford");
    expect(badOpener).toBeDefined();
    expect(badOpener?.diagnosis.hookScore).toBeLessThan(50);
  });
});
