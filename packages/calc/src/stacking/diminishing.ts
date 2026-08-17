import { notImplemented } from "../not-implemented";

/**
 * Computes the result of an effect with diminishing returns, where every
 * additional point is worth less than the one before it.
 *
 * @param value The raw value.
 * @param scale The value at which the effect reaches half of its maximum.
 * @returns The value after diminishing returns.
 * @throws Not implemented.
 */
export function diminishing(value: number, scale: number): number {
	return notImplemented("diminishing", value, scale);
}
