import { notImplemented } from "../not-implemented";

/**
 * Calculates the gold efficiency of an item, the gold value of its
 * statistics relative to its price.
 *
 * @param goldValue The gold value of the statistics of the item
 * @param price The price of the item
 * @returns The gold efficiency, as a fraction
 * @throws Not implemented.
 */
export function goldEfficiency(goldValue: number, price: number): number {
	return notImplemented("goldEfficiency", goldValue, price);
}

/**
 * Calculates the gold value of an amount of a statistic.
 *
 * @param goldPerUnit The gold value of a single unit of the statistic
 * @param amount The amount of the statistic
 * @returns The gold value
 * @throws Not implemented.
 */
export function statGoldValue(goldPerUnit: number, amount: number): number {
	return notImplemented("statGoldValue", goldPerUnit, amount);
}

/**
 * Calculates the gold value that an item provides beyond the gold value of
 * its statistics, which is what a passive or an active has to be worth for
 * the item to be gold efficient.
 *
 * @param price The price of the item
 * @param statValue The gold value of the statistics of the item
 * @returns The gold value the effects of the item have to make up
 * @throws Not implemented.
 */
export function goldValueGap(price: number, statValue: number): number {
	return notImplemented("goldValueGap", price, statValue);
}
