import { notImplemented } from "../not-implemented";

/**
 * Calculates the cast time of an ability. Some abilities have a cast time
 * that scales with attack speed instead of a fixed one.
 *
 * @param baseCastTime The base cast time, in seconds
 * @param as The total attack speed of the caster
 * @param scalesWithAttackSpeed Does the cast time scale with attack speed?
 * @returns The cast time, in seconds
 * @throws Not implemented.
 */
export function castTime(
	baseCastTime: number,
	as: number,
	scalesWithAttackSpeed: boolean,
): number {
	return notImplemented("castTime", baseCastTime, as, scalesWithAttackSpeed);
}

/**
 * Calculates the total time an ability takes from the cast input to the
 * moment the caster regains control.
 *
 * @param time The cast time, in seconds
 * @param castLockout The time the caster stays locked out after the cast, in
 * seconds
 * @returns The total time, in seconds
 * @throws Not implemented.
 */
export function castLock(time: number, castLockout: number): number {
	return notImplemented("castLock", time, castLockout);
}
