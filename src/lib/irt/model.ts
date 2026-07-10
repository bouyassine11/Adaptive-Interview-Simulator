export function threePL(
  theta: number,
  a: number,
  b: number,
  c: number,
): number {
  const exponent = -a * (theta - b);
  if (exponent > 700) return 1;
  if (exponent < -700) return c;
  return c + (1 - c) / (1 + Math.exp(exponent));
}

export function logLikelihood(
  theta: number,
  responses: { a: number; b: number; c: number; score: number }[],
): number {
  let ll = 0;
  for (const r of responses) {
    const p = threePL(theta, r.a, r.b, r.c);
    const clipped = Math.max(Math.min(p, 0.9999), 0.0001);
    ll += r.score * Math.log(clipped) + (1 - r.score) * Math.log(1 - clipped);
  }
  return ll;
}

export function fisherInformation(
  theta: number,
  a: number,
  b: number,
  c: number,
): number {
  const p = threePL(theta, a, b, c);
  const q = 1 - p;
  if (p <= c || q <= 0) return 0;
  // I(θ) = a² * (P-c)² * Q / ((1-c)² * P)
  const numerator = a * a * (p - c) * (p - c) * q;
  const denominator = (1 - c) * (1 - c) * p;
  return numerator / denominator;
}

export function standardError(theta: number, responses: { a: number; b: number; c: number }[]): number {
  let info = 0;
  for (const r of responses) {
    info += fisherInformation(theta, r.a, r.b, r.c);
  }
  if (info <= 0) return Infinity;
  return 1 / Math.sqrt(info);
}

export function expectedScore(theta: number, a: number, b: number, c: number): number {
  return threePL(theta, a, b, c);
}
