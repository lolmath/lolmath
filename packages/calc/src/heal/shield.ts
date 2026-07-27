import { notImplemented } from "../not-implemented";

/**
 * Calculates the strength of a shield after heal and shield power has been
 * applied.
 *
 * @param baseShield The shield before any modifier
 * @param healAndShieldPower The heal and shield power of the caster, as a
 * fraction
 * @returns The shield strength
 * @throws Not implemented.
 */
export function shieldTotal(
	baseShield: number,
	healAndShieldPower: number,
): number {
	return notImplemented("shieldTotal", baseShield, healAndShieldPower);
}

/**
 * Calculates the remaining strength of a decaying shield.
 *
 * @param shield The initial shield strength
 * @param elapsed The time since the shield was applied, in seconds
 * @param duration The total duration of the shield, in seconds
 * @returns The remaining shield strength
 * @throws Not implemented.
 */
export function shieldDecay(
	shield: number,
	elapsed: number,
	duration: number,
): number {
	return notImplemented("shieldDecay", shield, elapsed, duration);
}

/**
 * Calculates the damage that gets through a shield. Shields absorb
 * post-mitigation damage, including true damage.
 *
 * @param shield The remaining shield strength
 * @param damage The incoming post-mitigation damage
 * @returns The damage taken by the health bar
 * @throws Not implemented.
 */
export function shieldAbsorb(shield: number, damage: number): number {
	return notImplemented("shieldAbsorb", shield, damage);
}

/**
 * Calculates the effective health a shield is worth against a damage type,
 * because a shield benefits from the resistances of the shielded unit.
 *
 * @param shield The shield strength
 * @param resist The armor or magic resist of the shielded unit
 * @returns The effective health granted by the shield
 * @throws Not implemented.
 */
export function shieldEffectiveHealth(shield: number, resist: number): number {
	return notImplemented("shieldEffectiveHealth", shield, resist);
}
