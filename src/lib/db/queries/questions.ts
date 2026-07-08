import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { questions } from "@/lib/db/schema";

export async function getQuestion(id: string) {
  return db.query.questions.findFirst({
    where: eq(questions.id, id),
  });
}

export async function getQuestionsByCategory(category: string) {
  return db.query.questions.findMany({
    where: eq(questions.topicCategory, category),
  });
}

export async function getQuestionsByTags(tags: string[]) {
  if (tags.length === 0) return [];
  return db.query.questions.findMany({
    where: sql`${questions.conceptTags} && ARRAY[${sql.join(tags, sql`, `)}]`,
  });
}

export async function getAllQuestions() {
  return db.query.questions.findMany();
}
