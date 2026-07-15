# Architecture

A concise map of the codebase for anyone (including a future session) picking this up cold.
See [`docs/VISION.md`](VISION.md) for why these rules exist and [`docs/DESIGN.md`](DESIGN.md)
for the visual direction.

## Data flow

```
textarea input
      │
      ▼
src/analysis/diagnose.ts ── runs the three rules, computes the weighted Hook Score
      │                     (src/analysis/rules/{inMediasRes,imageryDensity,sentenceVariance}.ts)
      ▼
Diagnosis { input, rules[], hookScore }
      │
      ├──▶ src/analysis/match.ts        finds the closest CORPUS entry by score-vector distance
      ├──▶ src/analysis/compare.ts      flags rules where the match outscores the user
      └──▶ src/analysis/annotate.ts     picks the manuscript sentence + tone for the red-ink note
      │
      ▼
src/ui/render.ts ── pure functions turning the above into HTML strings
      │
      ▼
src/main.ts ── owns the DOM: wires events, debounce, word-count truncation, clipboard copy
```

Everything runs client-side; no network calls, no backend. `diagnose()` is a pure function of
the input string, which is what makes the corpus (`src/analysis/corpus.ts`) buildable by mapping
raw text through the same scoring path used on user input.

## Modules

**`src/analysis/`** — the rules engine, framework-free and independently testable.

- `text.ts` — shared regex helpers: `splitSentences`, `tokenizeWords`, `clamp`.
- `rules/inMediasRes.ts`, `rules/imageryDensity.ts`, `rules/sentenceVariance.ts` — the three
  structural rules from `docs/VISION.md`. Each returns a `RuleResult { id, label, score, detail }`.
- `diagnose.ts` — runs all three rules and rolls them into a weighted composite (`computeHookScore`,
  exported separately so the weighting math is testable without real text).
- `corpus.ts` / `../data/openers.ts` — the 30+ famous-opener benchmark; `openers.ts` holds raw
  `{title, author, text}`, `corpus.ts` maps it through `diagnose()` to attach real scores.
- `match.ts` — `findClosestMatch(diagnosis, corpus)`: nearest corpus entry by Euclidean distance
  over the rule-score vector; ties break by corpus array order.
- `compare.ts` — `computeGaps(user, matched)`: which rules the matched opener genuinely outscores
  the user on (never flags a rule the user already meets or beats).
- `annotate.ts` — `buildAnnotation(diagnosis)`: which manuscript sentence gets the red-ink (or
  green ok) marginalia, anchored to the in-medias-res rule on the opening sentence.
- `types.ts` — `RuleResult` / `Diagnosis` shared types.

**`src/ui/`** — DOM-agnostic rendering and small utilities, kept separate from `main.ts` so they're
testable without mounting the app.

- `render.ts` — pure HTML-string builders (score dial, rule cards, comparison panel, annotated
  manuscript preview, empty/error states). Escapes all user-derived text via `escapeHtml.ts`.
- `escapeHtml.ts` — HTML-escapes text before innerHTML insertion (pasted text is never trusted).
- `truncate.ts` — caps analysis input at 2000 words so a very long paste can't do unbounded work.
- `debounce.ts` — generic trailing-edge debounce with `cancel()`, used for live re-scoring.
- `copySummary.ts` — formats the plain-text "Copy result" clipboard summary.

**`src/main.ts`** — the only module that touches the DOM. Renders the app shell once, then wires:
textarea `input` → debounced re-diagnosis (400ms) and a live word count; the Diagnose button →
immediate re-diagnosis bypassing the debounce; the Copy button → clipboard write with
"Copied"/"Copy failed" feedback. All of `diagnose()` → `findClosestMatch()` → `computeGaps()` →
`buildAnnotation()` → `render*()` runs inside a try/catch that falls back to a designed error
state rather than a stack trace or blank panel.

**`src/style.css`** — the manuscript-editorial design system (tokens, layout, components) per
`docs/DESIGN.md`. CSS custom properties (`--score-color` etc.) are set inline from `render.ts` so
score-driven color stays in one place.

## Running it

```sh
npm install
npm run dev     # vite dev server
npm test        # vitest — tests live under tests/, mirroring src/
npm run lint    # eslint
npm run build   # tsc --noEmit + vite build → dist/ (relative paths, subpath-safe)
```

Tests mirror the `src/` layout 1:1 under `tests/` (e.g. `src/analysis/rules/inMediasRes.ts` →
`tests/rules/inMediasRes.test.ts`). `tests/main.test.ts` is the one integration test that mounts
the full app in jsdom to cover wiring (debounce timing, copy-to-clipboard, truncation) that the
pure-function tests can't reach on their own.
