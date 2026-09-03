import { notImplemented } from "../not-implemented";

/**
 * Calculates the duration of a channel.
 *
 * @param baseDuration The base channel duration, in seconds
 * @param ah The amount of haste of the caster
 * @param scalesWithHaste Does the channel duration scale with haste?
 * @returns The channel duration, in seconds
 * @throws Not implemented.
 */
export function channelDuration(
	baseDuration: number,
	ah: number,
	scalesWithHaste: boolean,
): number {
	return notImplemented("channelDuration", baseDuration, ah, scalesWithHaste);
}

/**
 * Calculates how much of a channel was completed before it was interrupted.
 *
 * @param duration The full channel duration, in seconds
 * @param elapsed The time the channel lasted, in seconds
 * @returns The share of the channel that was completed, as a fraction
 * @throws Not implemented.
 */
export function channelProgress(duration: number, elapsed: number): number {
	return notImplemented("channelProgress", duration, elapsed);
}
