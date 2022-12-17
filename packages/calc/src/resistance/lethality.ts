/**
 *
 * @param lvl current champion level
 * @returns amount of armor penetration
 */
export function lethalityToArmorPen(lvl: number): number {
  return 0.6 + 0.4 * (lvl / 18);
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("lethalityToArmorPen", () => {
    expect(lethalityToArmorPen(1)).toBeCloseTo(0.6222);
    expect(lethalityToArmorPen(2)).toBeCloseTo(0.6444);
    expect(lethalityToArmorPen(3)).toBeCloseTo(0.6666);
    expect(lethalityToArmorPen(13)).toBeCloseTo(0.8888);
    expect(lethalityToArmorPen(18)).toBeCloseTo(1);
  });
}
