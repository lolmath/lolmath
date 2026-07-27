import { notImplemented } from "../not-implemented";

/**
 * Calculates the total slow resist of a unit.
 *
 * @param sources The slow resist from every source, as fractions
 * @returns The total slow resist, as a fraction
 * @throws Not implemented.
 */
export function slowResistTotal(sources: readonly number[]): number {
	return notImplemented("slowResistTotal", sources);
}

/**
 * Converts slow resist into a slow strength multiplier.
 *
 * @param slowResist The slow resist of the target, as a fraction
 * @returns The slow strength multiplier
 * @throws Not implemented.
 */
export function slowResistx(slowResist: number): number {
	return notImplemented("slowResistx", slowResist);
}
