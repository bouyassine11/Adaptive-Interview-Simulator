import { threePL } from "./model";

const PRIOR_VARIANCE = 1;
const PRIOR_MEAN = 0;

export interface ConceptState {
  tag: string;
  theta: number;
  variance: number;
}

export function updateConceptMastery(
  concepts: ConceptState[],
  taggedConcepts: string[],
  score: number,
  questionDifficultyB: number,
): ConceptState[] {
  const updated = [...concepts];

  for (const tag of taggedConcepts) {
    const idx = updated.findIndex((c) => c.tag === tag);
    let current: ConceptState;
    if (idx === -1) {
      current = { tag, theta: PRIOR_MEAN, variance: PRIOR_VARIANCE };
      updated.push(current);
    } else {
      current = updated[idx];
    }

    const p = threePL(0, 1, questionDifficultyB, 0);
    const likelihood = p * score + (1 - p) * (1 - score);
    const priorMean = current.theta;
    const priorVar = current.variance;
    const posteriorVar = 1 / (1 / priorVar + 1);
    const posteriorMean =
      (priorMean / priorVar + (score - 0.5) * 0.5) / (1 / priorVar + 1);

    const newState: ConceptState = {
      tag,
      theta: posteriorMean * likelihood + current.theta * (1 - likelihood),
      variance: Math.max(posteriorVar, 0.01),
    };

    if (idx === -1) {
      updated[updated.length - 1] = newState;
    } else {
      updated[idx] = newState;
    }
  }

  return updated;
}

export function weakConcepts(
  concepts: ConceptState[],
  threshold = -0.5,
): string[] {
  return concepts
    .filter((c) => c.theta < threshold && c.variance < 0.5)
    .map((c) => c.tag);
}
