export function threePL(
  theta: number,
  a: number,
  b: number,
  c: number,
): number {
  return c + (1 - c) / (1 + Math.exp(-a * (theta - b)));
}
