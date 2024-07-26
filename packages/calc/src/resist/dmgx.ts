/**
 * Converts an amount of resist to a *Damage Multiplier*.
 *
 * @category Resist
 *
 * @param resist The amount of armor or magic resist.
 * @returns The damage multiplier.
 *
 * @example
 *
 * ```ts
 * const resist = 100; // 100 armor
 * const dmg = 100; // 100 damage
 * const result = dmgx(resist); // 50 damage
 * ```
 */
export function dmgx(resist: number) {
	if (resist > 0) {
		return 100 / (100 + resist);
	}
	return 2 - 100 / (100 - resist);
}
