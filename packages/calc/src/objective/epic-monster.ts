import { notImplemented } from "../not-implemented";

/**
 * Calculates the health of an epic monster, which scales with the time since
 * the start of the game.
 *
 * @param monster The epic monster name
 * @param gameTime The time since the start of the game, in seconds
 * @returns The maximum health of the epic monster
 * @throws Not implemented.
 */
export function epicMonsterHealth(monster: string, gameTime: number): number {
	return notImplemented("epicMonsterHealth", monster, gameTime);
}

/**
 * Calculates when an epic monster respawns after it has been slain.
 *
 * @param monster The epic monster name
 * @param slainAt The time the monster was slain, in seconds since the start
 * of the game
 * @returns The time the monster respawns, in seconds since the start of the
 * game
 * @throws Not implemented.
 */
export function epicMonsterRespawn(monster: string, slainAt: number): number {
	return notImplemented("epicMonsterRespawn", monster, slainAt);
}

/**
 * Calculates the strength of a dragon buff, which stacks for every dragon of
 * the same type the team has slain.
 *
 * @param dragon The dragon type
 * @param stacks The number of dragons of the type the team has slain
 * @returns The strength of the buff
 * @throws Not implemented.
 */
export function dragonBuff(dragon: string, stacks: number): number {
	return notImplemented("dragonBuff", dragon, stacks);
}

/**
 * Reports whether a team has earned a dragon soul.
 *
 * @param dragonsSlain The number of dragons the team has slain
 * @returns Has the team earned a soul?
 * @throws Not implemented.
 */
export function dragonSoulEarned(dragonsSlain: number): boolean {
	return notImplemented("dragonSoulEarned", dragonsSlain);
}

/**
 * Calculates the bonus attack damage and ability power the Baron buff grants
 * to a champion.
 *
 * @param lvl The level of the champion
 * @returns The bonus attack damage and ability power granted
 * @throws Not implemented.
 */
export function baronBuff(lvl: number): number {
	return notImplemented("baronBuff", lvl);
}

/**
 * Calculates the damage the Rift Herald deals when it charges a structure.
 *
 * @param gameTime The time since the start of the game, in seconds
 * @param structureHealth The maximum health of the structure
 * @returns The damage dealt to the structure
 * @throws Not implemented.
 */
export function heraldChargeDamage(
	gameTime: number,
	structureHealth: number,
): number {
	return notImplemented("heraldChargeDamage", gameTime, structureHealth);
}
