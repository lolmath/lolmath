import { notImplemented } from "../not-implemented";

/**
 * Calculates the movement speed slow that applies to a unit. Only the
 * strongest slow of every slow source applies.
 *
 * @param slows The slows currently applied to the unit, as fractions
 * @returns The effective slow, as a fraction
 * @throws Not implemented.
 */
export function slowTotal(slows: readonly number[]): number {
	return notImplemented("slowTotal", slows);
}

/**
 * Applies slow resist to a slow.
 *
 * @param slow The slow, as a fraction
 * @param slowResist The slow resist of the target, as a fraction
 * @returns The slow after slow resist, as a fraction
 * @throws Not implemented.
 */
export function slowAfterResist(slow: number, slowResist: number): number {
	return notImplemented("slowAfterResist", slow, slowResist);
}

/**
 * Applies a slow to a movement speed value.
 *
 * @param ms The movement speed before the slow
 * @param slow The slow, as a fraction
 * @returns The slowed movement speed
 * @throws Not implemented.
 */
export function msSlowed(ms: number, slow: number): number {
	return notImplemented("msSlowed", ms, slow);
}
