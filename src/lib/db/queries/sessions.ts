import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { answerSessions } from "@/lib/db/schema";

export async function createSession(userId: string) {
  const [session] = await db
    .insert(answerSessions)
    .values({ userId })
    .returning();
  return session;
}

export async function endSession(
  id: string,
  trajectory: { theta: number; se: number; step: number }[],
) {
  const [session] = await db
    .update(answerSessions)
    .set({ endedAt: new Date(), abilityTrajectory: trajectory })
    .where(eq(answerSessions.id, id))
    .returning();
  return session;
}

export async function getSession(id: string) {
  return db.query.answerSessions.findFirst({
    where: eq(answerSessions.id, id),
    with: { answers: true },
  });
}

export async function getUserSessions(userId: string) {
  return db.query.answerSessions.findMany({
    where: eq(answerSessions.userId, userId),
    orderBy: (sessions, { desc }) => [desc(sessions.startedAt)],
  });
}
