"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ScoreDisplayProps {
  score: number;
  reasoning: string;
  missing: string[];
  onNext: () => void;
  ended: boolean;
}

export function ScoreDisplay({ score, reasoning, missing, onNext, ended }: ScoreDisplayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const percentage = Math.round(score * 100);
  const color =
    score >= 0.75
      ? "text-emerald-600 dark:text-emerald-400"
      : score >= 0.5
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";

  return (
    <div
      className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your Score</p>
              <p className={`text-4xl font-bold ${color}`}>{percentage}%</p>
            </div>
            {score >= 0.75 ? (
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Strong
              </Badge>
            ) : score >= 0.5 ? (
              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                <Info className="mr-1 h-3.5 w-3.5" /> Decent
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                <AlertCircle className="mr-1 h-3.5 w-3.5" /> Needs Work
              </Badge>
            )}
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm font-medium">Feedback</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{reasoning}</p>
            </div>

            {missing.length > 0 && (
              <div>
                <p className="text-sm font-medium">Missed Points</p>
                <ul className="mt-1 space-y-1">
                  {missing.map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      · {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6">
            <Button onClick={onNext} className="w-full">
              {ended ? "View Results" : "Next Question →"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
