# Hook Doctor

Paste your opening line — or your whole first paragraph — and get a diagnosis. Hook Doctor
scores it against the structural patterns that famous first lines actually use, then shows you
a real published opener that nails what yours is missing.

## What it does

Most "is my hook good?" advice is vibes. Hook Doctor is a small rules engine that measures the
three structural traits that separate a flat opener from a magnetic one:

- **In medias res** — does the line drop the reader into motion/conflict, or does it warm up
  with scene-setting first?
- **Concrete imagery density** — how many specific, sensory nouns carry the sentence versus
  abstract filler?
- **Sentence-length variance** — do the surrounding sentences vary in rhythm, or does everything
  run the same length?

Your text gets scored on each axis, a composite Hook Score, and matched against the closest
famous opening line in the benchmark corpus — so you can see exactly what a stronger version of
your own sentence would look like.

## Why

Writers workshop their hooks by ear, which means the feedback is either "I liked it" or nothing.
Hook Doctor turns three well-documented craft patterns into a repeatable, explainable score, and
grounds every score in a real published counter-example instead of an abstract number.

## Features

- [x] Paste-and-score editor with instant composite Hook Score
- [x] Per-rule breakdown (in medias res / imagery density / sentence variance)
- [x] Benchmark corpus of 30+ famous opening lines with precomputed scores
- [x] Nearest-match famous opener shown side-by-side with your text, gaps flagged
- [x] Live re-scoring as you type (400ms debounce), plus an explicit Diagnose button
- [x] Copy-result control with a plain-text score summary
- [x] Fully static, deployable as a single-page site under a subpath

See [`docs/VISION.md`](docs/VISION.md) for the full design rationale,
[`docs/DESIGN.md`](docs/DESIGN.md) for the visual direction, [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
for how the code is organized, and [`docs/BACKLOG.md`](docs/BACKLOG.md) for the build plan.

## Stack

Vanilla TypeScript, built with Vite, zero runtime dependencies. Tests run with Vitest.

## Development

```sh
npm install
npm run dev       # local dev server
npm test          # run the test suite
npm run lint      # eslint
npm run format    # prettier --write
npm run build     # typecheck + produce a static dist/ build
```

`npm run build` outputs a self-contained `dist/` that only uses relative asset paths, so it can
be served from any subpath (e.g. `apps.charliekrug.com/hook-doctor/`) without rewriting.

## License

MIT — see [`LICENSE`](LICENSE).
