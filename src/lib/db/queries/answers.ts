import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { answers } from "@/lib/db/schema";

export async function saveAnswer(data: {
  sessionId: string;
  questionId: string;
  userText: string;
  llmGrade?: number;
  llmReasoning?: string;
  scoreContinuous?: number;
}) {
  const [answer] = await db.insert(answers).values(data).returning();
  return answer;
}

export async function getSessionAnswers(sessionId: string) {
  return db.query.answers.findMany({
    where: eq(answers.sessionId, sessionId),
  });
}
