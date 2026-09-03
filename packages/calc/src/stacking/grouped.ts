import { notImplemented } from "../not-implemented";

/**
 * Computes the result of effects that stack multiplicatively within their own
 * group and additively across groups, the way tenacity does.
 *
 * @param groups The values of every effect, grouped by stacking group.
 * @returns The combined value.
 * @throws Not implemented.
 */
export function grouped(groups: readonly (readonly number[])[]): number {
	return notImplemented("grouped", groups);
}
