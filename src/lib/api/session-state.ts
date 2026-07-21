import { getSessionAnswers, getQuestion } from "@/lib/db/queries";
import { createSession, recordAnswer, type SessionState } from "@/lib/irt/session";
import type { IRTQuestion } from "@/lib/irt/selection";

export async function rebuildSessionState(
  sessionId: string,
  userId: string,
): Promise<SessionState> {
  const sessionAnswers = await getSessionAnswers(sessionId);
  let state = createSession(userId);

  for (const answer of sessionAnswers) {
    const question = await getQuestion(answer.questionId);
    if (!question) continue;

    const irtQuestion: IRTQuestion = {
      id: question.id,
      difficultyA: question.difficultyA,
      difficultyB: question.difficultyB,
      difficultyC: question.difficultyC,
      conceptTags: question.conceptTags,
    };

    const score = answer.scoreContinuous ?? answer.llmGrade ?? 0.5;
    state = recordAnswer(state, irtQuestion, score);
  }

  return state;
}
