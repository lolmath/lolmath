import { notImplemented } from "../not-implemented";
import type { CcType } from "./cc-type";

/**
 * Calculates the duration of a crowd control effect on a target.
 *
 * @param type The crowd control type
 * @param duration The base duration, in seconds
 * @param tenacity The tenacity of the target, as a fraction
 * @param slowResist The slow resist of the target, as a fraction
 * @returns The duration on the target, in seconds
 * @throws Not implemented.
 */
export function ccDuration(
	type: CcType,
	duration: number,
	tenacity: number,
	slowResist: number,
): number {
	return notImplemented("ccDuration", type, duration, tenacity, slowResist);
}

/**
 * Applies the 0.3 second floor that no disable can be reduced below.
 *
 * @param duration The duration after reductions, in seconds
 * @returns The duration after the floor, in seconds
 * @throws Not implemented.
 */
export function ccDurationFloor(duration: number): number {
	return notImplemented("ccDurationFloor", duration);
}

/**
 * Reports whether a crowd control type is reduced by tenacity.
 *
 * @param type The crowd control type
 * @returns Is the type affected by tenacity?
 * @throws Not implemented.
 */
export function ccIsTenacityAffected(type: CcType): boolean {
	return notImplemented("ccIsTenacityAffected", type);
}
