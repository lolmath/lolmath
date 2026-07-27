import { notImplemented } from "../not-implemented";

/**
 * Calculates the vision score of a champion. Vision score rewards the time
 * a champion grants vision to its team and the time it denies vision to the
 * enemy team.
 *
 * @param visionGranted The time allied wards placed by the champion provided
 * vision for, in seconds
 * @param visionDenied The time enemy wards destroyed by the champion would
 * still have provided vision for, in seconds
 * @returns The vision score
 * @throws Not implemented.
 */
export function visionScore(
	visionGranted: number,
	visionDenied: number,
): number {
	return notImplemented("visionScore", visionGranted, visionDenied);
}

/**
 * Calculates the vision score generated per minute.
 *
 * @param score The vision score
 * @param gameTime The time since the start of the game, in seconds
 * @returns The vision score per minute
 * @throws Not implemented.
 */
export function visionScorePerMinute(score: number, gameTime: number): number {
	return notImplemented("visionScorePerMinute", score, gameTime);
}
