import type { RuleResult } from "../types";
import { splitSentences, tokenizeWords } from "../text";

export const IN_MEDIAS_RES_ID = "in-medias-res";

/** How many leading words of the opening sentence count as "the first few". */
const LOOKAHEAD_WORDS = 6;

const DIALOGUE_START = /^["'“‘]/;

/** Scene-setting stalls the craft-advice literature warns against. */
const STALL_STARTS: { pattern: RegExp; label: string }[] = [
  { pattern: /^it('s| was| is| were)\b/i, label: "It was" },
  { pattern: /^there('s| was| is| were)\b/i, label: "There was" },
];

/** Curated concrete action verbs (multiple tenses) that signal motion already underway. */
const ACTION_VERBS = new Set([
  "ran", "run", "running",
  "grabbed", "grab", "grabbing",
  "screamed", "scream", "screaming",
  "slammed", "slam", "slamming",
  "gasped", "gasp", "gasping",
  "seized", "seize", "seizing",
  "hurled", "hurl", "hurling",
  "leapt", "leaped", "leap", "leaping",
  "jumped", "jump", "jumping",
  "sprinted", "sprint", "sprinting",
  "exploded", "explode", "exploding",
  "shattered", "shatter", "shattering",
  "punched", "punch", "punching",
  "kicked", "kick", "kicking",
  "fired", "fire", "firing",
  "shot", "shoot", "shooting",
  "fell", "fall", "falling",
  "dove", "dive", "diving", "dived",
  "snapped", "snap", "snapping",
  "gripped", "grip", "gripping",
  "tore", "tear", "tearing", "torn",
  "ripped", "rip", "ripping",
  "spun", "spin", "spinning",
  "whirled", "whirl", "whirling",
  "lunged", "lunge", "lunging",
  "dragged", "drag", "dragging",
  "threw", "throw", "throwing", "thrown",
  "struck", "strike", "striking",
  "crashed", "crash", "crashing",
  "yelled", "yell", "yelling",
  "shouted", "shout", "shouting",
  "whispered", "whisper", "whispering",
  "roared", "roar", "roaring",
  "staggered", "stagger", "staggering",
  "stumbled", "stumble", "stumbling",
  "bolted", "bolt", "bolting",
  "fled", "flee", "fleeing",
  "chased", "chase", "chasing",
  "raced", "race", "racing",
  "darted", "dart", "darting",
  "collapsed", "collapse", "collapsing",
  "screeched", "screech", "screeching",
]);

/**
 * Scores whether the opening sentence starts mid-action or mid-dialogue
 * (in medias res) versus stalling on scene-setting description.
 * See docs/VISION.md's first structural rule.
 */
export function inMediasRes(input: string): RuleResult {
  const label = "In Medias Res";
  const [first] = splitSentences(input);

  if (!first) {
    return {
      id: IN_MEDIAS_RES_ID,
      label,
      score: 0,
      detail: "There's no text yet — paste an opening line to diagnose it.",
    };
  }

  if (DIALOGUE_START.test(first)) {
    return {
      id: IN_MEDIAS_RES_ID,
      label,
      score: 85,
      detail:
        "Opens on dialogue — the reader lands mid-conversation, already in motion.",
    };
  }

  for (const stall of STALL_STARTS) {
    if (stall.pattern.test(first)) {
      return {
        id: IN_MEDIAS_RES_ID,
        label,
        score: 30,
        detail: `Opens with the scene-setting stall "${stall.label}" — describes conditions instead of starting the action.`,
      };
    }
  }

  const leadingWords = tokenizeWords(first).slice(0, LOOKAHEAD_WORDS);
  const actionWord = leadingWords.find((w) => ACTION_VERBS.has(w));
  if (actionWord) {
    return {
      id: IN_MEDIAS_RES_ID,
      label,
      score: 75,
      detail: `Opens near an action verb ("${actionWord}") within the first few words — starts mid-motion.`,
    };
  }

  return {
    id: IN_MEDIAS_RES_ID,
    label,
    score: 50,
    detail:
      "No clear in medias res marker — opens on description rather than action, conflict, or dialogue.",
  };
}
