import { notImplemented } from "../not-implemented";

/**
 * Calculates the share of the damage of a team that a champion dealt.
 *
 * @param damage The damage dealt by the champion
 * @param teamDamage The damage dealt by the team
 * @returns The damage share, as a fraction
 * @throws Not implemented.
 */
export function damageShare(damage: number, teamDamage: number): number {
	return notImplemented("damageShare", damage, teamDamage);
}

/**
 * Calculates the share of the gold of a team that a champion earned.
 *
 * @param gold The gold earned by the champion
 * @param teamGold The gold earned by the team
 * @returns The gold share, as a fraction
 * @throws Not implemented.
 */
export function goldShare(gold: number, teamGold: number): number {
	return notImplemented("goldShare", gold, teamGold);
}

/**
 * Calculates the damage a champion dealt per unit of gold it earned.
 *
 * @param damage The damage dealt by the champion
 * @param gold The gold earned by the champion
 * @returns The damage per gold
 * @throws Not implemented.
 */
export function damagePerGold(damage: number, gold: number): number {
	return notImplemented("damagePerGold", damage, gold);
}
