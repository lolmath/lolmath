import { notImplemented } from "../not-implemented";

/**
 * Reports whether objective bounties are active, which happens when a team
 * falls far enough behind.
 *
 * @param goldDeficit The gold the team is behind by
 * @param levelDeficit The total levels the team is behind by
 * @returns Are objective bounties active?
 * @throws Not implemented.
 */
export function objectiveBountiesActive(
	goldDeficit: number,
	levelDeficit: number,
): boolean {
	return notImplemented("objectiveBountiesActive", goldDeficit, levelDeficit);
}

/**
 * Calculates the bounty gold placed on an objective while objective bounties
 * are active.
 *
 * @param objective The objective name
 * @param goldDeficit The gold the trailing team is behind by
 * @returns The bounty gold on the objective
 * @throws Not implemented.
 */
export function objectiveBounty(
	objective: string,
	goldDeficit: number,
): number {
	return notImplemented("objectiveBounty", objective, goldDeficit);
}
