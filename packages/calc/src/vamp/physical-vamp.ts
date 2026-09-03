import { notImplemented } from "../not-implemented";

/**
 * Calculates the healing granted by physical vamp. Physical vamp triggers on
 * every source of physical damage.
 *
 * @param damage The post-mitigation physical damage dealt
 * @param physicalVamp The physical vamp of the attacker, as a fraction
 * @param aoeEffectiveness The effectiveness against the current target, as a
 * fraction
 * @returns The healing
 * @throws Not implemented.
 */
export function physicalVampHeal(
	damage: number,
	physicalVamp: number,
	aoeEffectiveness: number,
): number {
	return notImplemented(
		"physicalVampHeal",
		damage,
		physicalVamp,
		aoeEffectiveness,
	);
}
