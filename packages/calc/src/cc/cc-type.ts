/**
 * Every crowd control type in the game.
 *
 * @remarks
 * Airborne, drowsy, nearsight, stasis and suppression are not affected by
 * tenacity.
 */
export type CcType =
	| "airborne"
	| "blind"
	| "charm"
	| "cripple"
	| "disarm"
	| "disrupt"
	| "drowsy"
	| "flee"
	| "ground"
	| "knockback"
	| "knockdown"
	| "knockup"
	| "nearsight"
	| "polymorph"
	| "pull"
	| "root"
	| "silence"
	| "sleep"
	| "slow"
	| "stasis"
	| "stun"
	| "suppression"
	| "suspension"
	| "taunt";
