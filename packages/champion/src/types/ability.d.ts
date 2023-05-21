import type { AbilityDamage } from "../enum/ability-damage";
import type { AbilityTarget } from "../enum/ability-target";
import type { AbilityUsage } from "../enum/ability-usage";
import type { AbilityKey } from "./ability-key";

export interface Ability {
  cooldown: number[];
  damageType: AbilityDamage;
  targetType: AbilityTarget;
  usageType?: AbilityUsage;

  onHit: number;
  imperialMandate: number;
  rylaisImperialMandate: number;
  abyssalMaskNegative: number;
  muramana: number;
  turretDamage: number;

  spellEffects: boolean;
  phantomHit: boolean;
  lifeSteal: boolean;
  hasHardCc: boolean;

  levelKey: AbilityKey;
  id: string;
}
