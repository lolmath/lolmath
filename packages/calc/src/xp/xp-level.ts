import { notImplemented } from "../not-implemented";

/**
 * Calculates the experience needed to advance from a level to the next one.
 *
 * @param lvl The current champion level
 * @returns The experience needed to reach the next level
 * @throws Not implemented.
 */
export function xpToNextLevel(lvl: number): number {
	return notImplemented("xpToNextLevel", lvl);
}

/**
 * Calculates the total experience needed to reach a level from level one.
 *
 * @param lvl The target champion level
 * @returns The total experience needed
 * @throws Not implemented.
 */
export function xpTotalForLevel(lvl: number): number {
	return notImplemented("xpTotalForLevel", lvl);
}

/**
 * Calculates the level a champion is at, given its total experience.
 *
 * @param xp The total experience of the champion
 * @returns The champion level
 * @throws Not implemented.
 */
export function levelFromXp(xp: number): number {
	return notImplemented("levelFromXp", xp);
}

/**
 * Calculates the decimal level of a champion, which is the level plus the
 * progress towards the next level. Decimal levels decide the experience
 * bonus and penalty on champion kills.
 *
 * @param xp The total experience of the champion
 * @returns The decimal champion level
 * @throws Not implemented.
 */
export function decimalLevel(xp: number): number {
	return notImplemented("decimalLevel", xp);
}
