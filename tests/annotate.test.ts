import { describe, expect, it } from "vitest";
import { buildAnnotation } from "../src/analysis/annotate";
import { diagnose } from "../src/analysis/diagnose";
import { IN_MEDIAS_RES_ID } from "../src/analysis/rules/inMediasRes";
import type { Diagnosis } from "../src/analysis/types";

/** inMediasRes only ever emits {0,30,50,75,85}, so the flag/ok boundary at
 * exactly the threshold can't be reached through diagnose() — build a
 * synthetic Diagnosis to pin down the boundary directly. */
function diagnosisWithInMediasResScore(score: number): Diagnosis {
  return {
    input: "She stood there.",
    rules: [
      { id: IN_MEDIAS_RES_ID, label: "In Medias Res", score, detail: "" },
    ],
    hookScore: score,
  };
}

describe("buildAnnotation", () => {
  it("flags the first sentence in red-ink tone when in medias res scores below threshold", () => {
    const annotation = buildAnnotation(
      diagnose("It was a nice day and Sarah walked to the store."),
    );
    expect(annotation?.tone).toBe("flag");
    expect(annotation?.sentenceIndex).toBe(0);
    expect(annotation?.note.length).toBeGreaterThan(0);
  });

  it("marks the first sentence 'ok' when in medias res scores at or above threshold", () => {
    const annotation = buildAnnotation(
      diagnose('"Run!" she screamed as the window shattered.'),
    );
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

  it("treats a score exactly at the flag threshold as 'ok', not 'flag'", () => {
    const annotation = buildAnnotation(diagnosisWithInMediasResScore(60));
    expect(annotation?.tone).toBe("ok");
  });

  it("flags a score one point below the threshold", () => {
    const annotation = buildAnnotation(diagnosisWithInMediasResScore(59));
    expect(annotation?.tone).toBe("flag");
  });
});
