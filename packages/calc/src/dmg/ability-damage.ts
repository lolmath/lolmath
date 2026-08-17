import { notImplemented } from "../not-implemented";

/**
 * Calculates the damage of an ability from its base damage and its ratios.
 *
 * @param base The base damage of the ability at its current rank
 * @param adRatio The total attack damage ratio
 * @param ad The total attack damage of the caster
 * @param bonusAdRatio The bonus attack damage ratio
 * @param bonusAd The bonus attack damage of the caster
 * @param apRatio The ability power ratio
 * @param ap The ability power of the caster
 * @returns The raw damage of the ability
 * @throws Not implemented.
 */
export function abilityDamage(
	base: number,
	adRatio: number,
	ad: number,
	bonusAdRatio: number,
	bonusAd: number,
	apRatio: number,
	ap: number,
): number {
	return notImplemented(
		"abilityDamage",
		base,
		adRatio,
		ad,
		bonusAdRatio,
		bonusAd,
		apRatio,
		ap,
	);
}

/**
 * Calculates damage that scales with a health value, such as the maximum
 * health of the target or the missing health of the target.
 *
 * @param ratio The health ratio, as a fraction
 * @param health The health value the ratio applies to
 * @returns The raw damage
 * @throws Not implemented.
 */
export function healthScaledDamage(ratio: number, health: number): number {
	return notImplemented("healthScaledDamage", ratio, health);
}

/**
 * Calculates the health threshold below which an execute effect triggers.
 *
 * @param maxHealth The maximum health of the target
 * @param threshold The execute threshold, as a fraction of maximum health
 * @returns The health at which the execute triggers
 * @throws Not implemented.
 */
export function executeThreshold(maxHealth: number, threshold: number): number {
	return notImplemented("executeThreshold", maxHealth, threshold);
}
