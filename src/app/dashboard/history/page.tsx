"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Brain, Loader2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart } from "@/components/charts/line-chart";

interface Session {
  id: string;
  startedAt: string;
  endedAt: string | null;
  trajectory: { theta: number; se: number; step: number }[];
}

export default function HistoryPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/history")
      .then((r) => r.json())
      .then((data) => {
        setSessions(data.sessions ?? []);
        setLoading(false);
      });
  }, []);

  const trajectoryData = sessions
    .filter((s) => s.trajectory?.length > 0)
    .flatMap((s, si) =>
      s.trajectory.map((t, ti) => ({
        label: `S${si + 1}.${ti + 1}`,
        value: Math.round(((t.theta + 3) / 6) * 100),
      })),
    )
    .slice(-20);

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
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
            <Link href="/interview" className="text-muted-foreground hover:text-foreground">Interview</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Session History</h1>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : sessions.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground">No sessions yet. Start your first one!</p>
                <Link href="/interview" className="mt-4 inline-block text-sm text-primary hover:underline">
                  Start Interview →
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {trajectoryData.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Ability Trajectory</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center overflow-x-auto">
                    <LineChart data={trajectoryData} width={600} height={250} />
                  </CardContent>
                </Card>
              )}

              <div className="space-y-3">
                {sessions.map((s) => {
                  const finalTheta =
                    s.trajectory?.length > 0
                      ? s.trajectory[s.trajectory.length - 1].theta
                      : null;
                  const startTheta =
                    s.trajectory?.length > 0 ? s.trajectory[0].theta : null;
                  const improved =
                    finalTheta !== null &&
                    startTheta !== null &&
                    finalTheta > startTheta;

                  return (
                    <Card key={s.id}>
                      <CardContent className="flex items-center justify-between py-4">
                        <div>
                          <p className="font-medium">
                            {new Date(s.startedAt).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {s.trajectory?.length ?? 0} questions answered
                            {s.endedAt ? " · Completed" : " · Incomplete"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {improved && (
                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                              +{Math.round(((finalTheta! - startTheta!) / 6) * 100)}%
                            </Badge>
                          )}
                          {finalTheta !== null && (
                            <Badge variant="secondary">
                              Final: {Math.round(((finalTheta + 3) / 6) * 100)}%
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
