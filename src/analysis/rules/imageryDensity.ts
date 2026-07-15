import type { RuleResult } from "../types";
import { clamp, tokenizeWords } from "../text";

export const IMAGERY_DENSITY_ID = "imagery-density";

/** Score change per net concrete-vs-abstract word, off a neutral baseline of 50. */
const POINTS_PER_WORD = 15;

/** Specific, sensory nouns — the "show" half of concrete vs. abstract. */
const CONCRETE_NOUNS = new Set([
  "blood",
  "rain",
  "glass",
  "iron",
  "stone",
  "steel",
  "bone",
  "ash",
  "smoke",
  "fire",
  "ice",
  "snow",
  "dust",
  "mud",
  "wood",
  "brick",
  "knife",
  "gun",
  "wire",
  "nail",
  "salt",
  "sand",
  "wave",
  "thunder",
  "thorn",
  "feather",
  "leather",
  "silk",
  "copper",
  "rust",
  "gravel",
  "granite",
  "timber",
  "bark",
  "root",
  "branch",
  "moss",
  "rope",
  "chain",
  "flame",
  "shadow",
  "shard",
  "splinter",
  "gravestone",
  "candle",
  "lantern",
  "boot",
  "fist",
  "tongue",
  "skin",
  "sweat",
  "tear",
  "scar",
]);

/** Abstract filler nouns — "the situation", "a feeling" — with no sensory weight. */
const ABSTRACT_NOUNS = new Set([
  "feeling",
  "truth",
  "reality",
  "situation",
  "idea",
  "concept",
  "notion",
  "belief",
  "justice",
  "freedom",
  "fate",
  "destiny",
  "meaning",
  "purpose",
  "existence",
  "consciousness",
  "emotion",
  "thought",
  "opinion",
  "value",
  "principle",
  "theory",
  "faith",
  "circumstance",
  "condition",
  "essence",
  "possibility",
  "potential",
  "experience",
  "perspective",
  "awareness",
  "wisdom",
  "knowledge",
  "understanding",
  "nature",
  "society",
  "culture",
]);

/**
 * Scores how much of the text is carried by concrete, sensory nouns versus
 * abstract filler. See docs/VISION.md's second structural rule.
 */
export function imageryDensity(input: string): RuleResult {
  const label = "Concrete Imagery";
  const words = tokenizeWords(input);

  if (words.length === 0) {
    return {
      id: IMAGERY_DENSITY_ID,
      label,
      score: 0,
      detail: "There's no text yet — paste an opening line to diagnose it.",
    };
  }

  const concrete = words.filter((w) => CONCRETE_NOUNS.has(w));
  const abstract = words.filter((w) => ABSTRACT_NOUNS.has(w));
  const score = clamp(
    50 + (concrete.length - abstract.length) * POINTS_PER_WORD,
    0,
    100,
  );

  let detail: string;
  if (concrete.length > 0) {
    detail = `Detected concrete imagery like "${concrete[0]}" carrying sensory weight.`;
  } else if (abstract.length > 0) {
    detail = `Leans on abstract language like "${abstract[0]}" instead of sensory detail.`;
  } else {
    detail =
      "No strongly concrete or abstract nouns detected — imagery is neutral.";
  }

  return { id: IMAGERY_DENSITY_ID, label, score, detail };
}
