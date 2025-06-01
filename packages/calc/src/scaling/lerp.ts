import { linear3, linear5, linear18 } from "./linear";
/**
 * Interpolates a value between a minimum and maximum based on a given ratio.
 *
 * @category Scaling
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @param ratio - The ratio between 0 and 1 to interpolate the value.
 * @returns The interpolated value.
 *
 * @example
 * ```ts
 * // Teemo Q: 80 / 125 / 170 / 215 / 260
 * const min = 80;
 * const max = 260;
 * const level = 3;
 *
 * const damage = lerp(min, max, linear5(level)); // 170
 * ```
 */
export function lerp(min: number, max: number, ratio: number): number {
	return (1 - ratio) * min + ratio * max;
}

/**
 * Interpolates a value between min and max based on a 3-level scaling.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @param level - The current level (1 to 3).
 * @returns The interpolated value.
 *
 * @example
 * ```ts
 * const damage = lerp3(80, 180, 2); // 130
 * ```
 */
export function lerp3(min: number, max: number, level: number): number {
	return lerp(min, max, linear3(level));
}

/**
 * Interpolates a value between min and max based on a 5-level scaling.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @param level - The current level (1 to 5).
 * @returns The interpolated value.
 *
 * @example
 * ```ts
 * const damage = lerp5(80, 260, 3); // 170
 * ```
 */
export function lerp5(min: number, max: number, level: number): number {
	return lerp(min, max, linear5(level));
}

/**
 * Interpolates a value between min and max based on an 18-level scaling.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @param level - The current level (1 to 18).
 * @returns The interpolated value.
 *
 * @example
 * ```ts
 * const damage = lerp18(80, 260, 10); // 170
 * ```
 */
export function lerp18(min: number, max: number, level: number): number {
	return lerp(min, max, linear18(level));
}
