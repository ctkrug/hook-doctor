# Hook Doctor

**▶ Live demo: [apps.charliekrug.com/hook-doctor](https://apps.charliekrug.com/hook-doctor/)**

[![CI](https://github.com/ctkrug/hook-doctor/actions/workflows/ci.yml/badge.svg)](https://github.com/ctkrug/hook-doctor/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Score your opening line against the classics. Paste your first line, or your whole first
paragraph, and Hook Doctor scores it against the structural patterns famous first lines actually
use, then shows you a real published opener that nails what yours is missing.

## Who it's for

Novelists and short-story writers revising the one sentence that has to do the most work: the
opening line an agent, editor, or reader judges in seconds. Feedback on a hook is usually
subjective ("I liked it", "hook me faster"). Hook Doctor makes it concrete and repeatable.

## What it measures

Three structural traits, each grounded in real craft advice and each measurable from plain text:

- **In medias res.** Does the line drop the reader into motion, conflict, or dialogue, or does it
  warm up with scene-setting first ("It was...", "There was...")?
- **Concrete imagery.** How much of the sentence rides on specific, sensory nouns versus abstract
  filler like "situation" or "feeling"?
- **Sentence rhythm.** Do the first few sentences vary in length, or does everything run the same
  and read flat?

Each rule returns a 0 to 100 score with a plain-English reason, and the three roll up into one
weighted **Hook Score**. Every rule is a transparent heuristic, so you can read exactly why you
scored what you scored and disagree when the disagreement makes sense.

## The benchmark corpus

Your text is matched against the closest opener in a corpus of 34 famous first lines (Melville to
Morrison to Gibson), scored by the exact same rules run on your input. So "your imagery is low"
becomes "here is what a high-imagery opener looks like next to yours."

## Sample output

Paste a flat opener and you get a diagnosis, not just a number:

```
Hook Score: 38 / 100

In Medias Res   30   Opens with the scene-setting stall "It was" — describes
                     conditions instead of starting the action.
Concrete Imagery 50  No strongly concrete or abstract nouns detected.
Sentence Rhythm  33  Sentence lengths stay close (7-11 words) — uniform rhythm
                     reads flat.

Closest famous match: "It was the best of times, it was the worst of times."
                      A Tale of Two Cities, Charles Dickens
```

## Development

```sh
npm install
npm run dev            # local dev server
npm test               # run the test suite (Vitest)
npm run test:coverage  # coverage report
npm run lint           # eslint
npm run format         # prettier --write
npm run build          # typecheck + produce a static dist/ build
```

`npm run build` outputs a self-contained `dist/` that uses only relative asset paths, so it can
be served from any subpath (such as `apps.charliekrug.com/hook-doctor/`) without rewriting.

## Stack

Vanilla TypeScript, built with Vite, zero runtime dependencies. Everything runs client-side, so
nothing you paste ever leaves the browser.

## Docs

See [`docs/VISION.md`](docs/VISION.md) for the design rationale,
[`docs/DESIGN.md`](docs/DESIGN.md) for the visual direction,
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for how the code is organized, and
[`docs/BACKLOG.md`](docs/BACKLOG.md) for the build plan.

## License

MIT, see [`LICENSE`](LICENSE).

---

More of Charlie's projects: [apps.charliekrug.com](https://apps.charliekrug.com)
</content>
</invoke>
