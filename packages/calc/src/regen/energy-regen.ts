import { notImplemented } from "../not-implemented";

/**
 * Calculates the total energy regeneration of a unit, expressed per five
 * seconds.
 *
 * @param base The base energy regeneration of the unit, per five seconds
 * @param bonus Bonus energy regeneration, per five seconds
 * @returns The total energy regeneration, per five seconds
 * @throws Not implemented.
 */
export function energyRegenTotal(base: number, bonus: number): number {
	return notImplemented("energyRegenTotal", base, bonus);
}

/**
 * Calculates the time it takes to regenerate an amount of a resource.
 *
 * @param amount The amount of the resource to regenerate
 * @param regenPerFive The regeneration, per five seconds
 * @returns The time it takes, in seconds
 * @throws Not implemented.
 */
export function regenTime(amount: number, regenPerFive: number): number {
	return notImplemented("regenTime", amount, regenPerFive);
}

/**
 * Calculates the number of regeneration ticks over a duration. Regeneration
 * is applied twice per second.
 *
 * @param duration The duration, in seconds
 * @returns The number of ticks
 * @throws Not implemented.
 */
export function regenTicks(duration: number): number {
	return notImplemented("regenTicks", duration);
}
