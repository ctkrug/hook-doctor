import { describe, expect, it } from "vitest";
import { formatCopySummary } from "../../src/ui/copySummary";
import { diagnose } from "../../src/analysis/diagnose";
import type { CorpusEntry } from "../../src/analysis/corpus";

describe("formatCopySummary", () => {
  it("includes the hook score and the weakest rule's detail", () => {
    const diagnosis = diagnose("It was a nice day and Sarah walked to the store.");
    const summary = formatCopySummary(diagnosis);
    expect(summary).toContain(`Hook Score: ${diagnosis.hookScore}/100`);
    const weakest = diagnosis.rules.reduce((min, r) => (r.score < min.score ? r : min));
    expect(summary).toContain(weakest.detail);
  });

  it("appends the matched opener's title and author when provided", () => {
    const diagnosis = diagnose("Call me Ishmael.");
    const matched: CorpusEntry = {
      title: "Moby-Dick",
      author: "Herman Melville",
      text: "Call me Ishmael.",
      diagnosis,
    };
    const summary = formatCopySummary(diagnosis, matched);
    expect(summary).toContain("Moby-Dick");
    expect(summary).toContain("Herman Melville");
  });

  it("degrades gracefully for a diagnosis with no rules", () => {
    const summary = formatCopySummary({ input: "", hookScore: 0, rules: [] });
    expect(summary).toBe("Hook Score: 0/100");
  });
});
