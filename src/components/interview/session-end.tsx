"use client";

import Link from "next/link";
import { Trophy, Target, TrendingUp, ArrowRight, Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SessionEndProps {
  theta: number;
  step: number;
  concepts: { tag: string; theta: number }[];
}

export function SessionEnd({ theta, step, concepts }: SessionEndProps) {
  const abilityPercent = Math.round(((theta + 3) / 6) * 100);
  const sorted = [...concepts].sort((a, b) => a.theta - b.theta);
  const weak = sorted.slice(0, 3).filter((c) => c.theta < 0.5);
  const strong = sorted.slice(-3).reverse().filter((c) => c.theta > 0);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Session Complete</h1>
        <p className="mt-2 text-muted-foreground">
          You answered {step} questions. Here&apos;s how you did.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4" /> Overall Ability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-5xl font-bold">{abilityPercent}%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {theta > 1 ? "Strong performance — above average ability" :
               theta > 0 ? "Solid foundation — room to grow" :
               theta > -1 ? "Developing skills — keep practicing" :
               "Keep going — focus on fundamentals"}
            </p>
          </div>
        </CardContent>
      </Card>

      {strong.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-emerald-600" /> Strong Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {strong.map((c) => (
                <Badge key={c.tag} className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {c.tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {weak.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-amber-600" /> Areas to Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {weak.map((c) => (
                <Badge key={c.tag} variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-300">
                  {c.tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3">
        <Link href="/interview" className={buttonVariants({ className: "flex-1" })}>
          Practice Again <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <Link href="/dashboard" className={buttonVariants({ variant: "outline", className: "flex-1" })}>
          <Home className="mr-2 h-4 w-4" /> Dashboard
        </Link>
      </div>
    </div>
  );
}
