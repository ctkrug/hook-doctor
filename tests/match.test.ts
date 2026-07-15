import { describe, expect, it } from "vitest";
import { findClosestMatch } from "../src/analysis/match";
import { CORPUS } from "../src/analysis/corpus";
import { diagnose } from "../src/analysis/diagnose";
import type { CorpusEntry } from "../src/analysis/corpus";
import type { Diagnosis } from "../src/analysis/types";

describe("findClosestMatch", () => {
  it("returns the exact entry when the diagnosis matches a known corpus entry's scores", () => {
    const target = CORPUS[0];
    const result = findClosestMatch(target.diagnosis, CORPUS);
    expect(result).toBe(target);
  });

  it("picks the closest entry from a small synthetic corpus by score distance", () => {
    const near: CorpusEntry = {
      title: "Near",
      author: "Test",
      text: "near",
      diagnosis: {
        input: "near",
        hookScore: 50,
        rules: [
          { id: "a", label: "A", score: 50, detail: "" },
          { id: "b", label: "B", score: 50, detail: "" },
          { id: "c", label: "C", score: 50, detail: "" },
        ],
      },
    };
    const far: CorpusEntry = {
      title: "Far",
      author: "Test",
      text: "far",
      diagnosis: {
        input: "far",
        hookScore: 0,
        rules: [
          { id: "a", label: "A", score: 0, detail: "" },
          { id: "b", label: "B", score: 0, detail: "" },
          { id: "c", label: "C", score: 0, detail: "" },
        ],
      },
    };
    const target: Diagnosis = {
      input: "target",
      hookScore: 48,
      rules: [
        { id: "a", label: "A", score: 48, detail: "" },
        { id: "b", label: "B", score: 51, detail: "" },
        { id: "c", label: "C", score: 49, detail: "" },
      ],
    };
    expect(findClosestMatch(target, [far, near])).toBe(near);
  });

  it("breaks ties deterministically by returning the first equally-close entry", () => {
    const a: CorpusEntry = {
      title: "A",
      author: "T",
      text: "a",
      diagnosis: diagnose("It was a dark night."),
    };
    const b: CorpusEntry = {
      title: "B",
      author: "T",
      text: "b",
      diagnosis: diagnose("It was a dark night."),
    };
    expect(findClosestMatch(diagnose("It was a dark night."), [a, b])).toBe(a);
  });

  it("throws a descriptive error for an empty corpus", () => {
    expect(() => findClosestMatch(diagnose("hello"), [])).toThrow(/empty/i);
  });
});
