import { describe, expect, it } from "vitest";
import { diagnose } from "../src/analysis/diagnose";

describe("diagnose", () => {
  it("returns a Diagnosis shape for any input", () => {
    const result = diagnose("It was a dark and stormy night.");
    expect(result.input).toBe("It was a dark and stormy night.");
    expect(Array.isArray(result.rules)).toBe(true);
    expect(result.rules).toHaveLength(3);
    expect(typeof result.hookScore).toBe("number");
  });

  it("handles empty input without throwing", () => {
    expect(() => diagnose("")).not.toThrow();
    expect(diagnose("").hookScore).toBe(0);
  });

  it("scores a flat, generic opener in the low range (wow moment)", () => {
    const result = diagnose("It was a nice day and Sarah walked to the store.");
    expect(result.hookScore).toBeLessThan(50);
  });

  it("scores a strong in-medias-res opener with imagery and rhythm high (wow moment)", () => {
    const result = diagnose(
      '"Run!" she screamed. The blast tore through the iron gate, scattering glass and stone across the platform where children had been playing only moments before.',
    );
    expect(result.hookScore).toBeGreaterThan(75);
  });

  it("keeps the composite score within 0-100 for any rule combination", () => {
    const inputs = [
      "",
      "It was a dark and stormy night.",
      '"Get out," he said.',
      "Blood, glass, and iron covered the stone floor.",
    ];
    for (const input of inputs) {
      const { hookScore } = diagnose(input);
      expect(hookScore).toBeGreaterThanOrEqual(0);
      expect(hookScore).toBeLessThanOrEqual(100);
    }
  });
});
