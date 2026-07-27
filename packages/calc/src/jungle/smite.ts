import { notImplemented } from "../not-implemented";

/**
 * Calculates the true damage Smite deals to a monster.
 *
 * @param lvl The level of the champion
 * @returns The damage of Smite
 * @throws Not implemented.
 */
export function smiteDamage(lvl: number): number {
	return notImplemented("smiteDamage", lvl);
}

/**
 * Reports whether Smite would secure a monster.
 *
 * @param damage The damage of Smite
 * @param currentHealth The current health of the monster
 * @param incomingDamage The damage that lands before Smite does
 * @returns Would Smite secure the monster?
 * @throws Not implemented.
 */
export function smiteSecures(
	damage: number,
	currentHealth: number,
	incomingDamage: number,
): boolean {
	return notImplemented("smiteSecures", damage, currentHealth, incomingDamage);
}
