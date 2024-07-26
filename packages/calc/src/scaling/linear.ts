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
