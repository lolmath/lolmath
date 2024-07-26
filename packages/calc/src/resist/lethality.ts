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
