import { threePL, fisherInformation, logLikelihood, standardError } from "../model";
import { estimateEAP, initialAbility } from "../ability";
import { selectNextQuestion } from "../selection";
import { updateConceptMastery, weakConcepts } from "../concepts";
import { createSession, recordAnswer, shouldEnd } from "../session";
import { calibrateDifficulty, guessDifficultyFromStem } from "../calibration";
import type { IRTQuestion } from "../selection";

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`FAIL: ${msg}`);
  console.log(`  PASS: ${msg}`);
}

function approx(a: number, b: number, tol = 0.01) {
  return Math.abs(a - b) < tol;
}

console.log("\n── model.ts ──");

// 3PL at theta=b => P = (1+c)/2
const p = threePL(0.5, 1.2, 0.5, 0.1);
assert(approx(p, 0.55, 0.05), `3PL at theta=b: P≈0.55, got ${p}`);

// 3PL as theta→∞ => P→1
const pHigh = threePL(10, 1, 0, 0.2);
assert(approx(pHigh, 1, 0.01), `3PL at theta→∞: P≈1, got ${pHigh}`);

// 3PL as theta→-∞ => P→c
const pLow = threePL(-10, 1, 0, 0.2);
assert(approx(pLow, 0.2, 0.01), `3PL at theta→-∞: P≈c, got ${pLow}`);

// Fisher Information > 0
const info = fisherInformation(0.5, 1.2, 0.5, 0.1);
assert(info > 0, `Fisher Information > 0, got ${info}`);

// Fisher Information peaks near theta=b for 2PL (c=0)
const infoAtB = fisherInformation(0.5, 1.2, 0.5, 0);
const infoAway = fisherInformation(3, 1.2, 0.5, 0);
assert(infoAtB > infoAway, `Fisher Info peaks near b: ${infoAtB} > ${infoAway}`);

// logLikelihood: perfect responses should be higher
const highLL = logLikelihood(1, [{ a: 1, b: 0, c: 0, score: 1 }]);
const lowLL = logLikelihood(-1, [{ a: 1, b: 0, c: 0, score: 1 }]);
assert(highLL > lowLL, `Higher theta has higher likelihood: ${highLL} > ${lowLL}`);

// standardError
const se = standardError(0, [{ a: 1, b: 0, c: 0 }]);
assert(se > 0 && se < 5, `Standard error is reasonable: ${se}`);

console.log("\n── ability.ts ──");

// Initial ability is 0
const init = initialAbility();
assert(approx(init.theta, 0), `Initial theta=0, got ${init.theta}`);

// EAP with one correct answer on an easy question → theta > 0
const eap = estimateEAP([{ a: 1, b: -1, c: 0.05, score: 1 }]);
assert(eap.theta > 0, `EAP after correct on easy question: θ>0, got ${eap.theta}`);

// EAP with one incorrect on hard question → theta < 0
const eap2 = estimateEAP([{ a: 1.2, b: 1.5, c: 0.05, score: 0 }]);
assert(eap2.theta < 0, `EAP after wrong on hard: θ<0, got ${eap2.theta}`);

// More data reduces SE relative to no data
const eap3 = estimateEAP([
  { a: 1, b: -1, c: 0.05, score: 1 },
  { a: 1, b: 0, c: 0.05, score: 1 },
  { a: 1, b: 1, c: 0.05, score: 1 },
  { a: 1.2, b: 0.5, c: 0.05, score: 1 },
]);
assert(eap3.se < Infinity, `SE is finite with data, got ${eap3.se}`);

console.log("\n── selection.ts ──");

const questions: IRTQuestion[] = [
  { id: "q1", difficultyA: 1, difficultyB: -2, difficultyC: 0.05, conceptTags: ["basic"] },
  { id: "q2", difficultyA: 1.2, difficultyB: 0, difficultyC: 0.05, conceptTags: ["medium"] },
  { id: "q3", difficultyA: 1.5, difficultyB: 2, difficultyC: 0.1, conceptTags: ["hard"] },
];

// Select picks a question
const selected = selectNextQuestion(0, questions, new Set());
assert(selected !== null, `Select returns a question`);

// Excludes answered questions
const selected2 = selectNextQuestion(0, questions, new Set(["q1", "q2"]));
assert(selected2?.id === "q3", `Excludes answered, picks q3, got ${selected2?.id}`);

// Returns null when all answered
const selected3 = selectNextQuestion(0, questions, new Set(["q1", "q2", "q3"]));
assert(selected3 === null, `Returns null when all answered`);

console.log("\n── concepts.ts ──");

// Starting concepts is empty
const empty = weakConcepts([]);
assert(empty.length === 0, `No weak concepts initially`);

// After answering wrongly on a hard concept, it's weaker
let concepts = updateConceptMastery([], ["react"], 0, 1.5);
assert(concepts.length === 1, `One concept created, got ${concepts.length}`);

// Multiple updates
concepts = updateConceptMastery(concepts, ["react"], 1, 1.5);
concepts = updateConceptMastery(concepts, ["react"], 1, 0.5);
concepts = updateConceptMastery(concepts, ["react"], 0, 0.0);

const weak = weakConcepts(concepts);
console.log(`  Concept theta=${concepts[0].theta.toFixed(3)}, variance=${concepts[0].variance.toFixed(3)}`);

console.log("\n── session.ts ──");

const session = createSession("user-1", { maxSteps: 3 });
assert(session.step === 0, `Session starts at step 0`);
assert(session.theta === 0, `Session starts at theta 0`);

// Record an answer
const updated = recordAnswer(session, questions[1], 1);
assert(updated.step === 1, `Step incremented to 1`);
assert(updated.answeredIds.has("q2"), `q2 marked as answered`);

// Record two more
const s2 = recordAnswer(updated, questions[0], 1);
const s3 = recordAnswer(s2, questions[2], 0);
assert(s3.step === 3, `Step is 3`);
assert(shouldEnd(s3), `Session should end at maxSteps`);

console.log("\n── calibration.ts ──");

const cal = calibrateDifficulty({
  numKeyPoints: 4,
  requiresCode: true,
  requiresDeepReasoning: true,
  numConcepts: 3,
  isAdvancedTopic: true,
});
assert(cal.b > 0, `Hard question has positive b, got ${cal.b}`);
assert(cal.a > 0, `Discrimination a > 0, got ${cal.a}`);

const easy = calibrateDifficulty({
  numKeyPoints: 1,
  requiresCode: false,
  requiresDeepReasoning: false,
  numConcepts: 1,
  isAdvancedTopic: false,
});
assert(easy.b <= cal.b, `Easy question has lower b than hard: ${easy.b} <= ${cal.b}`);

const guessed = guessDifficultyFromStem(
  "Explain the CAP theorem and its trade-offs in distributed systems.",
);
assert(guessed.b > 0, `CAP theorem guessed as hard: b=${guessed.b}`);

console.log("\n── All IRT tests passed ──");
