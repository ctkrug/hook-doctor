import type { Diagnosis } from "./types";
import type { CorpusEntry } from "./corpus";

function scoreVector(diagnosis: Diagnosis): number[] {
  return diagnosis.rules.map((r) => r.score);
}

function squaredDistance(a: number[], b: number[]): number {
  let total = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - (b[i] ?? 0);
    total += diff * diff;
  }
  return total;
}

/**
 * Finds the corpus entry whose rule-score vector is closest (Euclidean
 * distance) to the given diagnosis. Ties are broken by corpus array
 * order — the first entry encountered with the smallest distance wins —
 * which is deterministic since CORPUS order never changes at runtime.
 */
export function findClosestMatch(
  diagnosis: Diagnosis,
  corpus: CorpusEntry[],
): CorpusEntry {
  if (corpus.length === 0) {
    throw new Error("findClosestMatch: corpus must not be empty");
  }

  const target = scoreVector(diagnosis);
  let best = corpus[0];
  let bestDistance = squaredDistance(target, scoreVector(best.diagnosis));

  for (let i = 1; i < corpus.length; i++) {
    const candidate = corpus[i];
    const distance = squaredDistance(target, scoreVector(candidate.diagnosis));
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }

  return best;
}
