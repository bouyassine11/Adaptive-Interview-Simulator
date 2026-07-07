import Link from "next/link";
import {
  Brain,
  BarChart3,
  GraduationCap,
  Layers,
  Sparkles,
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "IRT-Based Adaptation",
    description:
      "Questions adjust to your ability in real time using Item Response Theory — the same model powering the GRE and Duolingo English Test.",
  },
  {
    icon: Sparkles,
    title: "LLM-Graded Answers",
    description:
      "Write natural language answers. An LLM evaluates them against a detailed rubric, giving you a score and specific feedback on what you missed.",
  },
  {
    icon: BarChart3,
    title: "Per-Concept Mastery Map",
    description:
      "See exactly which topics you've mastered and which need work — broken down by concept, not just by domain.",
  },
  {
    icon: Target,
    title: "Targeted Weak-Spot Detection",
    description:
      "The system identifies your weakest areas and surfaces more questions on those concepts until your understanding improves.",
  },
  {
    icon: Layers,
    title: "Multi-Domain Coverage",
    description:
      "Software Engineering, Data Engineering, Data Science, and AI Engineering — all in one platform.",
  },
  {
    icon: GraduationCap,
    title: "Interview-Ready Confidence",
    description:
      "Stop guessing what to study. Know exactly where you stand and walk into interviews with a clear picture of your strengths.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Start a Session",
    description:
      "Pick your target role or let the system assess you across domains. No sign-up required to try it.",
  },
  {
    step: "02",
    title: "Answer Adaptive Questions",
    description:
      "Each question is selected by the IRT engine based on your current ability. Answer well → harder questions. Struggle → easier ones.",
  },
  {
    step: "03",
    title: "Get Graded & Track Progress",
    description:
      "The LLM scores your answer against a rubric. Your ability estimate updates, and your mastery map grows more precise with every response.",
  },
];

const topics = [
  { label: "System Design", category: "SWE" },
  { label: "Data Structures & Algorithms", category: "SWE" },
  { label: "OOP & Design Patterns", category: "SWE" },
  { label: "CI/CD & DevOps", category: "SWE" },
  { label: "API Design & REST", category: "SWE" },
  { label: "Databases & SQL", category: "SWE" },
  { label: "ETL Pipelines", category: "DE" },
  { label: "Apache Spark", category: "DE" },
  { label: "Airflow & Orchestration", category: "DE" },
  { label: "Data Warehousing", category: "DE" },
  { label: "Streaming (Kafka)", category: "DE" },
  { label: "Statistics & Probability", category: "DS" },
  { label: "ML Algorithms", category: "DS" },
  { label: "A/B Testing", category: "DS" },
  { label: "Feature Engineering", category: "DS" },
  { label: "Bias & Variance", category: "DS" },
  { label: "LLMs & Transformers", category: "AI" },
  { label: "RAG & Vector DBs", category: "AI" },
  { label: "Prompt Engineering", category: "AI" },
  { label: "Fine-Tuning", category: "AI" },
  { label: "AI Agents", category: "AI" },
  { label: "Model Evaluation", category: "AI" },
];

const categoryColors: Record<string, string> = {
  SWE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  DE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  DS: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  AI: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

const categoryLabels: Record<string, string> = {
  SWE: "Software Engineering",
  DE: "Data Engineering",
  DS: "Data Science",
  AI: "AI Engineering",
};

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            SkillAdapt
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            href="#topics"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Topics
          </Link>
        </nav>
        <Button size="sm">Start Practicing</Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            Powered by Item Response Theory
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Know What You Know.
            <br />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Ace the Interview.
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            An interview prep tool that doesn&apos;t just fire random questions
            at you. Powered by IRT, LLM grading, and per-concept mastery
            tracking — so you always know exactly what to study next.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base">
              Start Free Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
            >
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="border-b py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for Depth, Not Just Coverage
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Most interview tools throw questions at random. SkillAdapt models
            your actual ability and adapts to you.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} size="sm">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mt-2">{feature.title}</CardTitle>
                  <CardDescription className="mt-1 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to a smarter interview prep.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {howItWorks.map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
                {item.step}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Topics() {
  return (
    <section id="topics" className="border-b py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Topics Covered
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            SWE, Data Engineering, Data Science, and AI Engineering — with
            per-concept mastery tracking for each.
          </p>
        </div>
        <div className="mt-12 space-y-8">
          {(["SWE", "DE", "DS", "AI"] as const).map((cat) => (
            <div key={cat}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {categoryLabels[cat]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {topics
                  .filter((t) => t.category === cat)
                  .map((topic) => (
                    <Badge
                      key={topic.label}
                      variant="secondary"
                      className={`${categoryColors[cat]} border-0 px-3 py-1.5 text-xs`}
                    >
                      {topic.label}
                    </Badge>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl font-bold tracking-tight">80+</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Hand-Crafted Questions
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold tracking-tight">4</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Engineering Domains
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold tracking-tight">22</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Trackable Concepts
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold tracking-tight">IRT</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Adaptive Engine
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-b py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Know What You Know?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop guessing. Start practicing with adaptive questions, LLM
            grading, and a mastery map that shows you exactly where to focus.
          </p>
          <div className="mt-10">
            <Button size="lg" className="h-12 px-8 text-base">
              Start Free Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>SkillAdapt — Adaptive Interview Simulator</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with IRT, LLMs, and a lot of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Topics />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
