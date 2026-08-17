import { notImplemented } from "../not-implemented";

/**
 * Calculates the damage multiplier of a critical strike. A critical strike
 * deals 200% of its normal damage by default.
 *
 * @param bonusCritDamage Bonus critical strike damage, as a fraction
 * @returns The critical strike damage multiplier
 * @throws Not implemented.
 */
export function critDamagex(bonusCritDamage: number): number {
	return notImplemented("critDamagex", bonusCritDamage);
}

/**
 * Applies a critical strike to a damage value.
 *
 * @param damage The damage before the critical strike
 * @param bonusCritDamage Bonus critical strike damage, as a fraction
 * @returns The damage of the critical strike
 * @throws Not implemented.
 */
export function critDamage(damage: number, bonusCritDamage: number): number {
	return notImplemented("critDamage", damage, bonusCritDamage);
}

/**
 * Applies critical strike damage reduction, such as the reduction that
 * applies to critical strikes against a unit with an anti-critical effect.
 *
 * @param damage The damage of the critical strike
 * @param reduction The critical strike damage reduction, as a fraction
 * @returns The damage after the reduction
 * @throws Not implemented.
 */
export function critDamageReduced(damage: number, reduction: number): number {
	return notImplemented("critDamageReduced", damage, reduction);
}
