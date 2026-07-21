import { NextResponse } from "next/server";
import { getAllQuestions, getQuestionsByCategory } from "@/lib/db/queries/questions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const tags = searchParams.get("tags")?.split(",").filter(Boolean);

  let questions;
  if (category) {
    questions = await getQuestionsByCategory(category);
  } else {
    questions = await getAllQuestions();
  }

  if (tags && tags.length > 0) {
    questions = questions.filter((q) =>
      q.conceptTags.some((t) => tags.includes(t)),
    );
  }

  return NextResponse.json({
    count: questions.length,
    questions: questions.map((q) => ({
      id: q.id,
      stem: q.stem,
      difficultyA: q.difficultyA,
      difficultyB: q.difficultyB,
      difficultyC: q.difficultyC,
      conceptTags: q.conceptTags,
      topicCategory: q.topicCategory,
      source: q.source,
    })),
  });
}
