import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth";
import { createSession } from "@/lib/db/queries/sessions";

export async function POST() {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult.error;

  const session = await createSession(authResult.userId);

  return NextResponse.json({
    sessionId: session.id,
    startedAt: session.startedAt,
  });
}
