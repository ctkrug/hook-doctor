# Backlog

Epics are ordered so the wow moment (1.1) lands first. Every story has concrete, checkable
acceptance criteria — no vibes.

## Epic 1 — Core Diagnosis Engine

### [ ] 1.1 Paste your opening line and see it diagnosed (wow moment)

- [ ] Pasting a flat, generic opener (e.g. "It was a nice day and Sarah walked to the store.")
      produces a composite Hook Score visibly in the low range (< 50).
- [ ] Pasting a well-known strong opener produces a visibly high score (> 75).
- [ ] Clicking "Diagnose" with empty input shows a designed empty-state message, not a crash or
      blank panel.

### [x] 1.2 In-medias-res rule

- [x] A sentence opening on dialogue or an action verb within the first few words scores in the
      top half (> 60).
- [x] A sentence opening with a scene-setting stall ("It was...", "There was...") scores in the
      bottom half (< 50).
- [x] The rule's detail string names the specific word or construction that drove the score.

### [x] 1.3 Concrete imagery density rule

- [x] A sentence dense in concrete sensory nouns (e.g. blood, rain, glass, iron) scores higher
      than a same-length sentence dense in abstract nouns (e.g. feeling, truth, reality).
- [x] The rule's detail names at least one concrete or abstract word it detected, when present.

### [x] 1.4 Sentence-length variance rule + composite score

- [x] Three-plus sentences of near-identical word count score low (< 40) on variance.
- [x] A mix of short and long sentences (e.g. 4 words then 22 words) scores high (> 70).
- [x] A single-sentence input degrades gracefully — a documented fallback score/detail, no crash.
- [x] The composite Hook Score is a weighted average of the three rule scores, always 0–100, and
      moves predictably when any one rule's score changes (covered by a unit test).

### [ ] 1.5 Design polish — diagnosis view

- [ ] Manuscript/diagnosis split layout matches `docs/DESIGN.md` tokens and layout intent at
      1440px and 390px.
- [ ] The red-ink annotation flourish appears on at least one flagged sentence.
- [ ] Favicon and wordmark are implemented per `docs/DESIGN.md` (no default globe icon).

## Epic 2 — Benchmark Corpus & Comparison

### [x] 2.1 Curate a benchmark corpus of famous opening lines

- [x] `src/data` contains 30+ entries, each with source title, author, and opening text.
- [x] Every entry's rule scores are computed by the same scoring functions used on user input —
      no hand-typed scores.
- [x] A test asserts the corpus loads and every entry has all three rule scores populated.

### [x] 2.2 Nearest-match algorithm

- [x] Given a diagnosis, the match function returns the single closest corpus entry by
      score-vector distance.
- [x] Ties are broken by a documented, deterministic rule.
- [x] A test with a synthetic diagnosis identical to a known corpus entry's scores returns that
      exact entry.

### [ ] 2.3 Side-by-side comparison UI

- [ ] The matched famous opener renders next to the user's text, with the specific rule(s) where
      it outscores the user's text visually flagged.
- [ ] If the user's score already meets or exceeds the matched opener on a rule, that rule is
      NOT flagged as a gap.

### [ ] 2.4 Design polish — comparison panel

- [ ] The comparison panel uses `--accent-support` distinctly from the primary `--accent`, per
      `docs/DESIGN.md`.
- [ ] Panel is legible and fully composed at 390px phone width with no overlap or truncation.

## Epic 3 — Editor Experience, Accessibility & Deploy

### [ ] 3.1 Live re-scoring as you type

- [ ] Typing triggers a re-diagnosis within 400ms of the user pausing, no manual click required.
- [ ] Rapid keystrokes do not trigger a diagnosis on every keystroke (debounce verified by a test
      using fake timers).

### [ ] 3.2 Shareable / copyable result

- [ ] A "Copy result" control copies a plain-text summary (score + top rule detail) to the
      clipboard.
- [ ] The action gives visible confirmation feedback (e.g. button label changes to "Copied").

### [ ] 3.3 Empty, loading, and error states

- [ ] Empty input shows a styled placeholder/empty state, not a blank panel (may satisfy 1.1's
      criterion directly).
- [ ] Extremely long input (> 2000 words) does not freeze the UI; a visible indicator or
      truncation notice appears.

### [ ] 3.4 Responsive and accessibility pass

- [ ] Layout has no horizontal scroll or overlap at 390px, 768px, and 1440px.
- [ ] Every interactive control has a visible focus-visible state; icon-only controls get an
      `aria-label`.
- [ ] A manual or automated accessibility check finds no critical violations on the main view
      (documented in the QA run's STATUS memory).

### [ ] 3.5 Static build deployable to a subpath

- [ ] `npm run build` produces a self-contained `dist/` using only relative asset paths (no
      leading `/`).
- [ ] `dist/index.html` renders correctly when served from a non-root subpath (verified by
      serving `dist/` under a subdirectory locally).

### [ ] 3.6 Design polish — full page pass

- [ ] Every interactive control (textarea, buttons) has themed hover, focus, active, and
      disabled states per `docs/DESIGN.md` — no naked native widgets.
- [ ] Page matches `docs/DESIGN.md`'s direction end to end at mobile and desktop; squint test
      (hierarchy readable at a glance) passes.
