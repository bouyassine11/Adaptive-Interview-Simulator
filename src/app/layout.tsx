import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillAdapt — Adaptive Interview Simulator",
  description:
    "An interview prep tool that adapts to your skill level using IRT (Item Response Theory). Get LLM-graded answers, track per-concept mastery, and know exactly what to study next.",
  keywords: [
    "interview prep",
    "adaptive testing",
    "IRT",
    "software engineering",
    "data science",
    "AI engineering",
    "skill assessment",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
