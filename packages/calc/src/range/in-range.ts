import { notImplemented } from "../not-implemented";

/**
 * Reports whether a target is within basic attack range. Attack range is
 * measured from the edge of the gameplay radius of the attacker to the edge
 * of the gameplay radius of the target.
 *
 * @param centerDistance The distance between the two centres, in units
 * @param attackRange The attack range of the attacker, in units
 * @param gameplayRadius The gameplay radius of the attacker, in units
 * @param targetGameplayRadius The gameplay radius of the target, in units
 * @returns Is the target in range?
 * @throws Not implemented.
 */
export function inAttackRange(
	centerDistance: number,
	attackRange: number,
	gameplayRadius: number,
	targetGameplayRadius: number,
): boolean {
	return notImplemented(
		"inAttackRange",
		centerDistance,
		attackRange,
		gameplayRadius,
		targetGameplayRadius,
	);
}

/**
 * Reports whether a target is within the cast range of an ability. Unlike
 * basic attacks, most abilities are measured from centre to centre.
 *
 * @param centerDistance The distance between the two centres, in units
 * @param castRange The cast range of the ability, in units
 * @returns Is the target in range?
 * @throws Not implemented.
 */
export function inCastRange(
	centerDistance: number,
	castRange: number,
): boolean {
	return notImplemented("inCastRange", centerDistance, castRange);
}

/**
 * Reports whether a unit is inside the area of effect of a circular ability.
 *
 * @param centerDistance The distance from the centre of the area, in units
 * @param radius The radius of the area, in units
 * @param gameplayRadius The gameplay radius of the unit, in units
 * @returns Is the unit inside the area?
 * @throws Not implemented.
 */
export function inAreaOfEffect(
	centerDistance: number,
	radius: number,
	gameplayRadius: number,
): boolean {
	return notImplemented(
		"inAreaOfEffect",
		centerDistance,
		radius,
		gameplayRadius,
	);
}
