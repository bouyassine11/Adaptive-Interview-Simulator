import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth";
import { getUserSessions } from "@/lib/db/queries/sessions";

export async function GET() {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult.error;

  const sessions = await getUserSessions(authResult.userId);

  return NextResponse.json({
    sessions: sessions.map((s) => ({
      id: s.id,
      startedAt: s.startedAt,
      endedAt: s.endedAt,
      trajectory: s.abilityTrajectory,
    })),
  });
}
