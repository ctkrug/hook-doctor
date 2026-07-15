import { describe, expect, it } from "vitest";
import { truncateToWordLimit } from "../../src/ui/truncate";

describe("truncateToWordLimit", () => {
  it("returns the original text untouched when under the limit", () => {
    const result = truncateToWordLimit("one two three", 5);
    expect(result).toEqual({ text: "one two three", wordCount: 3, truncated: false });
  });

  it("truncates to exactly the limit when over it", () => {
    const result = truncateToWordLimit("one two three four five", 3);
    expect(result.text).toBe("one two three");
    expect(result.truncated).toBe(true);
    expect(result.wordCount).toBe(5);
  });

  it("treats a word count exactly at the limit as not truncated", () => {
    const result = truncateToWordLimit("one two three", 3);
    expect(result.truncated).toBe(false);
  });

  it("handles empty input", () => {
    expect(truncateToWordLimit("", 2000)).toEqual({
      text: "",
      wordCount: 0,
      truncated: false,
    });
  });
});
