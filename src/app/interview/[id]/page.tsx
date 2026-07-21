"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brain, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionDisplay } from "@/components/interview/question-display";
import { AnswerInput } from "@/components/interview/answer-input";
import { ScoreDisplay } from "@/components/interview/score-display";
import { SessionProgress } from "@/components/interview/session-progress";
import { SessionEnd } from "@/components/interview/session-end";

interface Question {
  id: string;
  stem: string;
  topicCategory: string;
  conceptTags: string[];
  difficultyB: number;
}

interface GradeResult {
  score: number;
  reasoning: string;
  missing: string[];
}

interface SessionData {
  sessionId: string;
  theta: number;
  se: number;
  step: number;
  maxSteps: number;
  ended: boolean;
  concepts: { tag: string; theta: number }[];
  trajectory: { theta: number; se: number; step: number }[];
}

type Phase = "loading" | "question" | "grading" | "score" | "ended";

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string>("");
  const [phase, setPhase] = useState<Phase>("loading");
  const [question, setQuestion] = useState<Question | null>(null);
  const [grade, setGrade] = useState<GradeResult | null>(null);
  const [session, setSession] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setSessionId(p.id));
  }, [params]);

  const fetchNext = useCallback(async (sid: string) => {
    setPhase("loading");
    setError(null);
    try {
      const res = await fetch(`/api/session/${sid}/next`);
      if (!res.ok) {
        if (res.status === 401) { router.push("/api/auth/signin"); return; }
        throw new Error("Failed to load question");
      }
      const data = await res.json();
      if (data.done) {
        setSession((prev) => prev ? { ...prev, theta: data.theta, se: data.se, step: data.step, ended: true } : null);
        setPhase("ended");
      } else {
        setQuestion(data.question);
        setSession((prev) => ({
          sessionId: sid,
          theta: data.theta,
          se: data.se,
          step: data.step,
          maxSteps: 10,
          ended: false,
          concepts: prev?.concepts ?? [],
          trajectory: prev?.trajectory ?? [],
        }));
        setPhase("question");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setPhase("question");
    }
  }, [router]);

  useEffect(() => {
    if (sessionId) fetchNext(sessionId);
  }, [sessionId, fetchNext]);

  async function handleSubmitAnswer(answer: string) {
    if (!question || !sessionId) return;
    setPhase("grading");
    setError(null);
    try {
      const res = await fetch(`/api/session/${sessionId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, answer }),
      });
      if (!res.ok) {
        if (res.status === 401) { router.push("/api/auth/signin"); return; }
        throw new Error("Failed to submit answer");
      }
      const data = await res.json();
      setGrade(data.grade);
      setSession((prev) => prev ? {
        ...prev,
        theta: data.session.theta,
        se: data.session.se,
        step: data.session.step,
        ended: data.session.ended,
      } : null);
      setPhase("score");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setPhase("question");
    }
  }

  function handleNext() {
    if (session?.ended || (session?.step ?? 0) >= (session?.maxSteps ?? 10)) {
      setPhase("ended");
    } else {
      fetchNext(sessionId);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Brain className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">SkillAdapt</span>
          </Link>
          {session && !session.ended && phase !== "ended" && (
            <span className="text-sm text-muted-foreground">
              Ability: {Math.round(((session.theta + 3) / 6) * 100)}%
            </span>
          )}
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          {session && phase !== "ended" && (
            <div className="mb-8">
              <SessionProgress
                step={session.step}
                maxSteps={session.maxSteps}
                theta={session.theta}
              />
            </div>
          )}

          {phase === "loading" && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">Loading question...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="flex-1">{error}</span>
              <Button variant="ghost" size="sm" onClick={() => { setError(null); fetchNext(sessionId); }}>
                Retry
              </Button>
            </div>
          )}

          {(phase === "question" || phase === "grading") && question && (
            <div className="space-y-6">
              <QuestionDisplay
                stem={question.stem}
                topicCategory={question.topicCategory}
                conceptTags={question.conceptTags}
                step={session?.step ?? 0}
              />
              <AnswerInput
                onSubmit={handleSubmitAnswer}
                disabled={phase === "grading"}
              />
              {phase === "grading" && (
                <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Grading your answer...
                </div>
              )}
            </div>
          )}

          {phase === "score" && grade && (
            <div className="space-y-6">
              <ScoreDisplay
                score={grade.score}
                reasoning={grade.reasoning}
                missing={grade.missing}
                onNext={handleNext}
                ended={session?.ended ?? false}
              />
            </div>
          )}

          {phase === "ended" && session && (
            <SessionEnd
              theta={session.theta}
              step={session.step}
              concepts={session.concepts}
            />
          )}
        </div>
      </main>
    </div>
  );
}
