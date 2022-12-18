/**
 * Calculates the multiplier to be used for lethality to armor penetration
 * conversion.
 *
 * @category Resist
 *
 * @param lvl Current champion level
 * @returns The multiplier to be used for converting lethality to flat armor
 * penetration.
 * 
 * @example
 * 
 * ```ts
 * const lethality = 100;
 * const level = 13;
 * 
 * const armorPenFlat = lethality * lethalityx(level); // ~88.9
 * ```
 */
export function lethalityx(lvl: number): number {
  return 0.6 + 0.4 * (lvl / 18);
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("lethalityx", () => {
    expect(lethalityx(1)).toBeCloseTo(0.6222);
    expect(lethalityx(2)).toBeCloseTo(0.6444);
    expect(lethalityx(3)).toBeCloseTo(0.6666);
    expect(lethalityx(13)).toBeCloseTo(0.8888);
    expect(lethalityx(18)).toBeCloseTo(1);
  });
}
