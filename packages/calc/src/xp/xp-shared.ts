import { notImplemented } from "../not-implemented";

/**
 * Calculates the share of the base experience bounty every nearby champion
 * receives. More nearby champions generate more total experience, but each
 * of them receives less.
 *
 * @param champions The number of champions sharing the experience
 * @returns The share of the base bounty each champion receives, as a fraction
 * @throws Not implemented.
 */
export function xpSharex(champions: number): number {
	return notImplemented("xpSharex", champions);
}

/**
 * Calculates the experience a single champion receives from a shared bounty.
 *
 * @param baseXp The base experience bounty
 * @param champions The number of champions sharing the experience
 * @returns The experience a single champion receives
 * @throws Not implemented.
 */
export function xpShared(baseXp: number, champions: number): number {
	return notImplemented("xpShared", baseXp, champions);
}
