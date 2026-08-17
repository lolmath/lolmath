import { notImplemented } from "../not-implemented";

/**
 * Calculates the healing granted by life steal. Life steal only triggers on
 * basic attacks and is applied to post-mitigation damage.
 *
 * @param damage The post-mitigation basic attack damage dealt
 * @param lifeSteal The life steal of the attacker, as a fraction
 * @returns The healing
 * @throws Not implemented.
 */
export function lifeStealHeal(damage: number, lifeSteal: number): number {
	return notImplemented("lifeStealHeal", damage, lifeSteal);
}

/**
 * Calculates the total life steal of a unit. Life steal stacks additively,
 * and may then be increased by multiplicative modifiers.
 *
 * @param sources The life steal from every source, as fractions
 * @param multiplier The multiplicative life steal modifier
 * @returns The total life steal, as a fraction
 * @throws Not implemented.
 */
export function lifeStealTotal(
	sources: readonly number[],
	multiplier: number,
): number {
	return notImplemented("lifeStealTotal", sources, multiplier);
}
