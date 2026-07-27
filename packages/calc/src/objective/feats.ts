import { notImplemented } from "../not-implemented";

/**
 * Reports whether a team has completed a feat of strength. A team completes
 * a feat by taking first blood, by taking three epic monsters, or by taking
 * three turrets.
 *
 * @param firstBlood Did the team take first blood?
 * @param epicMonsters The number of epic monsters the team has taken
 * @param turrets The number of turrets the team has taken
 * @returns The number of feats the team has completed
 * @throws Not implemented.
 */
export function featsCompleted(
	firstBlood: boolean,
	epicMonsters: number,
	turrets: number,
): number {
	return notImplemented("featsCompleted", firstBlood, epicMonsters, turrets);
}

/**
 * Calculates the bonus statistics the Feats of Strength reward grants, which
 * scale with the level of the champion.
 *
 * @param lvl The level of the champion
 * @returns The bonus adaptive force granted
 * @throws Not implemented.
 */
export function featsBonus(lvl: number): number {
	return notImplemented("featsBonus", lvl);
}
