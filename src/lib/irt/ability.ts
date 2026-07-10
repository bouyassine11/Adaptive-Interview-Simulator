import { threePL, fisherInformation, standardError } from "./model";

const QUADRATURE_POINTS = [
  { x: -3.324257, w: 0.002555 },
  { x: -2.511309, w: 0.033314 },
  { x: -1.700791, w: 0.156283 },
  { x: -0.900000, w: 0.363806 },
  { x: -0.100000, w: 0.479490 },
  { x: 0.700000, w: 0.363806 },
  { x: 1.500000, w: 0.156283 },
  { x: 2.310842, w: 0.033314 },
  { x: 3.123724, w: 0.002555 },
];

const PRIOR_MEAN = 0;
const PRIOR_SD = 1;

function priorDensity(theta: number, mean: number, sd: number): number {
  const z = (theta - mean) / sd;
  return Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
}

export function estimateEAP(
  responses: { a: number; b: number; c: number; score: number }[],
): { theta: number; se: number } {
  let numerator = 0;
  let denominator = 0;

  for (const qp of QUADRATURE_POINTS) {
    let likelihood = 1;
    for (const r of responses) {
      const p = threePL(qp.x, r.a, r.b, r.c);
      const clipped = Math.max(Math.min(p, 0.9999), 0.0001);
      likelihood *= Math.pow(clipped, r.score) * Math.pow(1 - clipped, 1 - r.score);
    }
    const prior = priorDensity(qp.x, PRIOR_MEAN, PRIOR_SD);
    const posterior = likelihood * prior;
    numerator += qp.x * posterior * qp.w;
    denominator += posterior * qp.w;
  }

  const theta = denominator > 0 ? numerator / denominator : 0;

  let info = 0;
  for (const r of responses) {
    info += fisherInformation(theta, r.a, r.b, r.c);
  }
  const se = info > 0 ? 1 / Math.sqrt(info) : Infinity;

  return { theta, se };
}

export function initialAbility(): { theta: number; se: number } {
  return { theta: PRIOR_MEAN, se: PRIOR_SD };
}
