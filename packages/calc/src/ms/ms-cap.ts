/**
 * Applies movement speed caps to a raw movement speed value.
 *
 * @param msRaw Raw movement speed
 * @returns Movement speed after caps
 */
export function msCap(msRaw: number): number {
	if (msRaw > 490) {
		return msRaw * 0.5 + 230;
	}
	if (msRaw > 415) {
		return msRaw * 0.8 + 83;
	}
	if (msRaw < 220) {
		return msRaw * 0.5 + 110;
	}

	return msRaw;
}
