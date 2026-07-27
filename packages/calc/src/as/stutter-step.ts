import { notImplemented } from "../not-implemented";

/**
 * Calculates the time window in which a unit may move between two basic
 * attacks without losing an attack, better known as stutter-stepping or
 * orb walking.
 *
 * @param as Total attack speed
 * @param windupTime The wind-up time of the attack, in seconds
 * @returns The movement window, in seconds
 * @throws Not implemented.
 */
export function stutterStepWindow(as: number, windupTime: number): number {
	return notImplemented("stutterStepWindow", as, windupTime);
}
