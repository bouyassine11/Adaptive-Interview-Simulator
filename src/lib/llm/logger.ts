export interface GradingLogEntry {
  question: string;
  userAnswerLength: number;
  startTime: number;
  latency?: number;
  score?: number;
  rawResponse?: string;
  fallbackUsed?: boolean;
  success?: boolean;
  error?: string;
}

const recentGrades: GradingLogEntry[] = [];
const MAX_LOG = 100;

export function logGrading(entry: GradingLogEntry): void {
  recentGrades.push(entry);
  if (recentGrades.length > MAX_LOG) {
    recentGrades.shift();
  }

  if (process.env.NODE_ENV === "development") {
    const status = entry.success ? "OK" : "FAIL";
    const model = entry.fallbackUsed ? "FALLBACK" : "PRIMARY";
    const latency = entry.latency ? `${entry.latency.toFixed(0)}ms` : "?";
    const score = entry.score?.toFixed(2) ?? "?";
    console.log(
      `[LLM] ${status} ${model} score=${score} latency=${latency} len=${entry.userAnswerLength}`,
    );
  }
}

export function getGradingStats(): {
  total: number;
  success: number;
  avgLatency: number;
  avgScore: number;
} {
  const total = recentGrades.length;
  if (total === 0) return { total: 0, success: 0, avgLatency: 0, avgScore: 0 };

  const successful = recentGrades.filter((g) => g.success);
  const success = successful.length;
  const avgLatency =
    successful.reduce((sum, g) => sum + (g.latency ?? 0), 0) / success;
  const avgScore =
    successful.reduce((sum, g) => sum + (g.score ?? 0.5), 0) / success;

  return { total, success, avgLatency, avgScore };
}
