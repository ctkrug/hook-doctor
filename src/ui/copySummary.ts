import type { Diagnosis } from "../analysis/types";
import type { CorpusEntry } from "../analysis/corpus";

/** Plain-text summary for the "Copy result" control: score + the most actionable rule detail. */
export function formatCopySummary(diagnosis: Diagnosis, matched?: CorpusEntry): string {
  if (diagnosis.rules.length === 0) {
    return `Hook Score: ${diagnosis.hookScore}/100`;
  }

  const weakest = diagnosis.rules.reduce((min, rule) =>
    rule.score < min.score ? rule : min,
  );
  const base = `Hook Score: ${diagnosis.hookScore}/100 — ${weakest.label}: ${weakest.detail}`;

  return matched ? `${base} (closest match: "${matched.title}" by ${matched.author})` : base;
}
