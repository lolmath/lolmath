import { notImplemented } from "../not-implemented";
import type { DamageType } from "./damage-type";

/**
 * Determines which damage type an adaptive effect deals. Adaptive effects
 * follow the higher of bonus attack damage and ability power, and default to
 * physical damage on a tie.
 *
 * @param bonusAd The bonus attack damage of the unit
 * @param ap The ability power of the unit
 * @returns The damage type of the adaptive effect
 * @throws Not implemented.
 */
export function adaptiveType(bonusAd: number, ap: number): DamageType {
	return notImplemented("adaptiveType", bonusAd, ap);
}

/**
 * Converts adaptive force into the statistic it grants.
 *
 * @param force The amount of adaptive force
 * @param type The damage type the unit is currently adapting to
 * @returns The amount of bonus attack damage or ability power granted
 * @throws Not implemented.
 */
export function adaptiveForce(force: number, type: DamageType): number {
	return notImplemented("adaptiveForce", force, type);
}
