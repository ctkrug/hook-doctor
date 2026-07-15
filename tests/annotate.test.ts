import { describe, expect, it } from "vitest";
import { buildAnnotation } from "../src/analysis/annotate";
import { diagnose } from "../src/analysis/diagnose";

describe("buildAnnotation", () => {
  it("flags the first sentence in red-ink tone when in medias res scores below threshold", () => {
    const annotation = buildAnnotation(diagnose("It was a nice day and Sarah walked to the store."));
    expect(annotation?.tone).toBe("flag");
    expect(annotation?.sentenceIndex).toBe(0);
    expect(annotation?.note.length).toBeGreaterThan(0);
  });

  it("marks the first sentence 'ok' when in medias res scores at or above threshold", () => {
    const annotation = buildAnnotation(diagnose('"Run!" she screamed as the window shattered.'));
    expect(annotation?.tone).toBe("ok");
  });

  it("returns null for empty input", () => {
    expect(buildAnnotation(diagnose(""))).toBeNull();
  });

  it("anchors to the exact first sentence text", () => {
    const annotation = buildAnnotation(
      diagnose("She ran. The city burned behind her."),
    );
    expect(annotation?.sentence).toBe("She ran.");
  });
});
