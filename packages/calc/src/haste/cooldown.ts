import { notImplemented } from "../not-implemented";

/**
 * Calculates the cooldown of an ability after haste has been applied.
 *
 * @param baseCooldown The cooldown before haste, in seconds
 * @param ah The amount of haste
 * @returns The cooldown after haste, in seconds
 * @throws Not implemented.
 */
export function cooldownFinal(baseCooldown: number, ah: number): number {
	return notImplemented("cooldownFinal", baseCooldown, ah);
}

/**
 * Calculates the casting rate, the number of casts per unit of time, which
 * scales linearly with haste.
 *
 * @param baseCooldown The cooldown before haste, in seconds
 * @param ah The amount of haste
 * @returns The number of casts per second
 * @throws Not implemented.
 */
export function castingRate(baseCooldown: number, ah: number): number {
	return notImplemented("castingRate", baseCooldown, ah);
}

/**
 * Calculates the remaining cooldown after a flat cooldown refund, such as the
 * refunds granted on takedown by several abilities.
 *
 * @param remaining The remaining cooldown, in seconds
 * @param refund The flat refund, in seconds
 * @returns The remaining cooldown after the refund, in seconds
 * @throws Not implemented.
 */
export function cooldownRefund(remaining: number, refund: number): number {
	return notImplemented("cooldownRefund", remaining, refund);
}

/**
 * Calculates the remaining cooldown after a percentage cooldown refund.
 *
 * @param remaining The remaining cooldown, in seconds
 * @param total The total cooldown, in seconds
 * @param percent The refund, as a fraction of the total cooldown
 * @returns The remaining cooldown after the refund, in seconds
 * @throws Not implemented.
 */
export function cooldownRefundPercent(
	remaining: number,
	total: number,
	percent: number,
): number {
	return notImplemented("cooldownRefundPercent", remaining, total, percent);
}
