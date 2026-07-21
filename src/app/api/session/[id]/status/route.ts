import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth";
import { getSession } from "@/lib/db/queries/sessions";
import { rebuildSessionState } from "@/lib/api/session-state";

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

  const state = await rebuildSessionState(id, authResult.userId);

  return NextResponse.json({
    sessionId: id,
    theta: state.theta,
    se: state.se,
    step: state.step,
    maxSteps: state.maxSteps,
    trajectory: state.trajectory,
    concepts: state.concepts,
    ended: !!session.endedAt,
    startedAt: session.startedAt,
    endedAt: session.endedAt,
  });
}
