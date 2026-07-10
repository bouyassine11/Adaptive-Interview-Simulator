export interface GradingInput {
  question: string;
  rubric: string;
  userAnswer: string;
}

export function buildGradingPrompt(input: GradingInput): string {
  return `<s>[INST] You are a strict technical interview grader. Your job is to evaluate the user's answer against the provided rubric.

QUESTION:
${input.question}

RUBRIC:
${input.rubric}

USER ANSWER:
${input.userAnswer}

Rate the answer from 0.0 to 1.0 based on how well it covers the rubric's key points.
- 0.0 = completely wrong or blank
- 0.25 = mentions some relevant things but misses most key points
- 0.5 = covers about half the key points adequately
- 0.75 = covers most key points well
- 1.0 = covers all key points thoroughly, no misconceptions

Respond ONLY with valid JSON matching this exact schema:
{
  "score": <number 0.0 to 1.0>,
  "reasoning": "<1-2 sentence explanation>",
  "missing": ["<key point missed 1>", "<key point missed 2>"]
}[/INST]`;
}

export function buildDetailedPrompt(input: GradingInput): string {
  return `<s>[INST] You are a strict technical interview grader.

QUESTION:
${input.question}

RUBRIC KEY POINTS (each weighted 0.0-1.0):
${input.rubric}

USER ANSWER:
${input.userAnswer}

For each key point, determine if the answer covers it (1.0), partially covers it (0.5), or misses it (0.0).
Then compute a weighted total score.

Respond ONLY with valid JSON:
{
  "score": <weighted total 0.0-1.0>,
  "perPoint": [<score per key point>],
  "reasoning": "<brief explanation>",
  "missing": ["<missed point 1>"]
}[/INST]`;
}
