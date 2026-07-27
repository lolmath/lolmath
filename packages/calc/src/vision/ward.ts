import { notImplemented } from "../not-implemented";

/**
 * Calculates how long a ward lasts.
 *
 * @param ward The ward type
 * @param lvl The level of the champion that placed the ward
 * @returns The duration of the ward, in seconds
 * @throws Not implemented.
 */
export function wardDuration(ward: string, lvl: number): number {
	return notImplemented("wardDuration", ward, lvl);
}

/**
 * Calculates the health of a ward.
 *
 * @param ward The ward type
 * @param lvl The level of the champion that placed the ward
 * @returns The maximum health of the ward
 * @throws Not implemented.
 */
export function wardHealth(ward: string, lvl: number): number {
	return notImplemented("wardHealth", ward, lvl);
}

/**
 * Calculates how many wards of a type a champion may have placed at once.
 *
 * @param ward The ward type
 * @returns The number of wards that may be placed at once
 * @throws Not implemented.
 */
export function wardLimit(ward: string): number {
	return notImplemented("wardLimit", ward);
}

/**
 * Calculates the cooldown of a trinket, which shortens with the level of the
 * champion.
 *
 * @param trinket The trinket name
 * @param lvl The level of the champion
 * @param ah The amount of item haste of the champion
 * @returns The cooldown of the trinket, in seconds
 * @throws Not implemented.
 */
export function trinketCooldown(
	trinket: string,
	lvl: number,
	ah: number,
): number {
	return notImplemented("trinketCooldown", trinket, lvl, ah);
}
