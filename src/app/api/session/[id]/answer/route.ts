import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth";
import { getSession } from "@/lib/db/queries/sessions";
import { getQuestion } from "@/lib/db/queries/questions";
import { saveAnswer } from "@/lib/db/queries/answers";
import { rebuildSessionState } from "@/lib/api/session-state";
import { recordAnswer, shouldEnd } from "@/lib/irt/session";
import { endSession } from "@/lib/db/queries/sessions";
import { upsertMastery } from "@/lib/db/queries/mastery";
import { gradeAnswer } from "@/lib/llm/grader";
import { checkRateLimit } from "@/lib/api/rate-limit";
import type { IRTQuestion } from "@/lib/irt/selection";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult.error;

  const rate = checkRateLimit(`answer:${authResult.userId}`, 15, 60_000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Rate limited. Try again in ${Math.ceil((rate.retryAfterMs ?? 0) / 1000)}s` },
      { status: 429 },
    );
  }

  const { id } = await params;

  let body: { questionId?: string; answer?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { questionId, answer: userAnswer } = body;

  if (
    !questionId ||
    !userAnswer ||
    typeof questionId !== "string" ||
    typeof userAnswer !== "string"
  ) {
    return NextResponse.json(
      { error: "questionId and answer are required (strings)" },
      { status: 400 },
    );
  }

  if (userAnswer.length > 10000) {
    return NextResponse.json(
      { error: "Answer too long (max 10,000 characters)" },
      { status: 400 },
    );
  }

  const session = await getSession(id);
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  if (session.userId !== authResult.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (session.endedAt) {
    return NextResponse.json({ error: "Session already ended" }, { status: 400 });
  }

  const question = await getQuestion(questionId);
  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const rubric = question.rubric as { keyPoints: { text: string; weight: number }[]; commonMisconceptions: string[] };

  const rubricText = rubric.keyPoints
    .map((kp, i) => `${i + 1}. [weight=${kp.weight}] ${kp.text}`)
    .join("\n");

  const gradeResult = await gradeAnswer(question.stem, rubricText, userAnswer);

  await saveAnswer({
    sessionId: id,
    questionId,
    userText: userAnswer,
    llmGrade: gradeResult.score,
    llmReasoning: gradeResult.reasoning,
    scoreContinuous: gradeResult.score,
  });

  const state = await rebuildSessionState(id, authResult.userId);

  const irtQuestion: IRTQuestion = {
    id: question.id,
    difficultyA: question.difficultyA,
    difficultyB: question.difficultyB,
    difficultyC: question.difficultyC,
    conceptTags: question.conceptTags,
  };

  const finalState = recordAnswer(state, irtQuestion, gradeResult.score);

  for (const concept of finalState.concepts) {
    await upsertMastery(authResult.userId, concept.tag, concept.theta, concept.variance);
  }

  if (shouldEnd(finalState)) {
    await endSession(id, finalState.trajectory);
  }

  return NextResponse.json({
    grade: {
      score: gradeResult.score,
      reasoning: gradeResult.reasoning,
      missing: gradeResult.missing,
    },
    session: {
      theta: finalState.theta,
      se: finalState.se,
      step: finalState.step,
      ended: shouldEnd(finalState),
    },
  });
}
