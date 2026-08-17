import { notImplemented } from "../not-implemented";

/**
 * Calculates how long a dash takes to travel its distance.
 *
 * @param distance The dash distance, in units
 * @param speed The dash speed, in units per second
 * @returns The dash duration, in seconds
 * @throws Not implemented.
 */
export function dashDuration(distance: number, speed: number): number {
	return notImplemented("dashDuration", distance, speed);
}

/**
 * Calculates the speed of a dash that has a fixed duration rather than a
 * fixed speed.
 *
 * @param distance The dash distance, in units
 * @param duration The dash duration, in seconds
 * @returns The dash speed, in units per second
 * @throws Not implemented.
 */
export function dashSpeed(distance: number, duration: number): number {
	return notImplemented("dashSpeed", distance, duration);
}

/**
 * Calculates the time it takes to walk a distance.
 *
 * @param distance The distance, in units
 * @param ms The total movement speed
 * @returns The travel time, in seconds
 * @throws Not implemented.
 */
export function travelTime(distance: number, ms: number): number {
	return notImplemented("travelTime", distance, ms);
}
