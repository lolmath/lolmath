import { notImplemented } from "../not-implemented";

/**
 * Calculates the time between two consecutive basic attacks.
 *
 * @param as Total attack speed
 * @returns The attack timer, in seconds
 * @throws Not implemented.
 */
export function attackTimer(as: number): number {
	return notImplemented("attackTimer", as);
}

/**
 * Calculates how many basic attacks are landed over a period of time.
 *
 * @param as Total attack speed
 * @param duration The duration to attack for, in seconds
 * @returns The number of basic attacks
 * @throws Not implemented.
 */
export function attackCount(as: number, duration: number): number {
	return notImplemented("attackCount", as, duration);
}
