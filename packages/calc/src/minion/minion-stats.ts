import { notImplemented } from "../not-implemented";
import type { MinionType } from "./minion-type";

/**
 * Calculates how many upgrades minions have received. Minions receive an
 * upgrade every 90 seconds.
 *
 * @param gameTime The time since the start of the game, in seconds
 * @returns The number of upgrades
 * @throws Not implemented.
 */
export function minionUpgrades(gameTime: number): number {
	return notImplemented("minionUpgrades", gameTime);
}

/**
 * Calculates the health of a minion.
 *
 * @param type The minion type
 * @param gameTime The time since the start of the game, in seconds
 * @returns The maximum health of the minion
 * @throws Not implemented.
 */
export function minionHealth(type: MinionType, gameTime: number): number {
	return notImplemented("minionHealth", type, gameTime);
}

/**
 * Calculates the attack damage of a minion.
 *
 * @param type The minion type
 * @param gameTime The time since the start of the game, in seconds
 * @returns The attack damage of the minion
 * @throws Not implemented.
 */
export function minionAttackDamage(type: MinionType, gameTime: number): number {
	return notImplemented("minionAttackDamage", type, gameTime);
}

/**
 * Calculates the resistances of a minion.
 *
 * @param type The minion type
 * @param gameTime The time since the start of the game, in seconds
 * @returns The armor and magic resist of the minion
 * @throws Not implemented.
 */
export function minionResist(type: MinionType, gameTime: number): number {
	return notImplemented("minionResist", type, gameTime);
}
