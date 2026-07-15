import { describe, expect, it } from "vitest";
import { clamp, splitSentences, tokenizeWords } from "../src/analysis/text";

describe("splitSentences", () => {
  it("splits on sentence-ending punctuation followed by whitespace", () => {
    expect(splitSentences("Run! The house is on fire. Now what?")).toEqual([
      "Run!",
      "The house is on fire.",
      "Now what?",
    ]);
  });

  it("returns a single-element array for text with no terminal punctuation", () => {
    expect(splitSentences("no ending punctuation here")).toEqual([
      "no ending punctuation here",
    ]);
  });

  it("returns an empty array for empty or whitespace-only input", () => {
    expect(splitSentences("")).toEqual([]);
    expect(splitSentences("   \n\t  ")).toEqual([]);
  });
});

describe("tokenizeWords", () => {
  it("lowercases and strips punctuation from words", () => {
    expect(tokenizeWords("Sarah's dog RAN, fast!")).toEqual([
      "sarah's",
      "dog",
      "ran",
      "fast",
    ]);
  });

  it("returns an empty array when there are no words", () => {
    expect(tokenizeWords("... !? 123")).toEqual([]);
    expect(tokenizeWords("")).toEqual([]);
  });
});

describe("clamp", () => {
  it("passes values inside the range through unchanged", () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });

  it("clamps values below the minimum", () => {
    expect(clamp(-10, 0, 100)).toBe(0);
  });

  it("clamps values above the maximum", () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });
});
