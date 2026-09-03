import { notImplemented } from "../not-implemented";

/**
 * Calculates the total tenacity of a unit. Tenacity from the same group
 * stacks multiplicatively, tenacity from different groups stacks additively,
 * and the result is capped at 100%.
 *
 * @param groups The tenacity of every source, grouped by stacking group, as
 * fractions
 * @returns The total tenacity, as a fraction
 * @throws Not implemented.
 */
export function tenacityTotal(groups: readonly (readonly number[])[]): number {
	return notImplemented("tenacityTotal", groups);
}

/**
 * Converts tenacity into a crowd control duration multiplier.
 *
 * @param tenacity The tenacity of the target, as a fraction
 * @returns The duration multiplier
 * @throws Not implemented.
 */
export function tenacityx(tenacity: number): number {
	return notImplemented("tenacityx", tenacity);
}

/**
 * Calculates the effective tenacity of a unit that is affected by an effect
 * that reduces tenacity, such as Brittle.
 *
 * @param tenacity The tenacity of the target, as a fraction
 * @param tenacityReduction The tenacity reduction, as a fraction
 * @returns The effective tenacity, as a fraction
 * @throws Not implemented.
 */
export function tenacityEffective(
	tenacity: number,
	tenacityReduction: number,
): number {
	return notImplemented("tenacityEffective", tenacity, tenacityReduction);
}
