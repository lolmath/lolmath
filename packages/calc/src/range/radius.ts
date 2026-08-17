import { notImplemented } from "../not-implemented";

/**
 * Calculates the effective reach of a basic attack, which is the attack
 * range plus the gameplay radius of both units.
 *
 * @param attackRange The attack range of the attacker, in units
 * @param gameplayRadius The gameplay radius of the attacker, in units
 * @param targetGameplayRadius The gameplay radius of the target, in units
 * @returns The reach, measured from centre to centre, in units
 * @throws Not implemented.
 */
export function attackReach(
	attackRange: number,
	gameplayRadius: number,
	targetGameplayRadius: number,
): number {
	return notImplemented(
		"attackReach",
		attackRange,
		gameplayRadius,
		targetGameplayRadius,
	);
}

/**
 * Calculates the distance at which a unit acquires a basic attack target on
 * its own, measured from edge to edge.
 *
 * @param acquisitionRadius The acquisition radius of the unit, in units
 * @param gameplayRadius The gameplay radius of the unit, in units
 * @returns The acquisition range, in units
 * @throws Not implemented.
 */
export function acquisitionRange(
	acquisitionRadius: number,
	gameplayRadius: number,
): number {
	return notImplemented("acquisitionRange", acquisitionRadius, gameplayRadius);
}

/**
 * Reports whether the centre of a unit would end up inside the pathing
 * radius of another unit, which is what unit collision prevents.
 *
 * @param centerDistance The distance between the two centres, in units
 * @param pathingRadius The pathing radius of the other unit, in units
 * @returns Do the two units collide?
 * @throws Not implemented.
 */
export function unitCollision(
	centerDistance: number,
	pathingRadius: number,
): boolean {
	return notImplemented("unitCollision", centerDistance, pathingRadius);
}
