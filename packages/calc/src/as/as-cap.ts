import { notImplemented } from "../not-implemented";

/**
 * Clamps a raw attack speed value between the game's attack speed floor
 * (0.2 attacks per second) and the attack speed cap (2.5 attacks per second
 * for most units).
 *
 * @param asRaw Raw attack speed, before caps
 * @param cap The attack speed cap of the unit
 * @returns Attack speed after the floor and the cap have been applied
 * @throws Not implemented.
 */
export function asCap(asRaw: number, cap: number): number {
	return notImplemented("asCap", asRaw, cap);
}

/**
 * Calculates the bonus attack speed that is wasted once the attack speed cap
 * has been reached.
 *
 * @param asRaw Raw attack speed, before caps
 * @param cap The attack speed cap of the unit
 * @returns The amount of attack speed that has no effect
 * @throws Not implemented.
 */
export function asOvercap(asRaw: number, cap: number): number {
	return notImplemented("asOvercap", asRaw, cap);
}
