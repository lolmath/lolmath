import { notImplemented } from "../not-implemented";

/**
 * Applies the damage reduction that some area of effect abilities have
 * against secondary targets.
 *
 * @param damage The damage against the primary target
 * @param reduction The reduction against secondary targets, as a fraction
 * @returns The damage against a secondary target
 * @throws Not implemented.
 */
export function aoeSecondaryDamage(damage: number, reduction: number): number {
	return notImplemented("aoeSecondaryDamage", damage, reduction);
}

/**
 * Applies the damage falloff that some abilities have against minions and
 * monsters.
 *
 * @param damage The damage against a champion
 * @param modifier The modifier against the unit, as a fraction
 * @param cap The damage cap against the unit
 * @returns The damage against the unit
 * @throws Not implemented.
 */
export function nonChampionDamage(
	damage: number,
	modifier: number,
	cap: number,
): number {
	return notImplemented("nonChampionDamage", damage, modifier, cap);
}

/**
 * Calculates the damage a bouncing or chaining effect deals on a given
 * bounce.
 *
 * @param damage The damage of the first hit
 * @param falloff The falloff per bounce, as a fraction
 * @param bounce The zero based index of the bounce
 * @returns The damage of the bounce
 * @throws Not implemented.
 */
export function bounceDamage(
	damage: number,
	falloff: number,
	bounce: number,
): number {
	return notImplemented("bounceDamage", damage, falloff, bounce);
}
