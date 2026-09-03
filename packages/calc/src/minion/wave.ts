import { notImplemented } from "../not-implemented";
import type { MinionType } from "./minion-type";

/**
 * Calculates the interval between two minion waves, which shortens as the
 * game goes on.
 *
 * @param gameTime The time since the start of the game, in seconds
 * @returns The interval between two waves, in seconds
 * @throws Not implemented.
 */
export function waveInterval(gameTime: number): number {
	return notImplemented("waveInterval", gameTime);
}

/**
 * Calculates which wave has spawned most recently.
 *
 * @param gameTime The time since the start of the game, in seconds
 * @returns The one based index of the wave
 * @throws Not implemented.
 */
export function waveNumber(gameTime: number): number {
	return notImplemented("waveNumber", gameTime);
}

/**
 * Calculates when a wave spawns.
 *
 * @param wave The one based index of the wave
 * @returns The time the wave spawns, in seconds since the start of the game
 * @throws Not implemented.
 */
export function waveSpawnTime(wave: number): number {
	return notImplemented("waveSpawnTime", wave);
}

/**
 * Calculates how many minions of a type a wave contains. Siege minions only
 * spawn on some waves, and super minions only spawn once an inhibitor has
 * fallen.
 *
 * @param type The minion type
 * @param wave The one based index of the wave
 * @param inhibitorsDown The number of enemy inhibitors that are destroyed
 * @returns The number of minions of the type in the wave
 * @throws Not implemented.
 */
export function waveComposition(
	type: MinionType,
	wave: number,
	inhibitorsDown: number,
): number {
	return notImplemented("waveComposition", type, wave, inhibitorsDown);
}
