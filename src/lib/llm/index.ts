export async function gradeAnswer(
  question: string,
  rubric: string,
  userAnswer: string,
): Promise<{ score: number; reasoning: string }> {
  const res = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: buildPrompt(question, rubric, userAnswer),
        parameters: { max_new_tokens: 256, temperature: 0.1 },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`HF API error: ${res.status}`);
  }

  const data = await res.json();
  return parseResponse(data);
}

function buildPrompt(
  question: string,
  rubric: string,
  userAnswer: string,
): string {
  return `<s>[INST] You are an interview grader.

QUESTION:
${question}

RUBRIC:
${rubric}

USER ANSWER:
${userAnswer}

Score the answer 0-1 based on the rubric. Respond with JSON only:
{"score": 0.75, "reasoning": "brief explanation"} [/INST]`;
}

function parseResponse(data: unknown): {
  score: number;
  reasoning: string;
} {
  try {
    const text = Array.isArray(data)
      ? (data[0] as { generated_text: string }).generated_text
      : (data as { generated_text: string }).generated_text;
    const jsonMatch = text.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // fall through
  }
  return { score: 0.5, reasoning: "Failed to parse LLM response" };
}
