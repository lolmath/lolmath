/**
 * Get a damage multiplier for a value of enemy resist. e.g. 100 armor = 0.5 physical damage dealt.
 *
 * @category Resist
 *
 * @param resist the amount of armor or magic resist the enemy has.
 * @returns the damage multiplier
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
