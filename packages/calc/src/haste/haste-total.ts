import { notImplemented } from "../not-implemented";

/**
 * Calculates the total haste that applies to an ability. Ability haste,
 * basic ability haste and ultimate haste stack additively.
 *
 * @param abilityHaste Haste that applies to every ability
 * @param categoryHaste Haste that only applies to a category of abilities,
 * such as ultimate haste
 * @returns The total haste
 * @throws Not implemented.
 */
export function hasteTotal(
	abilityHaste: number,
	categoryHaste: number,
): number {
	return notImplemented("hasteTotal", abilityHaste, categoryHaste);
}

/**
 * Clamps haste to the 500 point cap.
 *
 * @param ah The amount of haste
 * @returns The haste after the cap has been applied
 * @throws Not implemented.
 */
export function hasteCap(ah: number): number {
	return notImplemented("hasteCap", ah);
}

/**
 * Calculates the cooldown of a summoner spell after summoner spell haste has
 * been applied.
 *
 * @param baseCooldown The cooldown before haste, in seconds
 * @param summonerHaste The amount of summoner spell haste
 * @returns The cooldown after haste, in seconds
 * @throws Not implemented.
 */
export function summonerCooldown(
	baseCooldown: number,
	summonerHaste: number,
): number {
	return notImplemented("summonerCooldown", baseCooldown, summonerHaste);
}

/**
 * Calculates the cooldown of an item active after item haste has been
 * applied.
 *
 * @param baseCooldown The cooldown before haste, in seconds
 * @param itemHaste The amount of item haste
 * @returns The cooldown after haste, in seconds
 * @throws Not implemented.
 */
export function itemCooldown(baseCooldown: number, itemHaste: number): number {
	return notImplemented("itemCooldown", baseCooldown, itemHaste);
}
