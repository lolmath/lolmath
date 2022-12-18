/**
 * Applies movement speed caps to a raw movement speed value.
 *
 * @category Movement Speed
 *
 * @param msRaw Raw movement speed
 * @returns Movement speed after caps
 */
export function msCap(msRaw: number): number {
  if (msRaw > 490) {
    return msRaw * 0.5 + 230;
  }
  if (msRaw > 415) {
    return msRaw * 0.8 + 83;
  }
  if (msRaw < 220) {
    return msRaw * 0.5 + 110;
  }

  return msRaw;
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("msCap", () => {
    expect(msCap(0)).toBeCloseTo(110);
    expect(msCap(180)).toBeCloseTo(200);
    expect(msCap(450)).toBeCloseTo(443);
    expect(msCap(500)).toBeCloseTo(480);
    expect(msCap(600)).toBeCloseTo(530);
    expect(msCap(700)).toBeCloseTo(580);
    expect(msCap(676.603125)).toBeCloseTo(568.3015625);
  });
}
