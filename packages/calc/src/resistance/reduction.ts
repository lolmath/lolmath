/**
 * Magic penetration and magic resistance reduction work exactly like armor
 * penetration and armor reduction. penetration and reduction are considered on
 * the target champion in the following order:
 *
 * 1. resistance reduction, flat.
 * 2. resistance reduction, percentage.
 * 3. resistance penetration, percentage.
 * 4. resistance penetration, flat.
 *
 * @param resistance magic resistance or armor of the other champion
 * @param flatResistanceReduction flat reduction of armor through spells,
 * temporary mostly.
 * @param percentResistanceReduction percent reduction of armor through spells
 * mostly. Mostly temporary
 * @param percentResistancePenetration resistance penetration, percent, mostly
 * by items
 * @param flatResistancePenetration flat resistance penetration
 */
export function postReductionResistance(
  resistance: number,
  flatResistanceReduction: number,
  percentResistanceReduction: number,
  percentResistancePenetration: number,
  flatResistancePenetration: number,
) {
  // Don't modify original.
  let newResistance = resistance;
  newResistance -= flatResistanceReduction;
  // Only flat resistance reduction will apply below 0.
  if (newResistance > 0) {
    newResistance *= 1 - percentResistanceReduction;
    newResistance *= 1 - percentResistancePenetration;
    newResistance -= flatResistancePenetration;
    // We cannot penetrate below 0.
    if (newResistance < 0) {
      newResistance = 0;
    }
  }

  return newResistance;
}
