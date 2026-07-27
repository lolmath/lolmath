import { notImplemented } from "../not-implemented";

/**
 * Calculates the attack damage of a turret, which grows with the time since
 * the start of the game.
 *
 * @param tier The turret tier
 * @param gameTime The time since the start of the game, in seconds
 * @returns The attack damage of the turret
 * @throws Not implemented.
 */
export function turretAttackDamage(tier: string, gameTime: number): number {
	return notImplemented("turretAttackDamage", tier, gameTime);
}

/**
 * Calculates the resistances of an outer turret, which decay between the
 * eleventh and the fifteenth minute.
 *
 * @param gameTime The time since the start of the game, in seconds
 * @returns The armor and magic resist of the turret
 * @throws Not implemented.
 */
export function turretResist(gameTime: number): number {
	return notImplemented("turretResist", gameTime);
}

/**
 * Calculates the damage a turret deals on a shot, since consecutive shots
 * against the same target ramp up in damage.
 *
 * @param baseDamage The attack damage of the turret
 * @param consecutiveShots The number of shots already landed on the target
 * @returns The damage of the shot
 * @throws Not implemented.
 */
export function turretDamageRamp(
	baseDamage: number,
	consecutiveShots: number,
): number {
	return notImplemented("turretDamageRamp", baseDamage, consecutiveShots);
}

/**
 * Calculates how many turret plates are left on an outer turret.
 *
 * @param platesTaken The number of plates already destroyed
 * @param gameTime The time since the start of the game, in seconds
 * @returns The number of plates left
 * @throws Not implemented.
 */
export function turretPlates(platesTaken: number, gameTime: number): number {
	return notImplemented("turretPlates", platesTaken, gameTime);
}

/**
 * Calculates the gold destroying a turret awards.
 *
 * @param tier The turret tier
 * @param platesTaken The number of plates destroyed before the turret fell
 * @param participants The number of champions near the turret when it fell
 * @returns The gold awarded to the champion that lands the killing blow
 * @throws Not implemented.
 */
export function turretGold(
	tier: string,
	platesTaken: number,
	participants: number,
): number {
	return notImplemented("turretGold", tier, platesTaken, participants);
}
