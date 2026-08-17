import { notImplemented } from "../not-implemented";

/**
 * Converts healing reduction into a multiplier, such as the 40% reduction
 * applied by Grievous Wounds.
 *
 * @param healingReduction The healing reduction, as a fraction
 * @returns The healing multiplier
 * @throws Not implemented.
 */
export function grievousWoundsx(healingReduction: number): number {
	return notImplemented("grievousWoundsx", healingReduction);
}

/**
 * Calculates the total healing reduction on a unit. Only the strongest
 * source of Grievous Wounds applies.
 *
 * @param sources The healing reduction from every source, as fractions
 * @returns The total healing reduction, as a fraction
 * @throws Not implemented.
 */
export function healingReductionTotal(sources: readonly number[]): number {
	return notImplemented("healingReductionTotal", sources);
}
