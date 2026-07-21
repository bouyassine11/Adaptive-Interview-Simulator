"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brain, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: "all", label: "All Domains", color: "bg-muted text-muted-foreground" },
  { id: "software-engineering", label: "Software Engineering", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  { id: "data-engineering", label: "Data Engineering", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  { id: "data-science", label: "Data Science", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
  { id: "ai-engineering", label: "AI Engineering", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
];

export default function InterviewStartPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function startSession() {
    setLoading(true);
    try {
      const res = await fetch("/api/session/start", { method: "POST" });
      if (!res.ok) {
        router.push("/api/auth/signin");
        return;
      }
      const data = await res.json();
      router.push(`/interview/${data.sessionId}`);
    } catch {
      setLoading(false);
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
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">New Session</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start Your Interview Practice
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Answer 10 adaptive questions. The difficulty adjusts to your skill level in real time.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {categories.map((cat) => (
              <Card key={cat.id} className="cursor-default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    <Badge variant="secondary" className={`${cat.color} border-0`}>
                      {cat.label}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {cat.id === "all"
                      ? "Mix of all 40 questions across every domain"
                      : "10 targeted questions in this domain"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              size="lg"
              className="h-12 px-8 text-base"
              onClick={startSession}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Session...
                </>
              ) : (
                <>
                  Begin Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              ~5 minutes · 10 questions · LLM-graded
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
