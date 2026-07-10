export interface GradingResult {
  score: number;
  reasoning: string;
  missing: string[];
}

export function parseGrade(raw: string): GradingResult {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        score: typeof parsed.score === "number" ? clampScore(parsed.score) : 0.5,
        reasoning:
          typeof parsed.reasoning === "string"
            ? parsed.reasoning.trim()
            : "No reasoning provided",
        missing: Array.isArray(parsed.missing)
          ? parsed.missing.filter((m: unknown) => typeof m === "string")
          : [],
      };
    } catch {
      // fall through to text extraction
    }
  }

  return extractScoreFromText(raw);
}

function extractScoreFromText(text: string): GradingResult {
  const result: GradingResult = {
    score: 0.5,
    reasoning: "Parsed score from unstructured text",
    missing: [],
  };

  const scorePatterns = [
    /score["':\s]*(\d+\.?\d*)/i,
    /"score":\s*(\d+\.?\d*)/,
    /(\d+\.?\d*)\s*\/\s*1[0.]\s*$/im,
    /(\d+\.?\d*)\s*\/\s*10/,
    /(\d+)\s*\/\s*10/,
  ];

  for (const pattern of scorePatterns) {
    const match = text.match(pattern);
    if (match) {
      const raw = parseFloat(match[1]);
      if (!isNaN(raw)) {
        result.score = clampScore(raw / (raw > 1 ? 10 : 1));
        break;
      }
    }
  }

  const reasoningMatch = text.match(/reasoning["':\s]*([^"]+)/i);
  if (reasoningMatch) {
    result.reasoning = reasoningMatch[1].trim();
  }

  return result;
}

function clampScore(score: number): number {
  if (score > 1 && score <= 10) return score / 10;
  return Math.max(0, Math.min(1, score));
}
