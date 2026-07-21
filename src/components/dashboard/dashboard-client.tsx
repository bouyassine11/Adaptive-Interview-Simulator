"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Brain,
  BarChart3,
  History,
  Target,
  TrendingUp,
  ArrowRight,
  Loader2,
  Zap,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadarChart } from "@/components/charts/radar-chart";

interface MasteryConcept {
  tag: string;
  theta: number;
  variance: number;
}

interface Session {
  id: string;
  startedAt: string;
  endedAt: string | null;
  trajectory: { theta: number; se: number; step: number }[];
}

export function DashboardClient() {
  const [mastery, setMastery] = useState<MasteryConcept[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/dashboard/mastery").then((r) => r.json()),
      fetch("/api/dashboard/history").then((r) => r.json()),
    ]).then(([m, s]) => {
      setMastery(m.concepts ?? []);
      setSessions(s.sessions ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const radarData = mastery.map((m) => ({
    label: m.tag.length > 12 ? m.tag.slice(0, 12) + "…" : m.tag,
    value: Math.round(((m.theta + 3) / 6) * 100),
  }));

  const weak = [...mastery]
    .filter((m) => m.theta < 0 && m.variance < 0.5)
    .sort((a, b) => a.theta - b.theta)
    .slice(0, 5);

  const strong = [...mastery]
    .filter((m) => m.theta > 0.5)
    .sort((a, b) => b.theta - a.theta)
    .slice(0, 5);

  const lastSession = sessions[0];
  const lastTheta =
    lastSession?.trajectory?.length > 0
      ? lastSession.trajectory[lastSession.trajectory.length - 1].theta
      : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your mastery across all domains.
          </p>
        </div>
        <Link
          href="/interview"
          className={buttonVariants({ size: "sm" })}
        >
          New Session <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart3 className="h-4 w-4" /> Concepts Mastered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {mastery.filter((m) => m.theta > 0.5).length}
              <span className="text-lg text-muted-foreground">/{mastery.length || "—"}</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
              <History className="h-4 w-4" /> Sessions Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{sessions.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" /> Latest Ability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {lastTheta !== null
                ? `${Math.round(((lastTheta + 3) / 6) * 100)}%`
                : "—"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" /> Weak Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{weak.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4" /> Mastery Map
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            {radarData.length > 0 ? (
              <RadarChart data={radarData} size={320} />
            ) : (
              <p className="py-12 text-sm text-muted-foreground">
                Complete a session to see your mastery map.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4" /> Areas to Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weak.length > 0 ? (
              <div className="space-y-3">
                {weak.map((m) => (
                  <Link
                    key={m.tag}
                    href={`/dashboard/concept/${m.tag}`}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted"
                  >
                    <div>
                      <p className="text-sm font-medium">{m.tag}</p>
                      <p className="text-xs text-muted-foreground">
                        Theta: {m.theta.toFixed(2)}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-300">
                      {Math.round(((m.theta + 3) / 6) * 100)}%
                    </Badge>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">
                {mastery.length === 0
                  ? "No data yet. Start a session!"
                  : "No weak areas detected. Nice work!"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {strong.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Brain className="h-4 w-4" /> Strong Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {strong.map((m) => (
                <Link
                  key={m.tag}
                  href={`/dashboard/concept/${m.tag}`}
                >
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {m.tag} · {Math.round(((m.theta + 3) / 6) * 100)}%
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {sessions.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <History className="h-4 w-4" /> Recent Sessions
            </CardTitle>
            <Link
              href="/dashboard/history"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              View all →
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sessions.slice(0, 5).map((s) => {
                const finalTheta =
                  s.trajectory?.length > 0
                    ? s.trajectory[s.trajectory.length - 1].theta
                    : null;
                return (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(s.startedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {s.trajectory?.length ?? 0} questions answered
                      </p>
                    </div>
                    {finalTheta !== null && (
                      <Badge variant="secondary">
                        {Math.round(((finalTheta + 3) / 6) * 100)}%
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
