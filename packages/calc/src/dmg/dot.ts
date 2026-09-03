import { notImplemented } from "../not-implemented";

/**
 * Calculates how many times a damage over time effect ticks.
 *
 * @param duration The duration of the effect, in seconds
 * @param tickRate The time between two ticks, in seconds
 * @returns The number of ticks
 * @throws Not implemented.
 */
export function dotTicks(duration: number, tickRate: number): number {
	return notImplemented("dotTicks", duration, tickRate);
}

/**
 * Calculates the damage of a single tick of a damage over time effect.
 *
 * @param totalDamage The total damage of the effect
 * @param duration The duration of the effect, in seconds
 * @param tickRate The time between two ticks, in seconds
 * @returns The damage of a single tick
 * @throws Not implemented.
 */
export function dotDamagePerTick(
	totalDamage: number,
	duration: number,
	tickRate: number,
): number {
	return notImplemented("dotDamagePerTick", totalDamage, duration, tickRate);
}

/**
 * Calculates the damage a damage over time effect has dealt so far.
 *
 * @param totalDamage The total damage of the effect
 * @param duration The duration of the effect, in seconds
 * @param elapsed The time since the effect was applied, in seconds
 * @returns The damage dealt so far
 * @throws Not implemented.
 */
export function dotDamageDealt(
	totalDamage: number,
	duration: number,
	elapsed: number,
): number {
	return notImplemented("dotDamageDealt", totalDamage, duration, elapsed);
}
