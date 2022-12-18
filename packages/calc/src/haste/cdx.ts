/**
 * Calculates the *Cooldown Multiplier* from Ability Haste
 *
 * @category Haste
 *
 * @param ah The amount of Ability Haste
 * @returns The Cooldown Multiplier
 *
 * @example
 *
 * ```ts
 * const ah = 0.1; // 10% Ability Haste
 * const cd = 10; // 10 seconds cooldown
 *
 * const newCd = cd * cdx(ah); // ~9.1 seconds cooldown
 * ```
 */
export function cdx(ah: number) {
  return 1 / (ah + 1);
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("dmgx", () => {
    expect(cdx(0.1)).toBeCloseTo(0.91);
    expect(cdx(0.2)).toBeCloseTo(0.83);
    expect(cdx(1)).toBeCloseTo(0.5);
  });
}
