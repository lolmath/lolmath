import { notImplemented } from "../not-implemented";

/**
 * Applies an attack speed slow. Attack speed slows are applied to the total
 * attack speed rather than to the bonus attack speed.
 *
 * @param as Total attack speed
 * @param slow The attack speed slow, as a fraction
 * @returns The slowed attack speed
 * @throws Not implemented.
 */
export function asSlow(as: number, slow: number): number {
	return notImplemented("asSlow", as, slow);
}
