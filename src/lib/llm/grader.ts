import { HFClient, ApiError } from "./client";
import { buildGradingPrompt, buildDetailedPrompt, type GradingInput } from "./prompt";
import { parseGrade, type GradingResult } from "./parser";
import { logGrading, type GradingLogEntry } from "./logger";

export interface GradeAnswerOptions {
  useDetailed?: boolean;
  timeout?: number;
}

export async function gradeAnswer(
  question: string,
  rubric: string,
  userAnswer: string,
  options?: GradeAnswerOptions,
): Promise<GradingResult & { raw: string }> {
  const input: GradingInput = { question, rubric, userAnswer };
  const client = new HFClient();
  const entry: GradingLogEntry = {
    question,
    userAnswerLength: userAnswer.length,
    startTime: Date.now(),
  };

  try {
    const prompt = options?.useDetailed
      ? buildDetailedPrompt(input)
      : buildGradingPrompt(input);

    const controller = new AbortController();
    const timeout = options?.timeout ?? 15000;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    let raw: string;
    try {
      raw = await client.infer(prompt);
    } finally {
      clearTimeout(timeoutId);
    }

    entry.rawResponse = raw;
    entry.latency = Date.now() - entry.startTime;

    const result = parseGrade(raw);
    const normalized = normalizeScore(result.score);

    entry.score = normalized;
    entry.success = true;

    logGrading(entry);

    return {
      score: normalized,
      reasoning: result.reasoning,
      missing: result.missing,
      raw,
    };
  } catch (err) {
    entry.latency = Date.now() - entry.startTime;
    entry.success = false;
    entry.error = err instanceof Error ? err.message : String(err);
    logGrading(entry);

    if (err instanceof ApiError && err.status !== 401) {
      return gradeWithFallback(input, entry);
    }

    return {
      score: 0.5,
      reasoning: err instanceof Error ? err.message : "Grading failed",
      missing: [],
      raw: "",
    };
  }
}

async function gradeWithFallback(
  input: GradingInput,
  entry: GradingLogEntry,
): Promise<GradingResult & { raw: string }> {
  const client = new HFClient();
  const prompt = buildGradingPrompt(input);

  try {
    const raw = await client.infer(prompt, { useFallback: true });

    entry.fallbackUsed = true;
    entry.rawResponse = raw;
    entry.latency = Date.now() - entry.startTime;

    const result = parseGrade(raw);
    const normalized = normalizeScore(result.score);

    entry.score = normalized;
    entry.success = true;
    logGrading(entry);

    return { score: normalized, reasoning: result.reasoning, missing: result.missing, raw };
  } catch {
    return {
      score: 0.5,
      reasoning: "Grading unavailable — both primary and fallback models failed",
      missing: [],
      raw: "",
    };
  }
}

export function normalizeScore(score: number): number {
  if (isNaN(score) || score < 0) return 0;
  if (score > 1 && score < 2) return 1;
  if (score >= 2 && score <= 10) return score / 10;
  if (score > 10) return 1;
  return Math.round(score * 100) / 100;
}
