import { notImplemented } from "../not-implemented";

/**
 * Calculates the distance between the centres of two units.
 *
 * @param ax The x coordinate of the first unit
 * @param ay The y coordinate of the first unit
 * @param bx The x coordinate of the second unit
 * @param by The y coordinate of the second unit
 * @returns The distance between the two centres, in units
 * @throws Not implemented.
 */
export function distance(ax: number, ay: number, bx: number, by: number) {
	return notImplemented("distance", ax, ay, bx, by);
}

/**
 * Converts a centre to centre distance into an edge to edge distance, which
 * is what basic attacks and most missiles are measured against.
 *
 * @param centerDistance The distance between the two centres, in units
 * @param gameplayRadiusA The gameplay radius of the first unit, in units
 * @param gameplayRadiusB The gameplay radius of the second unit, in units
 * @returns The distance between the two edges, in units
 * @throws Not implemented.
 */
export function edgeDistance(
	centerDistance: number,
	gameplayRadiusA: number,
	gameplayRadiusB: number,
): number {
	return notImplemented(
		"edgeDistance",
		centerDistance,
		gameplayRadiusA,
		gameplayRadiusB,
	);
}
