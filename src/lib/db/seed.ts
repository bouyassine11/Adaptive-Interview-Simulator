import { db } from "./index";
import { questions } from "./schema";
import { allQuestions } from "./questions";

export async function seed() {
  console.log(`Seeding ${allQuestions.length} questions...`);

  for (const q of allQuestions) {
    await db.insert(questions).values({
      stem: q.stem,
      difficultyA: q.difficultyA,
      difficultyB: q.difficultyB,
      difficultyC: q.difficultyC,
      conceptTags: q.conceptTags,
      topicCategory: q.topicCategory,
      rubric: q.rubric,
    });
  }

  const counts = {
    swe: allQuestions.filter((q) => q.topicCategory === "software-engineering").length,
    de: allQuestions.filter((q) => q.topicCategory === "data-engineering").length,
    ds: allQuestions.filter((q) => q.topicCategory === "data-science").length,
    ai: allQuestions.filter((q) => q.topicCategory === "ai-engineering").length,
  };

  console.log("Seeded questions by category:");
  console.log(`  Software Engineering: ${counts.swe}`);
  console.log(`  Data Engineering:     ${counts.de}`);
  console.log(`  Data Science:         ${counts.ds}`);
  console.log(`  AI Engineering:       ${counts.ai}`);
  console.log(`  Total:                ${allQuestions.length}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
