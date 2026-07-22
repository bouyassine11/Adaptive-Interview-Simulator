"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Brain, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-background px-4 font-sans antialiased">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30">
            <Brain className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight">Application Error</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            The application failed to load. Please refresh the page.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={reset} className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/80">
              Refresh
            </button>
            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
