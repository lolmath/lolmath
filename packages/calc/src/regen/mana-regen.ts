import { notImplemented } from "../not-implemented";

/**
 * Calculates the total mana regeneration of a unit, expressed per five
 * seconds.
 *
 * @param base The base mana regeneration of the unit, per five seconds
 * @param bonus Bonus mana regeneration, per five seconds
 * @param percentBonus Bonus base mana regeneration, as a fraction
 * @returns The total mana regeneration, per five seconds
 * @throws Not implemented.
 */
export function mp5Total(
	base: number,
	bonus: number,
	percentBonus: number,
): number {
	return notImplemented("mp5Total", base, bonus, percentBonus);
}

/**
 * Converts mana regeneration per five seconds into mana per second.
 *
 * @param mp5 The mana regeneration, per five seconds
 * @returns The mana regeneration, per second
 * @throws Not implemented.
 */
export function manaRegenPerSecond(mp5: number): number {
	return notImplemented("manaRegenPerSecond", mp5);
}

/**
 * Calculates how long a champion can keep casting an ability before it runs
 * out of mana.
 *
 * @param mana The current mana of the champion
 * @param mp5 The mana regeneration, per five seconds
 * @param manaCost The mana cost of the ability
 * @param cooldown The cooldown of the ability, in seconds
 * @returns The time until the champion is out of mana, in seconds
 * @throws Not implemented.
 */
export function manaSustain(
	mana: number,
	mp5: number,
	manaCost: number,
	cooldown: number,
): number {
	return notImplemented("manaSustain", mana, mp5, manaCost, cooldown);
}
