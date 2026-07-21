import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth";
import { getSession } from "@/lib/db/queries/sessions";
import { getAllQuestions } from "@/lib/db/queries/questions";
import { rebuildSessionState } from "@/lib/api/session-state";
import { selectQuestion } from "@/lib/irt/session";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult.error;

  const { id } = await params;

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

  const state = await rebuildSessionState(id, authResult.userId);

  const allQuestions = await getAllQuestions();
  const candidates = allQuestions.map((q) => ({
    id: q.id,
    difficultyA: q.difficultyA,
    difficultyB: q.difficultyB,
    difficultyC: q.difficultyC,
    conceptTags: q.conceptTags,
  }));

  const next = selectQuestion(state, candidates);

  if (!next) {
    return NextResponse.json({
      done: true,
      theta: state.theta,
      se: state.se,
      step: state.step,
    });
  }

  const fullQuestion = allQuestions.find((q) => q.id === next.id);

  return NextResponse.json({
    done: false,
    question: {
      id: next.id,
      stem: fullQuestion?.stem ?? "",
      topicCategory: fullQuestion?.topicCategory ?? "",
      conceptTags: next.conceptTags,
      difficultyB: next.difficultyB,
    },
    theta: state.theta,
    se: state.se,
    step: state.step,
  });
}
