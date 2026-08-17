import { notImplemented } from "../not-implemented";

/**
 * Calculates the base respawn wait of a champion, which only depends on its
 * level.
 *
 * @param lvl The level of the champion
 * @returns The base respawn wait, in seconds
 * @throws Not implemented.
 */
export function baseRespawnWait(lvl: number): number {
	return notImplemented("baseRespawnWait", lvl);
}

/**
 * Calculates the time increase factor, the share by which the base respawn
 * wait grows as the game goes on.
 *
 * @param gameTime The time since the start of the game, in seconds
 * @returns The time increase factor, as a fraction
 * @throws Not implemented.
 */
export function timeIncreasex(gameTime: number): number {
	return notImplemented("timeIncreasex", gameTime);
}

/**
 * Calculates the death timer of a champion.
 *
 * @param lvl The level of the champion
 * @param gameTime The time since the start of the game, in seconds
 * @returns The death timer, in seconds
 * @throws Not implemented.
 */
export function deathTimer(lvl: number, gameTime: number): number {
	return notImplemented("deathTimer", lvl, gameTime);
}

/**
 * Applies a death timer modifier, such as the reduction from a Guardian
 * Angel revive or the increase from a Chemtech Soul.
 *
 * @param timer The death timer, in seconds
 * @param modifier The modifier, as a fraction
 * @returns The modified death timer, in seconds
 * @throws Not implemented.
 */
export function deathTimerModified(timer: number, modifier: number): number {
	return notImplemented("deathTimerModified", timer, modifier);
}
