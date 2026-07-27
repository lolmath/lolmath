import { notImplemented } from "../not-implemented";

/**
 * Calculates the total critical strike chance of a unit. Critical strike
 * chance stacks additively.
 *
 * @param sources The critical strike chance from every source, as fractions
 * @returns The total critical strike chance, as a fraction
 * @throws Not implemented.
 */
export function critChanceTotal(sources: readonly number[]): number {
	return notImplemented("critChanceTotal", sources);
}

/**
 * Clamps critical strike chance to the 100% cap.
 *
 * @param critChance The critical strike chance, as a fraction
 * @returns The critical strike chance after the cap, as a fraction
 * @throws Not implemented.
 */
export function critChanceCap(critChance: number): number {
	return notImplemented("critChanceCap", critChance);
}

/**
 * Calculates the critical strike chance beyond the 100% cap, which some
 * effects convert into other statistics.
 *
 * @param critChance The critical strike chance, as a fraction
 * @returns The excess critical strike chance, as a fraction
 * @throws Not implemented.
 */
export function critChanceExcess(critChance: number): number {
	return notImplemented("critChanceExcess", critChance);
}
