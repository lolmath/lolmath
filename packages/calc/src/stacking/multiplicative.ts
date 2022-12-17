/**
 * Computes the multiplicative stacking of two values.
 *
 * @param initial The initial value.
 * @param value The value to add to the accumulator.
 * @returns The result of the addition.
 */
export function multiplicative(initial: number, value: number) {
  return 1 - (1 - initial) * (1 - value);
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("multiplicative", () => {
    expect(multiplicative(0.1, 0.1)).toBeCloseTo(0.19);
  });
}
