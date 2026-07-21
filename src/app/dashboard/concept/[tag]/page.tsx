"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Brain, ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MasteryData {
  tag: string;
  theta: number;
  variance: number;
  updatedAt: string;
}

export default function ConceptPage({ params }: { params: Promise<{ tag: string }> }) {
  const [tag, setTag] = useState("");
  const [mastery, setMastery] = useState<MasteryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => {
      const decoded = decodeURIComponent(p.tag);
      setTag(decoded);
      fetch("/api/dashboard/mastery")
        .then((r) => r.json())
        .then((data) => {
          const found = (data.concepts ?? []).find(
            (c: MasteryData) => c.tag === decoded,
          );
          setMastery(found ?? null);
          setLoading(false);
        });
    });
  }, [params]);

  const ability = mastery
    ? Math.round(((mastery.theta + 3) / 6) * 100)
    : null;

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
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </Link>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : !mastery ? (
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground">
                  No data for <span className="font-medium">{tag}</span> yet.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Answer questions tagged with this concept to build mastery.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">Concept</Badge>
                <h1 className="text-2xl font-bold tracking-tight">{tag}</h1>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs text-muted-foreground">Ability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{ability}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs text-muted-foreground">Theta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{mastery.theta.toFixed(2)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs text-muted-foreground">Uncertainty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{mastery.variance.toFixed(2)}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${ability}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="py-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Last updated:{" "}
                    {new Date(mastery.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <Link
                    href="/interview"
                    className="mt-4 inline-block text-sm text-primary hover:underline"
                  >
                    Practice this concept →
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
