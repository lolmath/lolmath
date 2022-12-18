/**
 * Converts an amount of resist to a *Damage Multiplier*.
 *
 * @category Resist
 *
 * @param resist The amount of armor or magic resist.
 * @returns The damage multiplier.
 *
 * @example
 *
 * ```ts
 * const resist = 100; // 100 armor
 * const dmg = 100; // 100 damage
 * const result = dmgx(resist); // 50 damage
 * ```
 */
export function dmgx(resist: number) {
  if (resist > 0) {
    return 100 / (100 + resist);
  }
  return 2 - 100 / (100 - resist);
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("dmgx", () => {
    expect(dmgx(25)).toBeCloseTo(0.8);
    expect(dmgx(100)).toBeCloseTo(0.5);
    expect(dmgx(200)).toBeCloseTo(0.33);
    expect(dmgx(300)).toBeCloseTo(0.25);
    expect(dmgx(-100)).toBeCloseTo(1.5);
  });
}
