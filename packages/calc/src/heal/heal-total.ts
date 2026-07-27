import { notImplemented } from "../not-implemented";

/**
 * Calculates the healing an ability provides, after heal and shield power
 * and healing modifiers of the healer have been applied.
 *
 * @param baseHeal The healing before any modifier
 * @param healAndShieldPower The heal and shield power of the healer, as a
 * fraction
 * @returns The healing before the target their healing modifiers
 * @throws Not implemented.
 */
export function healTotal(
	baseHeal: number,
	healAndShieldPower: number,
): number {
	return notImplemented("healTotal", baseHeal, healAndShieldPower);
}

/**
 * Converts heal and shield power into a multiplier.
 *
 * @param healAndShieldPower The heal and shield power, as a fraction
 * @returns The healing and shielding multiplier
 * @throws Not implemented.
 */
export function healx(healAndShieldPower: number): number {
	return notImplemented("healx", healAndShieldPower);
}

/**
 * Calculates the healing a unit actually receives, after healing reduction
 * and the maximum health of the target have been taken into account.
 *
 * @param heal The incoming healing
 * @param healingReduction The healing reduction on the target, as a fraction
 * @param currentHealth The current health of the target
 * @param maxHealth The maximum health of the target
 * @returns The health restored
 * @throws Not implemented.
 */
export function healReceived(
	heal: number,
	healingReduction: number,
	currentHealth: number,
	maxHealth: number,
): number {
	return notImplemented(
		"healReceived",
		heal,
		healingReduction,
		currentHealth,
		maxHealth,
	);
}

/**
 * Calculates the healing that is wasted because it would take the target
 * above its maximum health.
 *
 * @param heal The incoming healing
 * @param currentHealth The current health of the target
 * @param maxHealth The maximum health of the target
 * @returns The wasted healing
 * @throws Not implemented.
 */
export function overheal(
	heal: number,
	currentHealth: number,
	maxHealth: number,
): number {
	return notImplemented("overheal", heal, currentHealth, maxHealth);
}
