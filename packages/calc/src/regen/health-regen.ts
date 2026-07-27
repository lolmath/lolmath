import { notImplemented } from "../not-implemented";

/**
 * Calculates the total health regeneration of a unit, expressed per five
 * seconds.
 *
 * @param base The base health regeneration of the unit, per five seconds
 * @param bonus Bonus health regeneration, per five seconds
 * @param percentBonus Bonus base health regeneration, as a fraction
 * @returns The total health regeneration, per five seconds
 * @throws Not implemented.
 */
export function hp5Total(
	base: number,
	bonus: number,
	percentBonus: number,
): number {
	return notImplemented("hp5Total", base, bonus, percentBonus);
}

/**
 * Converts health regeneration per five seconds into health per second.
 *
 * @param hp5 The health regeneration, per five seconds
 * @returns The health regeneration, per second
 * @throws Not implemented.
 */
export function healthRegenPerSecond(hp5: number): number {
	return notImplemented("healthRegenPerSecond", hp5);
}
