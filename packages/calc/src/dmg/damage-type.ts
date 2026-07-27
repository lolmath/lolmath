/**
 * The three damage types. Physical damage is mitigated by armor, magic
 * damage is mitigated by magic resist, and true damage is mitigated by
 * neither.
 */
export type DamageType = "physical" | "magic" | "true";

/**
 * How the game engine classifies a source of damage. The classification
 * decides which on-damage effects trigger.
 */
export type DamageClass =
	| "attack"
	| "spell"
	| "spellaoe"
	| "spellpersist"
	| "proc"
	| "pet"
	| "raw"
	| "true";
