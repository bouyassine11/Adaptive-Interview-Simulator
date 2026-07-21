import { Progress } from "@/components/ui/progress";

interface SessionProgressProps {
  step: number;
  maxSteps: number;
  theta: number;
}

export function SessionProgress({ step, maxSteps, theta }: SessionProgressProps) {
  const progress = (step / maxSteps) * 100;
  const abilityDisplay = ((theta + 3) / 6 * 100).toFixed(0);
  const abilityLabel = theta > 1 ? "High" : theta > 0 ? "Above Avg" : theta > -1 ? "Average" : "Developing";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Question {step + 1} of {maxSteps}
        </span>
        <span className="text-muted-foreground">
          Ability: <span className="font-medium text-foreground">{abilityLabel}</span> ({abilityDisplay}%)
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
