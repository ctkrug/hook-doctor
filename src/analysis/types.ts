/** The score and explanation for one structural rule. */
export interface RuleResult {
  id: string;
  label: string;
  /** 0-100, higher is stronger. */
  score: number;
  /** One-line, plain-English explanation of why this score was given. */
  detail: string;
}

/** The full diagnosis for a piece of pasted text. */
export interface Diagnosis {
  input: string;
  rules: RuleResult[];
  /** 0-100 composite Hook Score, weighted average of the rule scores. */
  hookScore: number;
}
