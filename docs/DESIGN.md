# Design

## Aesthetic direction

**Manuscript editorial.** Hook Doctor looks like a copy editor's desk: warm paper, black ink
body text, and a red pen for annotations. The "doctor" framing is literal — your pasted text is
the manuscript, the score is the diagnosis, and the rule feedback appears as red-ink marginalia
directly on your own sentence, the way an editor would mark up a page. Not clinical-cold, not
playful-toy: precise, literary, a little formal, warmed by paper texture instead of clean
digital chrome.

This is deliberately a different lane from the recent portfolio direction of dark-glass /
neon-accent utilities — a light, paper-toned editorial page stands out next to those.

## Tokens

| Token              | Value     | Use                                                        |
| ------------------ | --------- | ---------------------------------------------------------- |
| `--bg`             | `#F3EEE1` | page background — warm cream paper                         |
| `--surface-1`      | `#FFFDF7` | manuscript card (the textarea's paper)                     |
| `--surface-2`      | `#E9E0CB` | secondary panel (score card, corpus match)                 |
| `--text`           | `#211C15` | body ink                                                   |
| `--text-muted`     | `#6E6455` | captions, helper text                                      |
| `--accent`         | `#B0241D` | the red pen — annotations, score highlights, primary CTA   |
| `--accent-support` | `#8A6D1F` | mustard/gold — secondary highlight, the corpus-match badge |
| `--success`        | `#3C6B3E` | strong score / approval stamp green                        |
| `--danger`         | `#B0241D` | reuses accent — the red pen doubles as the warning color   |

**Type pairing:** `Playfair Display` (display serif — wordmark, H1, the score number) paired
with `IBM Plex Sans` (UI font — body copy, textarea, buttons, labels). Both from Google Fonts
with system serif/sans-serif fallbacks.

**Spacing:** 8px base unit (8/16/24/32/48/64).

**Corner radius:** 3px — sharp enough to read as paper/card, not a soft app bubble.

**Shadow:** soft, warm-toned paper shadow (`0 1px 2px rgba(33,28,21,.08), 0 8px 24px
rgba(33,28,21,.10)`), never a cool-gray drop shadow.

**Motion:** UI transitions 150–200ms ease-out. The signature red-ink annotation draws on with a
180ms stroke animation, like a pen mark landing.

## Layout intent

The hero is the **manuscript + diagnosis split**: the pasted text (styled as a paper manuscript
page) on one side, the score dial and rule breakdown on the other. At 1440×900 desktop, this is
a two-column layout — manuscript ~55% width, diagnosis panel ~45% — filling the viewport with a
thin masthead above (the wordmark, styled like a magazine nameplate). At 390×844 phone, it
stacks: masthead, manuscript textarea, then diagnosis panel below, each section filling the
width with generous padding rather than shrinking to fit.

## Signature detail

Red-ink marginalia: when a rule flags something (e.g. a weak opener), a short red annotation
appears in the margin next to the relevant sentence — not just a score in a panel — styled with
a hand-drawn-feeling underline/circle SVG stroke that draws on with the 180ms animation. This is
the flourish that makes the "doctor" metaphor land: the reader sees their own sentence marked up,
not just a number in a box.

The wordmark "Hook Doctor" sets "Hook" in the display serif and treats the second "o" in
"Doctor" as a small red-ink caret/circle mark, like a proofreading symbol.

## Notes for BUILD/QA

This is a diagnostic utility, not a game — no juice/SFX plan applies (D1.5 is games/toys only).
Interaction-state and depth requirements from the shared design standard (D2) still apply in
full: themed textarea/button states, layered paper shadows, favicon (a red-ink caret mark on
cream), and no flat single-hue panels.
