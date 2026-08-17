import { notImplemented } from "../not-implemented";

/**
 * Calculates the level of a jungle monster, which scales with the time since
 * the start of the game.
 *
 * @param gameTime The time since the start of the game, in seconds
 * @returns The monster level
 * @throws Not implemented.
 */
export function monsterLevel(gameTime: number): number {
	return notImplemented("monsterLevel", gameTime);
}

/**
 * Calculates the health of a jungle monster.
 *
 * @param baseHealth The health of the monster at its base level
 * @param growth The health the monster gains per level
 * @param lvl The monster level
 * @returns The maximum health of the monster
 * @throws Not implemented.
 */
export function monsterHealth(
	baseHealth: number,
	growth: number,
	lvl: number,
): number {
	return notImplemented("monsterHealth", baseHealth, growth, lvl);
}

/**
 * Applies the damage modifier that a monster has against champions, such as
 * the modifiers on epic monsters.
 *
 * @param damage The damage before the modifier
 * @param modifier The modifier, as a fraction
 * @returns The damage after the modifier
 * @throws Not implemented.
 */
export function monsterDamage(damage: number, modifier: number): number {
	return notImplemented("monsterDamage", damage, modifier);
}
