import { fisherInformation, standardError } from "./model";

export interface IRTQuestion {
  id: string;
  difficultyA: number;
  difficultyB: number;
  difficultyC: number;
  conceptTags: string[];
}

export function selectNextQuestion(
  theta: number,
  candidates: IRTQuestion[],
  answeredIds: Set<string>,
  weakConcepts?: string[],
): IRTQuestion | null {
  const available = candidates.filter((q) => !answeredIds.has(q.id));
  if (available.length === 0) return null;

  if (weakConcepts && weakConcepts.length > 0 && answeredIds.size > 2) {
    const weakQuestions = available.filter((q) =>
      q.conceptTags.some((t) => weakConcepts.includes(t)),
    );
    if (weakQuestions.length > 0) {
      const lucky = Math.random();
      if (lucky < 0.6) {
        return pickMaxInfo(theta, weakQuestions);
      }
    }
  }

  if (answeredIds.size < 3) {
    const difficultyMid = available.filter(
      (q) => q.difficultyB > -0.5 && q.difficultyB < 0.5,
    );
    if (difficultyMid.length > 0) {
      return difficultyMid[Math.floor(Math.random() * difficultyMid.length)];
    }
  }

  return pickMaxInfo(theta, available);
}

function pickMaxInfo(theta: number, questions: IRTQuestion[]): IRTQuestion {
  let best = questions[0];
  let bestInfo = -1;

  for (const q of questions) {
    const info = fisherInformation(theta, q.difficultyA, q.difficultyB, q.difficultyC);
    if (info > bestInfo) {
      bestInfo = info;
      best = q;
    }
  }

  return best;
}

export function sessionPrecision(se: number): boolean {
  return se < 0.4;
}
