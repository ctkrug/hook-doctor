import { describe, expect, it } from "vitest";
import { diagnose } from "../src/analysis/diagnose";

describe("diagnose", () => {
  it("returns a Diagnosis shape for any input", () => {
    const result = diagnose("It was a dark and stormy night.");
    expect(result.input).toBe("It was a dark and stormy night.");
    expect(Array.isArray(result.rules)).toBe(true);
    expect(typeof result.hookScore).toBe("number");
  });

  it("handles empty input without throwing", () => {
    expect(() => diagnose("")).not.toThrow();
  });
});
