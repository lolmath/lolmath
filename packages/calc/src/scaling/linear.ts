/**
 * Linear scaling function. Returns a multiplier that is 0 at level 1 and 1 at
 * maxLevel.
 *
 * @category Scaling
 *
 * @param maxLvl The level at which the scaling is 1
 * @param lvl The current level of the ability
 * @returns the scaling multiplier
 */
export function linear(maxLvl: number, lvl: number): number {
  return (lvl - 1) / (maxLvl - 1);
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("linear", () => {
    expect(linear(8, 8)).toBe(1);
    expect(linear(8, 1)).toBe(0);
  });
}

/**
 * The scaling for abilities that max out at level 3.
 *
 * @category Scaling
 *
 * @param lvl The current level of the ability
 * @returns the scaling multiplier
 */
export function linear3(lvl: number): number {
  return linear(3, lvl);
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("linear3", () => {
    // Talon R Damage @ 12.22
    expect(90 + linear3(1) * 90).toBeCloseTo(90);
    expect(90 + linear3(2) * 90).toBeCloseTo(135);
    expect(90 + linear3(3) * 90).toBeCloseTo(180);
  });
}

/**
 * The scaling for abilities that max out at level 5.
 *
 * @category Scaling
 *
 * @param lvl The current level of the ability
 * @returns the scaling multiplier
 * 
 * @example
 * ```ts
 * const base = 65;
 * const perLevel = 80;
 * const lvl = 3;
 * const damage = base + linear5(lvl) * perLevel; // 105
 * ```
 */
export function linear5(lvl: number): number {
  return linear(5, lvl);
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("linear5", () => {
    // Talon Q Damage @ 12.22
    expect(65 + linear5(1) * 80).toBeCloseTo(65);
    expect(65 + linear5(2) * 80).toBeCloseTo(85);
    expect(65 + linear5(3) * 80).toBeCloseTo(105);
    expect(65 + linear5(4) * 80).toBeCloseTo(125);
    expect(65 + linear5(5) * 80).toBeCloseTo(145);
  });
}

/**
 * The scaling for abilities that max out at level 18.
 *
 * @category Scaling
 *
 * @param lvl The current level of the ability
 * @returns the scaling multiplier
 */
export function linear18(lvl: number): number {
  return linear(18, lvl);
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("linear18", () => {
    // Talon Q Heal @ 12.22
    expect(9 + linear18(1) * 46).toBeCloseTo(9);
    expect(9 + linear18(8) * 46).toBeCloseTo(27.94);
    expect(9 + linear18(11) * 46).toBeCloseTo(36.06);
    expect(9 + linear18(18) * 46).toBeCloseTo(55);
  });
}
