"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  disabled: boolean;
}

export function AnswerInput({ onSubmit, disabled }: AnswerInputProps) {
  const [answer, setAnswer] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) {
      textareaRef.current?.focus();
    }
  }, [disabled]);

  function handleSubmit() {
    const trimmed = answer.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setAnswer("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="space-y-3">
      <Textarea
        ref={textareaRef}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your answer here..."
        disabled={disabled}
        className="min-h-[160px] resize-none text-base leading-relaxed"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {answer.length} characters · ⌘+Enter to submit
        </span>
        <Button onClick={handleSubmit} disabled={!answer.trim() || disabled}>
          <Send className="mr-2 h-4 w-4" />
          Submit
        </Button>
      </div>
    </div>
  );
}
