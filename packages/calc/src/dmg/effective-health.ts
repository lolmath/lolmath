import { notImplemented } from "../not-implemented";

/**
 * Calculates the effective health of a unit against a single damage type.
 *
 * @param health The health of the unit
 * @param resist The armor or magic resist of the unit
 * @returns The effective health
 * @throws Not implemented.
 */
export function effectiveHealth(health: number, resist: number): number {
	return notImplemented("effectiveHealth", health, resist);
}

/**
 * Calculates the effective health of a unit against a mix of damage types.
 *
 * @param health The health of the unit
 * @param armor The armor of the unit
 * @param magicResist The magic resist of the unit
 * @param physicalShare The share of incoming damage that is physical, as a
 * fraction
 * @param trueShare The share of incoming damage that is true, as a fraction
 * @returns The effective health
 * @throws Not implemented.
 */
export function effectiveHealthMixed(
	health: number,
	armor: number,
	magicResist: number,
	physicalShare: number,
	trueShare: number,
): number {
	return notImplemented(
		"effectiveHealthMixed",
		health,
		armor,
		magicResist,
		physicalShare,
		trueShare,
	);
}

/**
 * Calculates how much effective health one more point of a resistance is
 * worth, which is how the value of stacking resistances against stacking
 * health is compared.
 *
 * @param health The health of the unit
 * @param resist The armor or magic resist of the unit
 * @returns The effective health gained per point of the resistance
 * @throws Not implemented.
 */
export function effectiveHealthPerResist(
	health: number,
	resist: number,
): number {
	return notImplemented("effectiveHealthPerResist", health, resist);
}
