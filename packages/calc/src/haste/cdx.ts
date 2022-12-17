/**
 * Calculates the Cooldown Reduction Multiplier from Ability Haste
 *
 * @param ah The amount of Ability Haste
 * @returns The Cooldown Reduction Multiplier
 */
export function cdx(ah: number) {
  return 1 / (ah + 1);
}
