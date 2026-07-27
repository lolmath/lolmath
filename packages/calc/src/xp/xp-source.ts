import { notImplemented } from "../not-implemented";

/**
 * Calculates the experience awarded for killing a champion, including the
 * bonus and the penalty for the level difference between the two champions.
 *
 * @param victimLevel The decimal level of the slain champion
 * @param killerLevel The decimal level of the champion receiving experience
 * @returns The experience awarded
 * @throws Not implemented.
 */
export function championKillXp(
	victimLevel: number,
	killerLevel: number,
): number {
	return notImplemented("championKillXp", victimLevel, killerLevel);
}

/**
 * Converts a decimal level difference into an experience modifier.
 *
 * @param levelDifference The decimal level of the killer minus the decimal
 * level of the victim
 * @returns The experience multiplier
 * @throws Not implemented.
 */
export function levelDifferencex(levelDifference: number): number {
	return notImplemented("levelDifferencex", levelDifference);
}

/**
 * Calculates the experience a minion awards.
 *
 * @param type The minion type
 * @param gameTime The time since the start of the game, in seconds
 * @returns The base experience bounty of the minion
 * @throws Not implemented.
 */
export function minionXp(type: string, gameTime: number): number {
	return notImplemented("minionXp", type, gameTime);
}

/**
 * Calculates the experience a monster awards.
 *
 * @param type The monster type
 * @param gameTime The time since the start of the game, in seconds
 * @returns The base experience bounty of the monster
 * @throws Not implemented.
 */
export function monsterXp(type: string, gameTime: number): number {
	return notImplemented("monsterXp", type, gameTime);
}
