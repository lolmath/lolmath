import { notImplemented } from "../not-implemented";

/**
 * Calculates the passive gold a champion has generated over time.
 *
 * @param elapsed The time since passive gold started, in seconds
 * @param goldPerSecond The passive gold generation, per second
 * @returns The passive gold generated
 * @throws Not implemented.
 */
export function passiveGold(elapsed: number, goldPerSecond: number): number {
	return notImplemented("passiveGold", elapsed, goldPerSecond);
}

/**
 * Calculates the gold generated per minute.
 *
 * @param gold The gold earned
 * @param elapsed The time it was earned over, in seconds
 * @returns The gold per minute
 * @throws Not implemented.
 */
export function goldPerMinute(gold: number, elapsed: number): number {
	return notImplemented("goldPerMinute", gold, elapsed);
}
