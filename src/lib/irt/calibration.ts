export interface QuestionFeatures {
  numKeyPoints: number;
  requiresCode: boolean;
  requiresDeepReasoning: boolean;
  numConcepts: number;
  isAdvancedTopic: boolean;
}

export function calibrateDifficulty(features: QuestionFeatures): {
  a: number;
  b: number;
  c: number;
} {
  let b = 0;
  b += features.numKeyPoints * 0.3;
  if (features.requiresCode) b += 0.5;
  if (features.requiresDeepReasoning) b += 1.0;
  b += features.numConcepts * 0.15;
  if (features.isAdvancedTopic) b += 0.8;
  b = Math.max(Math.min(b, 3), -3);

  const a = 0.8 + Math.random() * 0.7;
  const c = 0.05 + Math.random() * 0.1;

  return {
    a: Math.round(a * 10) / 10,
    b: Math.round(b * 10) / 10,
    c: Math.round(c * 100) / 100,
  };
}

export function guessDifficultyFromStem(stem: string): {
  a: number;
  b: number;
  c: number;
} {
  const lower = stem.toLowerCase();
  const features: QuestionFeatures = {
    numKeyPoints: (stem.match(/\./g) || []).length,
    requiresCode: /\b(code|function|api|rest|graphql|sql|spark|kafka)\b/.test(lower),
    requiresDeepReasoning: /\b(explain|compare|contrast|why|trade.?off|difference)\b/.test(lower),
    numConcepts: 1,
    isAdvancedTopic: /\b(cap theorem|transformer|attention|garbage collection|fine.?tuning|rag|stream.?processing)\b/.test(lower),
  };

  return calibrateDifficulty(features);
}
