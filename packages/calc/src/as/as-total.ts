/**
 * Calculates the total attack speed of a champion.
 *
 * @param base Base attack speed
 * @param ratio Attack speed ratio
 * @param bonus Bonus attack speed
 * @param urfMode Is URF mode active?
 * @param isMelee Is the champion melee? (This is only used in URF mode)
 * @returns Total attack speed
 */
export function asTotal(
	base: number,
	ratio: number,
	bonus: number,
	urfMode = false,
	isMelee = false,
): number {
	const urfx = urfMode ? (isMelee ? 1.5 : 2) : 1;
	return base + ratio * bonus * urfx;
}
