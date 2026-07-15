import type { Diagnosis } from "../analysis/types";
import type { CorpusEntry } from "../analysis/corpus";
import type { RuleGap } from "../analysis/compare";
import type { Annotation } from "../analysis/annotate";
import { splitSentences } from "../analysis/text";
import { escapeHtml } from "./escapeHtml";

/** CSS color custom-property value for a 0-100 score. */
export function scoreColor(score: number): string {
  if (score >= 70) return "var(--success)";
  if (score >= 45) return "var(--accent-support)";
  return "var(--accent)";
}

export function renderScoreDial(hookScore: number): string {
  return `
    <div class="score-dial">
      <div class="score-dial-ring" style="--pct:${hookScore};--score-color:${scoreColor(hookScore)}">
        <span class="score-dial-number">${hookScore}</span>
      </div>
      <div>
        <div class="score-dial-headline">Hook Score</div>
        <p class="score-dial-label">out of 100, weighted across all three rules</p>
      </div>
    </div>`;
}

function renderRuleCard(rule: Diagnosis["rules"][number]): string {
  const color = scoreColor(rule.score);
  return `
    <li class="rule-card">
      <div class="rule-card-header">
        <span class="rule-card-label">${escapeHtml(rule.label)}</span>
        <span class="rule-card-score" style="--score-color:${color}">${rule.score}</span>
      </div>
      <div class="rule-bar-track">
        <div class="rule-bar-fill" style="width:${rule.score}%;--score-color:${color}"></div>
      </div>
      <p class="rule-card-detail">${escapeHtml(rule.detail)}</p>
    </li>`;
}

export function renderRuleCards(rules: Diagnosis["rules"]): string {
  return `<ul class="rule-cards">${rules.map(renderRuleCard).join("")}</ul>`;
}

export function renderComparison(matched: CorpusEntry, gaps: RuleGap[]): string {
  const gapList =
    gaps.length > 0
      ? `<ul class="comparison-gaps">${gaps
          .map(
            (g) =>
              `<li class="comparison-gap">${escapeHtml(g.label)}: they score ${g.matchScore} vs. your ${g.userScore}</li>`,
          )
          .join("")}</ul>`
      : `<p class="comparison-no-gaps">Your text already matches or beats this opener on every rule.</p>`;

  return `
    <div class="comparison-panel">
      <span class="comparison-badge">Closest famous match</span>
      <p class="comparison-text">&ldquo;${escapeHtml(matched.text)}&rdquo;</p>
      <p class="comparison-source">&mdash; ${escapeHtml(matched.title)}, ${escapeHtml(matched.author)}</p>
      ${gapList}
    </div>`;
}

/** Renders the manuscript with the annotated sentence marked up in red ink (or a green ok note). */
export function renderManuscriptPreview(
  diagnosis: Diagnosis,
  annotation: Annotation | null,
): string {
  const sentences = splitSentences(diagnosis.input);
  if (sentences.length === 0) return "";

  const spans = sentences
    .map((sentence, index) => {
      const text = escapeHtml(sentence);
      if (!annotation || index !== annotation.sentenceIndex) {
        return `<span class="manuscript-sentence">${text}</span>`;
      }
      const isFlagged = annotation.tone === "flag";
      const stroke = isFlagged
        ? `<svg class="ink-stroke" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5 Q 25 1, 50 5 T 98 5" /></svg>`
        : "";
      return `<span class="manuscript-sentence${isFlagged ? " is-flagged" : ""}">${text}${stroke}</span>`;
    })
    .join(" ");

  const note = `
    <div class="margin-note${annotation?.tone === "ok" ? " tone-ok" : ""}">
      <span class="margin-note-icon" aria-hidden="true">${annotation?.tone === "ok" ? "✓" : "✎"}</span>
      <span>${escapeHtml(annotation?.note ?? "")}</span>
    </div>`;

  return `<p class="manuscript-preview">${spans}</p>${annotation ? note : ""}`;
}

export function renderEmptyState(): string {
  return `<div class="state-message">Paste an opening line or paragraph, then click Diagnose to see your Hook Score.</div>`;
}

export function renderErrorState(message: string): string {
  return `<div class="state-message is-error" role="alert">${escapeHtml(message)}</div>`;
}
