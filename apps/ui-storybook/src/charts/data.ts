/**
 * Made-up match data, shaped the way lolmath.net's own data is shaped. Numbers
 * are plausible rather than real — the point is the chart, not the patch.
 */

export interface GoldMinute {
	minute: number;
	blue: number;
	red: number;
}

/** Two teams' total gold, minute by minute, with a lead that swings twice. */
export const goldTimeline: GoldMinute[] = [
	{ minute: 0, blue: 2500, red: 2500 },
	{ minute: 2, blue: 3410, red: 3380 },
	{ minute: 4, blue: 4620, red: 4390 },
	{ minute: 6, blue: 6180, red: 5720 },
	{ minute: 8, blue: 8040, red: 7310 },
	{ minute: 10, blue: 10120, red: 9460 },
	{ minute: 12, blue: 12330, red: 12010 },
	{ minute: 14, blue: 14180, red: 14760 },
	{ minute: 16, blue: 16240, red: 17690 },
	{ minute: 18, blue: 18930, red: 20410 },
	{ minute: 20, blue: 22150, red: 22980 },
	{ minute: 22, blue: 25740, red: 25120 },
	{ minute: 24, blue: 29610, red: 27340 },
	{ minute: 26, blue: 33280, red: 29870 },
	{ minute: 28, blue: 36120, red: 32640 },
	{ minute: 30, blue: 40410, red: 34980 },
];

export interface DamageMinute {
	minute: number;
	physical: number;
	magic: number;
	trueDamage: number;
}

/** One team's damage to champions, split by type. The parts sum to a total. */
export const damageComposition: DamageMinute[] = [
	{ minute: 0, physical: 0, magic: 0, trueDamage: 0 },
	{ minute: 3, physical: 1250, magic: 940, trueDamage: 120 },
	{ minute: 6, physical: 3180, magic: 2410, trueDamage: 310 },
	{ minute: 9, physical: 5940, magic: 4620, trueDamage: 680 },
	{ minute: 12, physical: 9120, magic: 7480, trueDamage: 1140 },
	{ minute: 15, physical: 13860, magic: 11020, trueDamage: 1820 },
	{ minute: 18, physical: 19240, magic: 15310, trueDamage: 2640 },
	{ minute: 21, physical: 25980, magic: 20470, trueDamage: 3710 },
	{ minute: 24, physical: 33410, magic: 26140, trueDamage: 5020 },
	{ minute: 27, physical: 41260, magic: 32380, trueDamage: 6480 },
	{ minute: 30, physical: 50120, magic: 39640, trueDamage: 8140 },
];

export interface RoleRow {
	role: string;
	gold: number;
	experience: number;
}

/** Gold and experience per minute by role, the shape a bar chart wants. */
export const roleEconomy: RoleRow[] = [
	{ role: "Top", gold: 372, experience: 484 },
	{ role: "Jungle", gold: 341, experience: 512 },
	{ role: "Mid", gold: 401, experience: 496 },
	{ role: "Bot", gold: 428, experience: 458 },
	{ role: "Support", gold: 246, experience: 372 },
];

export interface ChampionDamage {
	champion: string;
	damage: number;
	role: string;
}

/** A post-game scoreboard, ready to be ranked. */
export const scoreboard: ChampionDamage[] = [
	{ champion: "Kai'Sa", damage: 38420, role: "Bot" },
	{ champion: "Orianna", damage: 31280, role: "Mid" },
	{ champion: "Camille", damage: 24960, role: "Top" },
	{ champion: "Vi", damage: 18740, role: "Jungle" },
	{ champion: "Nautilus", damage: 9310, role: "Support" },
	{ champion: "Ezreal", damage: 27180, role: "Bot" },
	{ champion: "Ahri", damage: 22640, role: "Mid" },
	{ champion: "Sett", damage: 20110, role: "Top" },
];

export interface PatchWinRate {
	patch: string;
	winRate: number;
	pickRate: number;
}

/** One champion's win rate across patches, as a fraction. */
export const patchWinRates: PatchWinRate[] = [
	{ patch: "14.1", winRate: 0.482, pickRate: 0.061 },
	{ patch: "14.2", winRate: 0.491, pickRate: 0.068 },
	{ patch: "14.3", winRate: 0.517, pickRate: 0.094 },
	{ patch: "14.4", winRate: 0.534, pickRate: 0.131 },
	{ patch: "14.5", winRate: 0.508, pickRate: 0.118 },
	{ patch: "14.6", winRate: 0.496, pickRate: 0.089 },
	{ patch: "14.7", winRate: 0.503, pickRate: 0.077 },
];

const gold = new Intl.NumberFormat("en-US");
const percent = new Intl.NumberFormat("en-US", {
	style: "percent",
	maximumFractionDigits: 1,
});

export const formatGold = (value: number): string => gold.format(value);
export const formatShortGold = (value: number): string =>
	Math.abs(value) >= 1000 ? `${Math.round(value / 100) / 10}k` : String(value);
export const formatPercent = (value: number): string => percent.format(value);
export const formatMinute = (value: string | number): string => `${value}′`;
