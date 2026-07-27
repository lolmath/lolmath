import { notImplemented } from "../not-implemented";
import type { DamageType } from "./damage-type";

/**
 * Applies resistances to a damage value.
 *
 * @param damage The damage before mitigation
 * @param resist The armor or magic resist of the target, after penetration
 * @returns The damage after mitigation
 * @throws Not implemented.
 */
export function postMitigationDamage(damage: number, resist: number): number {
	return notImplemented("postMitigationDamage", damage, resist);
}

/**
 * Applies the resistance of the matching damage type to a damage value.
 *
 * @param damage The damage before mitigation
 * @param type The damage type
 * @param armor The armor of the target, after penetration
 * @param magicResist The magic resist of the target, after penetration
 * @returns The damage after mitigation
 * @throws Not implemented.
 */
export function postMitigationDamageTyped(
	damage: number,
	type: DamageType,
	armor: number,
	magicResist: number,
): number {
	return notImplemented(
		"postMitigationDamageTyped",
		damage,
		type,
		armor,
		magicResist,
	);
}
