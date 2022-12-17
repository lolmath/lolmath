/**
 * Computes the additive stacking of two values.
 *
 * @param initial The initial value.
 * @param value The value to add to the accumulator.
 * @returns The result of the addition.
 */
export function additive(initial: number, value: number) {
  return initial + value;
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("additive", () => {
    expect(additive(0.1, 0.1)).toBeCloseTo(0.2);
  });
}
