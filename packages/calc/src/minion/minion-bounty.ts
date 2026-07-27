import { notImplemented } from "../not-implemented";
import type { MinionType } from "./minion-type";

/**
 * Calculates the gold a minion awards to the champion that lands the killing
 * blow.
 *
 * @param type The minion type
 * @param gameTime The time since the start of the game, in seconds
 * @returns The gold bounty of the minion
 * @throws Not implemented.
 */
export function minionGold(type: MinionType, gameTime: number): number {
	return notImplemented("minionGold", type, gameTime);
}

/**
 * Calculates the total gold a single wave is worth.
 *
 * @param gameTime The time since the start of the game, in seconds
 * @returns The gold of the wave
 * @throws Not implemented.
 */
export function waveGold(gameTime: number): number {
	return notImplemented("waveGold", gameTime);
}
