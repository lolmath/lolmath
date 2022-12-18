/**
 * Computes the multiplicative stacking of two values.
 *
 * @category Stacking
 *
 * @param initial The initial value.
 * @param value The value to add.
 * @returns The result of the addition.
 *
 * @example
 *
 * ```ts
 * const initial = 0.1; // Current Armor Penetration: 10%
 * const value = 0.1; // Additional Armor Penetration: 10%
 * const result = multiplicative(initial, value); // 19% Armor Penetration
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
