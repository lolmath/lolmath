import { notImplemented } from "../not-implemented";

/**
 * Calculates how long a missile takes to reach its target.
 *
 * @param distance The distance the missile travels, in units
 * @param missileSpeed The missile speed, in units per second
 * @returns The travel time, in seconds
 * @throws Not implemented.
 */
export function missileTravelTime(
	distance: number,
	missileSpeed: number,
): number {
	return notImplemented("missileTravelTime", distance, missileSpeed);
}

/**
 * Calculates the total time between the cast input and the moment a missile
 * hits its target.
 *
 * @param time The cast time of the ability, in seconds
 * @param distance The distance the missile travels, in units
 * @param missileSpeed The missile speed, in units per second
 * @returns The total time, in seconds
 * @throws Not implemented.
 */
export function missileTotalTime(
	time: number,
	distance: number,
	missileSpeed: number,
): number {
	return notImplemented("missileTotalTime", time, distance, missileSpeed);
}

/**
 * Calculates how far a target can travel while a missile is in flight, which
 * is the distance a skill shot has to be led by.
 *
 * @param travelTime The travel time of the missile, in seconds
 * @param targetMs The movement speed of the target
 * @returns The distance the target can travel, in units
 * @throws Not implemented.
 */
export function missileLead(travelTime: number, targetMs: number): number {
	return notImplemented("missileLead", travelTime, targetMs);
}
