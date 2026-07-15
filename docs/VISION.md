# Vision

## The problem

Writers know an opening line matters, but feedback on one is almost always subjective: "I liked
it," "it's a bit slow," "hook me faster." That's not actionable. Craft books talk about in
medias res, concrete imagery, and sentence rhythm as if they're measurable — but nobody has
turned them into something you can paste your own sentence into and get a real answer from.

## Who it's for

Writers revising an opening: novelists, short-story writers, essayists, even cover-letter and
blog writers who know the first line decides whether anyone reads the second. Not a grading tool
for a finished manuscript — a diagnostic for the one sentence that has to do the most work.

## The core idea

Three structural rules, each grounded in real craft advice, each independently measurable from
plain text:

1. **In medias res** — does the sentence open on motion, conflict, or dialogue already
   in progress, or does it stall on scene-setting ("It was...", "There was...")?
2. **Concrete imagery density** — how much of the sentence is carried by specific, sensory
   nouns versus abstract filler ("the situation", "a feeling")?
3. **Sentence-length variance** — famous openers rarely run one uniform sentence length; they
   vary rhythm across the first few sentences. Uniform length reads flat even when the words
   are fine.

Each rule produces a 0–100 score and a plain-English reason. The three roll up into a composite
**Hook Score**. Critically, the score isn't just a number: Hook Doctor matches your text against
the closest opener in a benchmark corpus of real, famous first lines and shows it side by side,
so "your imagery density is low" becomes "here's what a high-imagery opener looks like next to
yours."

## Key design decisions

- **Explainable over clever.** Every rule is a transparent heuristic over plain text — no ML
  model, no black box. A writer should be able to read the detail line and understand exactly
  why they scored what they scored, and disagree with the engine if the disagreement makes
  sense.
- **Benchmarked against real prose, not an abstract rubric.** The corpus of famous openers is
  the ground truth. Scores are calibrated so that well-known strong openers land high and
  well-known weak/parody openers ("It was a dark and stormy night") land low.
- **Diagnosis, not a grade.** The product frames results as a doctor's read-out — score plus
  the reasoning plus a comparison — never a bare pass/fail. The name and framing are earned by
  actually explaining the "why," not just producing a number.
- **Zero backend.** Everything — the rules engine and the benchmark corpus — runs client-side in
  the browser. No text a writer pastes ever leaves their machine. This is also why the stack is
  a static site: no server to run, no cost, no privacy question to answer.
- **Live, not click-to-submit.** The tool should feel like a diagnostic instrument you can lean
  on while revising, not a form you submit once. Re-scoring as you type is a deliberate goal for
  v1, not a stretch feature.

## What "v1 done" looks like

- Paste a paragraph, get an instant composite Hook Score with a per-rule breakdown.
- See the closest-matching famous opener from the benchmark corpus, side by side with your text,
  highlighting what it does that yours doesn't.
- All three rules implemented and each independently produces a sane, explainable score across a
  range of test inputs (obviously weak openers score low, famous strong openers score high).
- The page is a polished, single static site deployable to `apps.charliekrug.com/hook-doctor`,
  with no server dependency and no data leaving the browser.
