import { buildGradingPrompt, buildDetailedPrompt } from "../prompt";
import { parseGrade } from "../parser";
import { normalizeScore } from "../grader";

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`FAIL: ${msg}`);
  console.log(`  PASS: ${msg}`);
}

console.log("\n── prompt.ts ──");

const input = {
  question: "What is the CAP theorem?",
  rubric: JSON.stringify({
    keyPoints: [
      { text: "Defines Consistency, Availability, Partition Tolerance", weight: 0.3 },
      { text: "Trade-off during partitions", weight: 0.3 },
    ],
    commonMisconceptions: ["CAP is about choosing two at all times"],
  }),
  userAnswer: "CAP stands for Consistency, Availability, Partition Tolerance...",
};

const prompt = buildGradingPrompt(input);
assert(typeof prompt === "string", `Grading prompt is a string, length=${prompt.length}`);
assert(prompt.includes("CAP theorem"), `Prompt contains question`);
assert(prompt.includes("user answer") || prompt.toLowerCase().includes("user answer"),
  `Prompt instructs about user answer`);

const detailed = buildDetailedPrompt(input);
assert(detailed.includes("weighted"), `Detailed prompt mentions weighting`);

console.log("\n── parser.ts ──");

const goodResponse = JSON.stringify({
  score: 0.8,
  reasoning: "Good coverage of key points",
  missing: ["Could mention PACELC theorem"],
});

const result = parseGrade(goodResponse);
assert(result.score === 0.8, `Parsed score 0.8, got ${result.score}`);
assert(result.reasoning === "Good coverage of key points", `Parsed reasoning`);
assert(result.missing.length === 1, `Parsed 1 missing point, got ${result.missing.length}`);

const result2 = parseGrade("Here is my score: 0.6/1.0");
assert(Math.abs(result2.score - 0.6) < 0.01,
  `Extracted score from text: ${result2.score}`);

const result3 = parseGrade('{"score":0.75,"reasoning":"Good","missing":[]}');
assert(result3.score === 0.75, `Parsed inline JSON: ${result3.score}`);

const result4 = parseGrade("The score is 7/10");
assert(Math.abs(result4.score - 0.7) < 0.01,
  `Parsed X/10 format: ${result4.score}`);

const result5 = parseGrade("garbage text with no score");
assert(result5.score === 0.5, `Defaults to 0.5 on garbage: ${result5.score}`);

console.log("\n── grader.ts ──");

assert(normalizeScore(0.8) === 0.8, `Normalize 0.8 stays 0.8`);
assert(normalizeScore(8) === 0.8, `Normalize 8 → 0.8`);
assert(normalizeScore(-0.5) === 0, `Normalize -0.5 → 0`);
assert(normalizeScore(1.5) === 1, `Normalize 1.5 → 1`);
assert(normalizeScore(0.833333) === 0.83, `Normalize 0.83333 → 0.83`);
assert(normalizeScore(NaN) === 0, `Normalize NaN → 0`);

console.log("\n── edge cases ──");

const result6 = parseGrade("score: 0.85");
assert(Math.abs(result6.score - 0.85) < 0.01,
  `score: 0.85 extracted: ${result6.score}`);

const result7 = parseGrade('{"score":0.9,"reasoning":"Solid","missing":[]}');
assert(result7.score === 0.9, `Clean JSON score: ${result7.score}`);

const result8 = parseGrade(JSON.stringify({
  score: 0.6,
  reasoning: "Okay",
  missing: ["point1", "point2"],
}));
assert(result8.score === 0.6, `Full JSON object: ${result8.score}`);

console.log("\n── All LLM pipeline tests passed ──");
