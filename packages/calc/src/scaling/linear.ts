/**
 * Linear scaling function. Returns a multiplier that is 0 at level 1 and 1 at
 * maxLevel.
 *
 * @category Scaling
 *
 * @param maxLvl The level at which the scaling is 1
 * @param lvl The current level of the ability
 * @returns the scaling multiplier
 *
 * @example
 * ```ts
 * // Teemo Q: 80 / 125 / 170 / 215 / 260
 * const base = 80;
 * const end = 180; // 260 - base
 * const maxLvl = 5;
 * const damage = base + linear(maxLvl, lvl) * end; // 105
 * ```
 */
export function linear(maxLvl: number, lvl: number): number {
	return (lvl - 1) / (maxLvl - 1);
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

/**
 * The scaling for abilities that max out at level 5.
 *
 * @category Scaling
 *
 * @param lvl The current level of the ability
 * @returns the scaling multiplier
 */
export function linear5(lvl: number): number {
	return linear(5, lvl);
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
