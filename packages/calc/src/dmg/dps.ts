import { notImplemented } from "../not-implemented";

/**
 * Calculates the basic attack damage per second of a unit.
 *
 * @param ad The total attack damage of the unit
 * @param as The total attack speed of the unit
 * @param critChance The critical strike chance, as a fraction
 * @param bonusCritDamage Bonus critical strike damage, as a fraction
 * @param onHit The on-hit damage per attack
 * @returns The damage per second, before mitigation
 * @throws Not implemented.
 */
export function dps(
	ad: number,
	as: number,
	critChance: number,
	bonusCritDamage: number,
	onHit: number,
): number {
	return notImplemented("dps", ad, as, critChance, bonusCritDamage, onHit);
}

/**
 * Calculates the effective damage per second of a unit against a target,
 * after the resistances of that target.
 *
 * @param rawDps The damage per second before mitigation
 * @param resist The armor or magic resist of the target, after penetration
 * @returns The damage per second after mitigation
 * @throws Not implemented.
 */
export function effectiveDps(rawDps: number, resist: number): number {
	return notImplemented("effectiveDps", rawDps, resist);
}

/**
 * Calculates how long it takes to kill a target.
 *
 * @param effectiveHealth The effective health of the target
 * @param mitigatedDps The damage per second after mitigation
 * @returns The time to kill, in seconds
 * @throws Not implemented.
 */
export function timeToKill(
	effectiveHealth: number,
	mitigatedDps: number,
): number {
	return notImplemented("timeToKill", effectiveHealth, mitigatedDps);
}

/**
 * Calculates the total damage of a burst combo.
 *
 * @param damages The damage of every instance in the combo
 * @returns The total damage of the combo
 * @throws Not implemented.
 */
export function burstDamage(damages: readonly number[]): number {
	return notImplemented("burstDamage", damages);
}
