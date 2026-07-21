import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth";
import { getUserMastery } from "@/lib/db/queries/mastery";

export async function GET() {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult.error;

  const mastery = await getUserMastery(authResult.userId);

  const byCategory: Record<string, { tag: string; theta: number; variance: number }[]> = {};

  for (const m of mastery) {
    const category = m.conceptTag.split("-")[0] ?? "general";
    if (!byCategory[category]) byCategory[category] = [];
    byCategory[category].push({
      tag: m.conceptTag,
      theta: m.theta,
      variance: m.variance,
    });
  }

  return NextResponse.json({
    concepts: mastery.map((m) => ({
      tag: m.conceptTag,
      theta: m.theta,
      variance: m.variance,
      updatedAt: m.updatedAt,
    })),
    byCategory,
  });
}
