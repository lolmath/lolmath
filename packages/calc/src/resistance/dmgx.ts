/**
 * get a damage multiplier for a value of enemy resistance. e.g. 100 armor = 0.5 physical damage dealt.
 * @param resistance the amount of armor or magic resist the enemy has.
 */
export function dmgx(resistance: number) {
  if (resistance > 0) {
    return 100 / (100 + resistance);
  }
  return 2 - 100 / (100 - resistance);
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
