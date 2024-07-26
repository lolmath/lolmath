/**
 * Calculates the total movement speed of a champion.
 *
 * @category Movement Speed
 *
 * @param base The champion their base movement speed
 * @param flat From shoes and other flat movement bonuses
 * @param percent e.g. percentBonus1 + percentBonus2
 * @param percentMultiplicative e.g. (1 + percentBonus1) * (1 + percentBonus2)
 * @param bonusMultiplier unique for celerity
 * @returns The final movement speed of a champion
 */
export function msTotal(
	base: number,
	flat: number,
	percent: number,
	percentMultiplicative: number,
	bonusMultiplier: number,
): number {
	const _flat = flat * (1 + bonusMultiplier);
	const _percent = percent * (1 + bonusMultiplier);
	const _percentMultiplicative =
		(percentMultiplicative - 1) * (1 + bonusMultiplier) + 1;

	return (base + _flat) * (1 + _percent) * _percentMultiplicative;
}
