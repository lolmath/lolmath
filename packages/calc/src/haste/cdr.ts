import { notImplemented } from "../not-implemented";

/**
 * Converts an amount of haste into the cooldown reduction it represents.
 *
 * @param ah The amount of haste
 * @returns The cooldown reduction, as a fraction
 * @throws Not implemented.
 */
export function cdr(ah: number): number {
	return notImplemented("cdr", ah);
}

/**
 * Converts an amount of cooldown reduction into the haste that would be
 * required to reach it.
 *
 * @param reduction The cooldown reduction, as a fraction
 * @returns The equivalent amount of haste
 * @throws Not implemented.
 */
export function hasteFromCdr(reduction: number): number {
	return notImplemented("hasteFromCdr", reduction);
}
