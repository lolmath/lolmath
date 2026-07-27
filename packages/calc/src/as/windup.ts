import { notImplemented } from "../not-implemented";

/**
 * Calculates the wind-up time of a basic attack, the part of the attack
 * animation before the damage or the missile is released.
 *
 * @param baseWindup The base wind-up time of the unit, in seconds
 * @param windupModifier The unit their wind-up modifier
 * @param attackTime The total duration of the current attack, in seconds
 * @param windupPercent The share of the attack animation spent winding up
 * @returns The wind-up time, in seconds
 * @throws Not implemented.
 */
export function windup(
	baseWindup: number,
	windupModifier: number,
	attackTime: number,
	windupPercent: number,
): number {
	return notImplemented(
		"windup",
		baseWindup,
		windupModifier,
		attackTime,
		windupPercent,
	);
}

/**
 * Calculates the time left over after the wind-up of a basic attack, during
 * which the unit may move or cast without cancelling the attack.
 *
 * @param as Total attack speed
 * @param windupTime The wind-up time of the attack, in seconds
 * @returns The wind-down time, in seconds
 * @throws Not implemented.
 */
export function winddown(as: number, windupTime: number): number {
	return notImplemented("winddown", as, windupTime);
}
