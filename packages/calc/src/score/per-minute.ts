import { notImplemented } from "../not-implemented";

/**
 * Calculates the number of minions and monsters a champion kills per minute.
 *
 * @param creepScore The number of minions and monsters killed
 * @param gameTime The time since the start of the game, in seconds
 * @returns The creep score per minute
 * @throws Not implemented.
 */
export function csPerMinute(creepScore: number, gameTime: number): number {
	return notImplemented("csPerMinute", creepScore, gameTime);
}

/**
 * Calculates the damage a champion deals per minute.
 *
 * @param damage The damage dealt
 * @param gameTime The time since the start of the game, in seconds
 * @returns The damage per minute
 * @throws Not implemented.
 */
export function damagePerMinute(damage: number, gameTime: number): number {
	return notImplemented("damagePerMinute", damage, gameTime);
}
