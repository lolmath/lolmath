import { notImplemented } from "../not-implemented";

/**
 * Reports whether a unit is visible to a source of vision.
 *
 * @param distance The distance to the source of vision, in units
 * @param sightRadius The sight radius of the source, in units
 * @param inBrush Is the unit inside a brush the source has no vision of?
 * @param isStealthed Is the unit stealthed?
 * @returns Is the unit visible?
 * @throws Not implemented.
 */
export function hasVision(
	distance: number,
	sightRadius: number,
	inBrush: boolean,
	isStealthed: boolean,
): boolean {
	return notImplemented(
		"hasVision",
		distance,
		sightRadius,
		inBrush,
		isStealthed,
	);
}

/**
 * Calculates the area a source of vision reveals.
 *
 * @param sightRadius The sight radius of the source, in units
 * @returns The revealed area, in square units
 * @throws Not implemented.
 */
export function visionArea(sightRadius: number): number {
	return notImplemented("visionArea", sightRadius);
}
