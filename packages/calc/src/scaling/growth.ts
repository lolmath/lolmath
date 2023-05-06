/**
 * Stats in League of Legends do not increase linearly with champion level. Use
 * this function to calculate the stat multiplier.
 *
 * @category Scaling
 *
 * @param lvl The current champion level
 * @returns the stat multiplier
 *
 * @example
 * ```ts
 * const base = 658;
 * const perLevel = 109;
 * const lvl = 13;
 * const stat = base + growth(lvl) * perLevel; // 1851.55
 * ```
 */
export function growth(lvl: number) {
  return (lvl - 1) * (0.7025 + 0.0175 * (lvl - 1));
}

