import { notImplemented } from "../not-implemented";

/**
 * Calculates the base gold a champion is worth at a given level, before
 * bounties and before the assist split.
 *
 * @param lvl The level of the slain champion
 * @returns The base kill gold
 * @throws Not implemented.
 */
export function baseKillGold(lvl: number): number {
	return notImplemented("baseKillGold", lvl);
}

/**
 * Calculates the bounty a champion has accrued from the gold it has earned.
 *
 * @param goldFromTakedowns The gold earned from kills and assists
 * @param goldFromMinions The gold earned from minions and monsters
 * @param isBehind Is the champion behind in gold?
 * @returns The accrued bounty gold
 * @throws Not implemented.
 */
export function accruedBounty(
	goldFromTakedowns: number,
	goldFromMinions: number,
	isBehind: boolean,
): number {
	return notImplemented(
		"accruedBounty",
		goldFromTakedowns,
		goldFromMinions,
		isBehind,
	);
}

/**
 * Calculates the shutdown gold on top of the base kill gold.
 *
 * @param bounty The bounty the champion has accrued
 * @returns The shutdown gold
 * @throws Not implemented.
 */
export function shutdownGold(bounty: number): number {
	return notImplemented("shutdownGold", bounty);
}

/**
 * Calculates the total gold a takedown awards.
 *
 * @param baseGold The base kill gold
 * @param shutdown The shutdown gold
 * @param isFirstBlood Is this the first kill of the game?
 * @returns The total gold awarded for the kill
 * @throws Not implemented.
 */
export function killGold(
	baseGold: number,
	shutdown: number,
	isFirstBlood: boolean,
): number {
	return notImplemented("killGold", baseGold, shutdown, isFirstBlood);
}

/**
 * Calculates the gold a single assisting champion receives. Assist gold is
 * half of the kill gold, split between every assisting champion.
 *
 * @param totalKillGold The total gold awarded for the kill
 * @param assists The number of champions credited with an assist
 * @returns The gold a single assisting champion receives
 * @throws Not implemented.
 */
export function assistGold(totalKillGold: number, assists: number): number {
	return notImplemented("assistGold", totalKillGold, assists);
}

/**
 * Calculates the bounty a champion keeps after it has been shut down, since
 * only part of the bounty is paid out per death.
 *
 * @param bounty The bounty the champion had accrued
 * @param paidOut The bounty gold that was awarded to the killers
 * @returns The bounty that carries over to the next death
 * @throws Not implemented.
 */
export function bountyCarryOver(bounty: number, paidOut: number): number {
	return notImplemented("bountyCarryOver", bounty, paidOut);
}
