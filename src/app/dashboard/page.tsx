import Link from "next/link";
import { Brain } from "lucide-react";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default function DashboardPage() {
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
            <Link href="/interview" className="text-muted-foreground hover:text-foreground">Interview</Link>
            <Link href="/dashboard/history" className="text-muted-foreground hover:text-foreground">History</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <DashboardClient />
        </div>
      </main>
    </div>
  );
}
