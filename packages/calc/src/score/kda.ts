import { notImplemented } from "../not-implemented";

/**
 * Calculates the kill to death ratio of a champion.
 *
 * @param kills The number of kills
 * @param deaths The number of deaths
 * @returns The kill to death ratio
 * @throws Not implemented.
 */
export function kd(kills: number, deaths: number): number {
	return notImplemented("kd", kills, deaths);
}

/**
 * Calculates the kill, death and assist ratio of a champion.
 *
 * @param kills The number of kills
 * @param deaths The number of deaths
 * @param assists The number of assists
 * @returns The kill, death and assist ratio
 * @throws Not implemented.
 */
export function kda(kills: number, deaths: number, assists: number): number {
	return notImplemented("kda", kills, deaths, assists);
}

/**
 * Calculates the share of the kills of a team a champion took part in.
 *
 * @param kills The number of kills of the champion
 * @param assists The number of assists of the champion
 * @param teamKills The number of kills of the team
 * @returns The kill participation, as a fraction
 * @throws Not implemented.
 */
export function killParticipation(
	kills: number,
	assists: number,
	teamKills: number,
): number {
	return notImplemented("killParticipation", kills, assists, teamKills);
}
