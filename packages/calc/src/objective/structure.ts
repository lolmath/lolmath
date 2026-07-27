import { notImplemented } from "../not-implemented";

/**
 * Calculates when an inhibitor respawns after it has been destroyed.
 *
 * @param destroyedAt The time the inhibitor was destroyed, in seconds since
 * the start of the game
 * @returns The time the inhibitor respawns, in seconds since the start of the
 * game
 * @throws Not implemented.
 */
export function inhibitorRespawn(destroyedAt: number): number {
	return notImplemented("inhibitorRespawn", destroyedAt);
}

/**
 * Calculates the health a Nexus turret respawns with after the inhibitor
 * that fed it has come back.
 *
 * @param maxHealth The maximum health of the turret
 * @returns The health the turret respawns with
 * @throws Not implemented.
 */
export function nexusTurretRespawnHealth(maxHealth: number): number {
	return notImplemented("nexusTurretRespawnHealth", maxHealth);
}

/**
 * Calculates the health a structure regenerates over a period of time.
 *
 * @param regenPerSecond The health regeneration of the structure, per second
 * @param duration The period of time, in seconds
 * @returns The health regenerated
 * @throws Not implemented.
 */
export function structureRegen(
	regenPerSecond: number,
	duration: number,
): number {
	return notImplemented("structureRegen", regenPerSecond, duration);
}
