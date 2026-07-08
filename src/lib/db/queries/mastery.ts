import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { conceptMastery } from "@/lib/db/schema";

export async function upsertMastery(
  userId: string,
  conceptTag: string,
  theta: number,
  variance: number,
) {
  const existing = await db.query.conceptMastery.findFirst({
    where: and(
      eq(conceptMastery.userId, userId),
      eq(conceptMastery.conceptTag, conceptTag),
    ),
  });

  if (existing) {
    const [updated] = await db
      .update(conceptMastery)
      .set({ theta, variance, updatedAt: new Date() })
      .where(eq(conceptMastery.conceptTag, conceptTag))
      .returning();
    return updated;
  }

  const [created] = await db
    .insert(conceptMastery)
    .values({ userId, conceptTag, theta, variance })
    .returning();
  return created;
}

export async function getUserMastery(userId: string) {
  return db.query.conceptMastery.findMany({
    where: eq(conceptMastery.userId, userId),
  });
}

export async function getConceptMastery(userId: string, conceptTag: string) {
  return db.query.conceptMastery.findFirst({
    where: and(
      eq(conceptMastery.userId, userId),
      eq(conceptMastery.conceptTag, conceptTag),
    ),
  });
}
