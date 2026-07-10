import { estimateEAP, initialAbility } from "./ability";
import { selectNextQuestion, sessionPrecision } from "./selection";
import { updateConceptMastery, weakConcepts, type ConceptState } from "./concepts";
import type { IRTQuestion } from "./selection";

export interface SessionState {
  userId: string;
  theta: number;
  se: number;
  step: number;
  answeredIds: Set<string>;
  responses: { a: number; b: number; c: number; score: number }[];
  concepts: ConceptState[];
  trajectory: { theta: number; se: number; step: number }[];
  maxSteps: number;
}

export interface SessionConfig {
  maxSteps?: number;
  precisionThreshold?: number;
}

export function createSession(
  userId: string,
  config?: SessionConfig,
): SessionState {
  const { theta, se } = initialAbility();
  return {
    userId,
    theta,
    se,
    step: 0,
    answeredIds: new Set(),
    responses: [],
    concepts: [],
    trajectory: [{ theta, se, step: 0 }],
    maxSteps: config?.maxSteps ?? 10,
  };
}

export function selectQuestion(
  state: SessionState,
  candidates: IRTQuestion[],
): IRTQuestion | null {
  const weak = weakConcepts(state.concepts);
  return selectNextQuestion(state.theta, candidates, state.answeredIds, weak);
}

export function recordAnswer(
  state: SessionState,
  question: IRTQuestion,
  score: number,
): SessionState {
  const newResponses = [
    ...state.responses,
    {
      a: question.difficultyA,
      b: question.difficultyB,
      c: question.difficultyC,
      score,
    },
  ];

  const { theta, se } = estimateEAP(newResponses);

  const newConcepts = updateConceptMastery(
    state.concepts,
    question.conceptTags,
    score,
    question.difficultyB,
  );

  const newAnswered = new Set(state.answeredIds);
  newAnswered.add(question.id);

  return {
    ...state,
    theta,
    se,
    step: state.step + 1,
    answeredIds: newAnswered,
    responses: newResponses,
    concepts: newConcepts,
    trajectory: [
      ...state.trajectory,
      { theta, se, step: state.step + 1 },
    ],
  };
}

export function shouldEnd(state: SessionState): boolean {
  if (state.step >= state.maxSteps) return true;
  if (sessionPrecision(state.se) && state.step >= 4) return true;
  return false;
}

export interface SessionResult {
  userId: string;
  theta: number;
  se: number;
  totalQuestions: number;
  trajectory: { theta: number; se: number; step: number }[];
  concepts: ConceptState[];
  weakAreas: string[];
}
