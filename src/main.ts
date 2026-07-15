import { diagnose } from "./analysis/diagnose";
import { CORPUS } from "./analysis/corpus";
import { findClosestMatch } from "./analysis/match";
import { computeGaps } from "./analysis/compare";
import { buildAnnotation } from "./analysis/annotate";
import {
  renderComparison,
  renderEmptyState,
  renderErrorState,
  renderManuscriptPreview,
  renderRuleCards,
  renderScoreDial,
} from "./ui/render";
import { formatCopySummary } from "./ui/copySummary";
import { truncateToWordLimit } from "./ui/truncate";
import { debounce } from "./ui/debounce";

const WORD_LIMIT = 2000;
const LIVE_SCORE_DELAY_MS = 400;
const COPY_FEEDBACK_MS = 1500;

const SHELL = `
  <header class="masthead">
    <h1 class="wordmark">Hook Doct<span class="mark-o">o</span>r</h1>
    <p class="tagline">
      Paste your opening line and see exactly what famous first lines do that yours doesn't.
    </p>
  </header>
  <main class="workspace">
    <section class="panel manuscript-panel" aria-label="Your manuscript">
      <h2 class="panel-title">Manuscript</h2>
      <textarea
        id="input"
        class="manuscript-textarea"
        placeholder="Paste your opening line or paragraph..."
        aria-label="Your opening line or paragraph"
      ></textarea>
      <div class="manuscript-actions">
        <button id="diagnose" class="btn btn-primary" type="button">Diagnose</button>
        <button id="copy" class="btn btn-secondary" type="button" disabled>Copy result</button>
        <span id="word-count" class="word-count" aria-live="polite"></span>
      </div>
      <div id="manuscript-preview"></div>
    </section>
    <section class="panel diagnosis-panel" aria-label="Diagnosis">
      <h2 class="panel-title">Diagnosis</h2>
      <div id="diagnosis-body" aria-live="polite">${renderEmptyState()}</div>
    </section>
  </main>
`;

function render(): void {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) return;
  app.innerHTML = SHELL;

  const input = app.querySelector<HTMLTextAreaElement>("#input");
  const diagnoseButton = app.querySelector<HTMLButtonElement>("#diagnose");
  const copyButton = app.querySelector<HTMLButtonElement>("#copy");
  const wordCount = app.querySelector<HTMLSpanElement>("#word-count");
  const diagnosisBody = app.querySelector<HTMLDivElement>("#diagnosis-body");
  const manuscriptPreview = app.querySelector<HTMLDivElement>(
    "#manuscript-preview",
  );
  if (
    !input ||
    !diagnoseButton ||
    !copyButton ||
    !wordCount ||
    !diagnosisBody ||
    !manuscriptPreview
  ) {
    return;
  }

  let copySummary: string | null = null;
  let copyResetTimer: ReturnType<typeof setTimeout> | undefined;

  function updateWordCount(raw: string): void {
    const { wordCount: count, truncated } = truncateToWordLimit(
      raw,
      WORD_LIMIT,
    );
    if (!wordCount) return;
    if (count === 0) {
      wordCount.textContent = "";
      wordCount.classList.remove("is-over-limit");
      return;
    }
    wordCount.textContent = truncated
      ? `${count} words — diagnosing the first ${WORD_LIMIT}`
      : `${count} word${count === 1 ? "" : "s"}`;
    wordCount.classList.toggle("is-over-limit", truncated);
  }

  function runDiagnosis(): void {
    const raw = input?.value ?? "";
    const trimmed = raw.trim();
    updateWordCount(raw);

    if (trimmed === "") {
      diagnosisBody!.innerHTML = renderEmptyState();
      manuscriptPreview!.innerHTML = "";
      copySummary = null;
      copyButton!.disabled = true;
      return;
    }

    try {
      const { text: analyzed } = truncateToWordLimit(trimmed, WORD_LIMIT);
      const diagnosis = diagnose(analyzed);
      const matched = findClosestMatch(diagnosis, CORPUS);
      const gaps = computeGaps(diagnosis, matched.diagnosis);
      const annotation = buildAnnotation(diagnosis);

      diagnosisBody!.innerHTML =
        renderScoreDial(diagnosis.hookScore) +
        renderRuleCards(diagnosis.rules) +
        renderComparison(matched, gaps);
      manuscriptPreview!.innerHTML = renderManuscriptPreview(
        diagnosis,
        annotation,
      );

      copySummary = formatCopySummary(diagnosis, matched);
      copyButton!.disabled = false;
    } catch {
      diagnosisBody!.innerHTML = renderErrorState(
        "Something went wrong diagnosing that text — try a shorter passage.",
      );
      manuscriptPreview!.innerHTML = "";
      copySummary = null;
      copyButton!.disabled = true;
    }
  }

  const liveDiagnose = debounce(runDiagnosis, LIVE_SCORE_DELAY_MS);

  input.addEventListener("input", () => {
    updateWordCount(input.value);
    liveDiagnose();
  });

  diagnoseButton.addEventListener("click", () => {
    liveDiagnose.cancel();
    runDiagnosis();
  });

  copyButton.addEventListener("click", () => {
    if (!copySummary) return;
    const original = "Copy result";

    const showFeedback = (label: string): void => {
      copyButton.textContent = label;
      if (copyResetTimer) clearTimeout(copyResetTimer);
      copyResetTimer = setTimeout(() => {
        copyButton.textContent = original;
      }, COPY_FEEDBACK_MS);
    };

    if (!navigator.clipboard) {
      showFeedback("Copy unsupported");
      return;
    }

    navigator.clipboard
      .writeText(copySummary)
      .then(() => showFeedback("Copied"))
      .catch(() => showFeedback("Copy failed"));
  });
}

render();
