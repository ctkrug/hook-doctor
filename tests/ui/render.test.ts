import { describe, expect, it } from "vitest";
import {
  renderComparison,
  renderEmptyState,
  renderErrorState,
  renderManuscriptPreview,
  renderRuleCards,
  renderScoreDial,
  scoreColor,
} from "../../src/ui/render";
import { diagnose } from "../../src/analysis/diagnose";
import { buildAnnotation } from "../../src/analysis/annotate";
import type { CorpusEntry } from "../../src/analysis/corpus";
import type { RuleGap } from "../../src/analysis/compare";

describe("scoreColor", () => {
  it("returns success for high scores", () => {
    expect(scoreColor(85)).toBe("var(--success)");
  });

  it("returns accent-support for mid scores", () => {
    expect(scoreColor(50)).toBe("var(--accent-support)");
  });

  it("returns accent for low scores", () => {
    expect(scoreColor(10)).toBe("var(--accent)");
  });
});

describe("renderScoreDial", () => {
  it("includes the numeric score", () => {
    expect(renderScoreDial(42)).toContain(">42<");
  });
});

describe("renderRuleCards", () => {
  it("renders one card per rule with its label, score, and escaped detail", () => {
    const diagnosis = diagnose('"Run!" she screamed.');
    const html = renderRuleCards(diagnosis.rules);
    for (const rule of diagnosis.rules) {
      expect(html).toContain(rule.label);
    }
  });

  it("escapes markup in a rule detail", () => {
    const html = renderRuleCards([
      { id: "x", label: "X", score: 10, detail: "<b>bad</b>" },
    ]);
    expect(html).not.toContain("<b>bad</b>");
    expect(html).toContain("&lt;b&gt;");
  });
});

describe("renderComparison", () => {
  const matched: CorpusEntry = {
    title: "Moby-Dick",
    author: "Herman Melville",
    text: "Call me Ishmael.",
    diagnosis: diagnose("Call me Ishmael."),
  };

  it("names the matched opener's title and author", () => {
    const html = renderComparison(matched, []);
    expect(html).toContain("Moby-Dick");
    expect(html).toContain("Herman Melville");
  });

  it("lists flagged gaps when present", () => {
    const gaps: RuleGap[] = [
      {
        id: "in-medias-res",
        label: "In Medias Res",
        userScore: 30,
        matchScore: 85,
      },
    ];
    const html = renderComparison(matched, gaps);
    expect(html).toContain("In Medias Res");
    expect(html).toContain("30");
    expect(html).toContain("85");
  });

  it("shows a no-gaps message when there are no gaps", () => {
    const html = renderComparison(matched, []);
    expect(html).toMatch(/matches or beats/i);
  });
});

describe("renderManuscriptPreview", () => {
  it("returns an empty string for empty input", () => {
    expect(renderManuscriptPreview(diagnose(""), null)).toBe("");
  });

  it("includes an ink-stroke svg for a flagged annotation", () => {
    const diagnosis = diagnose(
      "It was a nice day and Sarah walked to the store.",
    );
    const annotation = buildAnnotation(diagnosis);
    const html = renderManuscriptPreview(diagnosis, annotation);
    expect(html).toContain("ink-stroke");
    expect(html).toContain("margin-note");
  });

  it("omits the ink-stroke svg for an ok annotation but still shows the note", () => {
    const diagnosis = diagnose('"Run!" she screamed as the window shattered.');
    const annotation = buildAnnotation(diagnosis);
    const html = renderManuscriptPreview(diagnosis, annotation);
    expect(html).not.toContain("ink-stroke");
    expect(html).toContain("margin-note tone-ok");
  });
});

describe("empty and error states", () => {
  it("renders a designed empty state, not a blank string", () => {
    expect(renderEmptyState()).toContain("state-message");
  });

  it("renders an error state with the given escaped message", () => {
    const html = renderErrorState("<script>bad</script>");
    expect(html).toContain("is-error");
    expect(html).not.toContain("<script>bad</script>");
  });
});
