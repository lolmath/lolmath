import { notImplemented } from "../not-implemented";

/**
 * Calculates when a jungle camp respawns after it has been cleared.
 *
 * @param clearedAt The time the camp was cleared, in seconds since the start
 * of the game
 * @param respawnTimer The respawn timer of the camp, in seconds
 * @returns The time the camp respawns, in seconds since the start of the game
 * @throws Not implemented.
 */
export function campRespawn(clearedAt: number, respawnTimer: number): number {
	return notImplemented("campRespawn", clearedAt, respawnTimer);
}

/**
 * Calculates the gold a jungle camp awards.
 *
 * @param camp The camp name
 * @param gameTime The time since the start of the game, in seconds
 * @returns The gold of the camp
 * @throws Not implemented.
 */
export function campGold(camp: string, gameTime: number): number {
	return notImplemented("campGold", camp, gameTime);
}

/**
 * Calculates the experience a jungle camp awards.
 *
 * @param camp The camp name
 * @param gameTime The time since the start of the game, in seconds
 * @returns The experience of the camp
 * @throws Not implemented.
 */
export function campXp(camp: string, gameTime: number): number {
	return notImplemented("campXp", camp, gameTime);
}

/**
 * Calculates how many camps a jungler can clear in a period of time.
 *
 * @param clearTime The time it takes to clear a single camp, in seconds
 * @param travelTime The time it takes to walk between two camps, in seconds
 * @param duration The period of time, in seconds
 * @returns The number of camps cleared
 * @throws Not implemented.
 */
export function campsPerMinute(
	clearTime: number,
	travelTime: number,
	duration: number,
): number {
	return notImplemented("campsPerMinute", clearTime, travelTime, duration);
}
