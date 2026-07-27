import { notImplemented } from "../not-implemented";

/**
 * Calculates the average damage multiplier of a source of damage that can
 * critically strike.
 *
 * @param critChance The critical strike chance, as a fraction
 * @param bonusCritDamage Bonus critical strike damage, as a fraction
 * @returns The average damage multiplier
 * @throws Not implemented.
 */
export function critAveragex(
	critChance: number,
	bonusCritDamage: number,
): number {
	return notImplemented("critAveragex", critChance, bonusCritDamage);
}

/**
 * Calculates the average damage of a source of damage that can critically
 * strike.
 *
 * @param damage The damage before the critical strike
 * @param critChance The critical strike chance, as a fraction
 * @param bonusCritDamage Bonus critical strike damage, as a fraction
 * @returns The average damage
 * @throws Not implemented.
 */
export function critAverageDamage(
	damage: number,
	critChance: number,
	bonusCritDamage: number,
): number {
	return notImplemented(
		"critAverageDamage",
		damage,
		critChance,
		bonusCritDamage,
	);
}
