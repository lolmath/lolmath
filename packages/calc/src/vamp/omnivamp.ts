import { notImplemented } from "../not-implemented";

/**
 * Calculates the healing granted by omnivamp. Omnivamp triggers on every
 * source of damage, and is reduced against multiple targets.
 *
 * @param damage The post-mitigation damage dealt
 * @param omnivamp The omnivamp of the attacker, as a fraction
 * @param aoeEffectiveness The effectiveness against the current target, as a
 * fraction
 * @returns The healing
 * @throws Not implemented.
 */
export function omnivampHeal(
	damage: number,
	omnivamp: number,
	aoeEffectiveness: number,
): number {
	return notImplemented("omnivampHeal", damage, omnivamp, aoeEffectiveness);
}

/**
 * Calculates the effectiveness of vamp against a target that was hit by an
 * area of effect source of damage.
 *
 * @param isMelee Is the attacker melee?
 * @param isSingleTarget Did the source of damage hit exactly one unit?
 * @returns The effectiveness, as a fraction
 * @throws Not implemented.
 */
export function vampAoEEffectiveness(
	isMelee: boolean,
	isSingleTarget: boolean,
): number {
	return notImplemented("vampAoEEffectiveness", isMelee, isSingleTarget);
}
