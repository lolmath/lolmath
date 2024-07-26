/**
 * Calculates the resist after all reductions and penetrations have been
 * applied.
 *
 * @remarks
 * Magic penetration and magic resist reduction work exactly like armor
 * penetration and armor reduction. penetration and reduction are considered on
 * the target champion in the following order:
 *
 * 1. Reduction, flat.
 * 2. Reduction, percentage.
 * 3. Penetration, percentage.
 * 4. Penetration, flat.
 *
 * @category Resist
 *
 * @param resist The initial magic resist or armor.
 * @param flatReduction Flat reduction of magic resist or armor.
 * @param percentReduction Percent reduction of magic resist or armor.
 * @param percentPenetration Percent penetration of magic resist or armor.
 * @param flatPenetration Flat penetration of magic resist or armor.
 * @returns The resist after all reductions and penetrations.
 */
export function postReductionResist(
	resist: number,
	flatReduction: number,
	percentReduction: number,
	percentPenetration: number,
	flatPenetration: number,
) {
	// Don't modify original.
	let newResist = resist;
	newResist -= flatReduction;
	// Only flat resist reduction will apply below 0.
	if (newResist > 0) {
		newResist *= 1 - percentReduction;
		newResist *= 1 - percentPenetration;
		newResist -= flatPenetration;
		// We cannot penetrate below 0.
		if (newResist < 0) {
			newResist = 0;
		}
	}

	return newResist;
}
