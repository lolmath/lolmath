import { notImplemented } from "../not-implemented";

/**
 * Calculates the on-hit damage a basic attack applies on top of its own
 * damage.
 *
 * @param flat Flat on-hit damage
 * @param adRatio The attack damage ratio of the on-hit effect
 * @param ad The total attack damage of the attacker
 * @param apRatio The ability power ratio of the on-hit effect
 * @param ap The ability power of the attacker
 * @returns The raw on-hit damage
 * @throws Not implemented.
 */
export function onHitDamage(
	flat: number,
	adRatio: number,
	ad: number,
	apRatio: number,
	ap: number,
): number {
	return notImplemented("onHitDamage", flat, adRatio, ad, apRatio, ap);
}

/**
 * Calculates the effectiveness of an on-hit effect applied by an ability
 * that applies on-hit effects at a reduced rate.
 *
 * @param damage The full on-hit damage
 * @param effectiveness The effectiveness, as a fraction
 * @returns The applied on-hit damage
 * @throws Not implemented.
 */
export function onHitEffectiveness(
	damage: number,
	effectiveness: number,
): number {
	return notImplemented("onHitEffectiveness", damage, effectiveness);
}

/**
 * Calculates the damage of an on-attack effect that only triggers once every
 * few attacks, averaged over time.
 *
 * @param damage The damage of the effect
 * @param attacksPerProc The number of attacks between two procs
 * @returns The average damage added to every basic attack
 * @throws Not implemented.
 */
export function procAverageDamage(
	damage: number,
	attacksPerProc: number,
): number {
	return notImplemented("procAverageDamage", damage, attacksPerProc);
}
