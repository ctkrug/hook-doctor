---
title: "I built a tool that scores your opening line against famous first lines"
published: false
tags: javascript, typescript, webdev, writing
---

Every writer has been told the first line matters. Almost nobody gets useful feedback on theirs.
You hand someone your opening sentence and you get "I liked it" or "hook me faster," which tells
you nothing you can act on. So I built [Hook Doctor](https://apps.charliekrug.com/hook-doctor/):
you paste your opening line and it scores it against the structural patterns that famous first
lines actually use, then shows you the closest published opener for comparison.

It is a small static site: vanilla TypeScript, built with Vite, zero runtime dependencies,
everything running in the browser. Here are the two decisions I found most interesting to build.

## Score the corpus with the same function you score the user with

Hook Doctor measures three things: whether the line opens in medias res, how dense its concrete
imagery is, and how much its sentence lengths vary. Each rule is a plain function from text to a
0 to 100 score with a reason string. The composite Hook Score is a weighted average.

The part I like is the benchmark corpus. I have 34 famous openers (Melville, Morrison, Gibson,
and one deliberately bad one so the range is honest). The obvious way to build that corpus is to
hand-score each entry. I did not do that. Instead the corpus is the raw text run through the
exact same `diagnose()` function that scores user input:

```ts
export const CORPUS = OPENERS.map((opener) => ({
  ...opener,
  diagnosis: diagnose(opener.text),
}));
```

Because a corpus entry and a pasted sentence go through identical scoring, "find the closest
famous opener" is just nearest-neighbor over the rule-score vectors. No calibration drift between
the two sides of the comparison is possible, because there is only one scoring path. When I tune
a rule, the corpus re-scores itself. That property fell out of keeping `diagnose()` pure, and it
made the match feature almost free to write.

## The annotation that broke on line wrap

The signature visual is red-ink marginalia: the flagged sentence gets a hand-drawn wavy underline
that animates on, like an editor marking up a page. My first version drew that underline as an
absolutely positioned SVG stroke under the sentence span.

It looked great until a sentence wrapped onto two lines. An SVG overlay tracks a single bounding
box, so on a wrapped sentence the stroke stranded itself under only the last line's words and
pointed at the wrong text. The fix was to stop fighting the layout engine and use
`text-decoration-style: wavy` with an animated `text-decoration-color`:

```css
.manuscript-sentence.is-flagged {
  text-decoration: underline wavy var(--accent);
  animation: ink-draw 180ms ease-out both;
}
@keyframes ink-draw {
  from { text-decoration-color: transparent; }
}
```

The browser paints text-decoration correctly per line box on wrap for free, and I kept the
animated draw-on and the hand-drawn feel. Less code, and it behaves at every width.

## What I would do differently

The rules are curated word lists and regexes, not a model. That was on purpose: I wanted a writer
to read the reason and disagree when the disagreement is fair, which you cannot do with a black
box. The trade-off is coverage. The action-verb and concrete-noun lists are finite, so a vivid
verb I never listed reads as neutral. If I take this further, the interesting work is widening
those lists without turning the thing into a model that can no longer explain itself.

One thing I decided against: making it a "first line generator." The internet has enough tools
that write the sentence for you. Diagnosing the line you already wrote, and showing you a real
book that does the move better, respects the writer more.

Live: [apps.charliekrug.com/hook-doctor](https://apps.charliekrug.com/hook-doctor/)
Code: [github.com/ctkrug/hook-doctor](https://github.com/ctkrug/hook-doctor)
</content>
