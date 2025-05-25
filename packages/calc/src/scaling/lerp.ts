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
