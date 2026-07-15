import type { Diagnosis } from "./types";

/** A rule where the matched corpus opener outscores the user's text. */
export interface RuleGap {
  id: string;
  label: string;
  userScore: number;
  matchScore: number;
}

/**
 * Returns the rules where `matched` strictly outscores `user`. A rule the
 * user already meets or exceeds is not a gap — per docs/BACKLOG.md 2.3,
 * the comparison should only flag where the famous opener genuinely does
 * something the user's text doesn't.
 */
export function computeGaps(user: Diagnosis, matched: Diagnosis): RuleGap[] {
  const gaps: RuleGap[] = [];
  for (const userRule of user.rules) {
    const matchedRule = matched.rules.find((r) => r.id === userRule.id);
    if (matchedRule && matchedRule.score > userRule.score) {
      gaps.push({
        id: userRule.id,
        label: userRule.label,
        userScore: userRule.score,
        matchScore: matchedRule.score,
      });
    }
  }
  return gaps;
}
