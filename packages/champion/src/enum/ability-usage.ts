export enum AbilityUsage {
	/**
	 * Damage that ignores shields. It is hard-coded to ignore Revival icon.png resurrection, but specific instances are then special-cased to be un-ignored.
	 */
	raw = "raw",
	/**
	 * As above, but also ignores invulnerability. Resurrection is ignored.
	 */
	internalraw = "internalraw",
	/**
	 * Ability-based procs with no interactions. Effects without a proper damage type default to this category, including most splash damage.
	 */
	periodic = "periodic",
	/**
	 * Attack-based procs with no interactions. Proc effects are triggered whenever you deal basic damage.
	 */
	proc = "proc",
	/**
	 * Damage type dealt by Thornmail. Similar reflection effects (e.g. Annie and Rammus) are classified as area damage.
	 */
	reactive = "reactive",

	/**
	 * Damage dealt by any unit(s), which includes turrets, neutral monsters, and minions. Basic attack and some champion abilities.
	 */
	attack = "attack",

	/**
	 * Damage used for single target abilities and some basic attacks.
	 */
	spell = "spell",

	/**
	 * Damage dealt by most abilities capable of damaging multiple units.
	 */
	spellaoe = "spellaoe",

	/**
	 * Damage dealt through DoTs
	 */
	spellpersist = "spellpersist",

	/**
	 * Damage dealt by most pet basic attacks. Other pet damage is classified as Spell/SpellPersist.
	 */
	pet = "pet",
}
