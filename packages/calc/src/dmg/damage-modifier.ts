import { notImplemented } from "../not-implemented";

/**
 * Calculates the combined damage amplification of a unit. Damage
 * amplification stacks multiplicatively.
 *
 * @param sources The amplification from every source, as fractions
 * @returns The damage amplification multiplier
 * @throws Not implemented.
 */
export function damageAmpx(sources: readonly number[]): number {
	return notImplemented("damageAmpx", sources);
}

/**
 * Calculates the combined damage reduction of a unit. Damage reduction
 * stacks multiplicatively.
 *
 * @param sources The reduction from every source, as fractions
 * @returns The damage reduction multiplier
 * @throws Not implemented.
 */
export function damageReductionx(sources: readonly number[]): number {
	return notImplemented("damageReductionx", sources);
}

/**
 * Applies flat damage reduction, which is applied after percentage damage
 * reduction and cannot take the damage below zero.
 *
 * @param damage The damage before the reduction
 * @param flatReduction The flat damage reduction
 * @returns The damage after the reduction
 * @throws Not implemented.
 */
export function flatDamageReduction(
	damage: number,
	flatReduction: number,
): number {
	return notImplemented("flatDamageReduction", damage, flatReduction);
}

/**
 * Runs a raw damage value through the full damage pipeline.
 *
 * @remarks
 * Modifiers are applied in the following order.
 *
 * 1. Amplification on the attacker.
 * 2. Resistances of the target, after penetration.
 * 3. Percentage damage reduction on the target.
 * 4. Flat damage reduction on the target.
 * 5. Shields on the target.
 *
 * @param damage The raw damage
 * @param amp The damage amplification multiplier
 * @param resist The resistance of the target, after penetration
 * @param percentReduction The percentage damage reduction multiplier
 * @param flatReduction The flat damage reduction
 * @returns The damage that reaches the shields and the health bar
 * @throws Not implemented.
 */
export function damageFinal(
	damage: number,
	amp: number,
	resist: number,
	percentReduction: number,
	flatReduction: number,
): number {
	return notImplemented(
		"damageFinal",
		damage,
		amp,
		resist,
		percentReduction,
		flatReduction,
	);
}
