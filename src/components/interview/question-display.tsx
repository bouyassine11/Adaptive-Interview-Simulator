import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Target, BookOpen } from "lucide-react";

interface QuestionDisplayProps {
  stem: string;
  topicCategory: string;
  conceptTags: string[];
  step: number;
}

const categoryColors: Record<string, string> = {
  "software-engineering": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "data-engineering": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "data-science": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "ai-engineering": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

export function QuestionDisplay({ stem, topicCategory, conceptTags, step }: QuestionDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Target className="h-4 w-4" />
          <span>Question {step + 1}</span>
          <Badge variant="secondary" className={`${categoryColors[topicCategory] ?? ""} border-0 text-xs`}>
            {topicCategory.replace("-", " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg leading-relaxed">{stem}</p>
        {conceptTags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
            {conceptTags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
