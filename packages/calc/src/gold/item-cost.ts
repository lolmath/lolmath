import { notImplemented } from "../not-implemented";

/**
 * Calculates the combine cost of an item, the gold that has to be paid on
 * top of its components.
 *
 * @param totalCost The total cost of the item
 * @param componentCosts The total cost of every component
 * @returns The combine cost
 * @throws Not implemented.
 */
export function combineCost(
	totalCost: number,
	componentCosts: readonly number[],
): number {
	return notImplemented("combineCost", totalCost, componentCosts);
}

/**
 * Calculates the gold that is still needed to complete an item.
 *
 * @param totalCost The total cost of the item
 * @param ownedComponentCosts The total cost of every component already owned
 * @returns The gold still needed
 * @throws Not implemented.
 */
export function upgradeCost(
	totalCost: number,
	ownedComponentCosts: readonly number[],
): number {
	return notImplemented("upgradeCost", totalCost, ownedComponentCosts);
}

/**
 * Calculates the gold refunded when an item is sold.
 *
 * @param totalCost The total cost of the item
 * @param refundRate The share of the cost that is refunded, as a fraction
 * @returns The gold refunded
 * @throws Not implemented.
 */
export function sellValue(totalCost: number, refundRate: number): number {
	return notImplemented("sellValue", totalCost, refundRate);
}
