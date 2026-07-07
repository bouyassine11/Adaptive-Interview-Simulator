export type TopicCategory =
  | "software-engineering"
  | "data-engineering"
  | "data-science"
  | "ai-engineering";

export interface Question {
  id: string;
  stem: string;
  difficultyA: number;
  difficultyB: number;
  difficultyC: number;
  conceptTags: string[];
  topicCategory: TopicCategory;
  rubric: Rubric;
}

export interface Rubric {
  keyPoints: { text: string; weight: number }[];
  commonMisconceptions: string[];
}

export interface Answer {
  id: string;
  sessionId: string;
  questionId: string;
  userText: string;
  llmGrade: number;
  llmReasoning: string;
  scoreContinuous: number;
  createdAt: Date;
}

export interface AnswerSession {
  id: string;
  userId: string;
  startedAt: Date;
  endedAt: Date | null;
  abilityTrajectory: { theta: number; se: number; step: number }[];
}

export interface ConceptMastery {
  userId: string;
  conceptTag: string;
  theta: number;
  variance: number;
  updatedAt: Date;
}
