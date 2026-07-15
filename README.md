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

## Planned features

- [ ] Paste-and-score editor with instant composite Hook Score
- [ ] Per-rule breakdown (in medias res / imagery density / sentence variance)
- [ ] Benchmark corpus of famous opening lines with precomputed scores
- [ ] Nearest-match famous opener shown side-by-side with your text
- [ ] Live re-scoring as you type
- [ ] Fully static, deployable as a single-page site

See [`docs/VISION.md`](docs/VISION.md) for the full design rationale and
[`docs/BACKLOG.md`](docs/BACKLOG.md) for the build plan.

## Stack

Vanilla TypeScript, built with Vite, zero runtime dependencies. Tests run with Vitest.

## Development

```sh
npm install
npm run dev       # local dev server
npm test          # run the test suite
npm run build     # produce a static dist/ build
```

## License

MIT — see [`LICENSE`](LICENSE).
