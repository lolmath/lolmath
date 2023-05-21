import type { ChampionKey } from "../enum/champion-key";
import type { Ability } from "./ability";
import { UpgradableAbilityKey } from "./ability-key";

export interface PlayerChampionData {
  championKey: ChampionKey;
  abilities: Ability[];
  skillOrder?: UpgradableAbilityKey[];
  scenario: IChampionBattleSet;
  statPreference: StatPreference;
  proficiency: ProficiencyData;
  specification: ChampionSpecificationData;
}

export enum Stat {
  baseAttackSpeed = "baseAttackSpeed",
  attackSpeedRatio = "attackSpeedRatio",
  movementSpeed = "movementSpeed",
  attackRange = "attackRange",

  hp = "hp",
  mana = "mana",
  armor = "armor",
  magicResist = "magicResist",
  hpRegen = "hpRegen",
  manaRegen = "manaRegen",
  critChance = "critChance",
  attackDamage = "attackDamage",
  bonusAttackSpeed = "bonusAttackSpeed",
}

export interface BaseStatsState {
  hp: number;
  hpPerLevel: number;
  mana: number;
  manaPerLevel: number;
  movementSpeed: number;
  armor: number;
  armorPerLevel: number;
  magicResist: number;
  magicResistPerLevel: number;
  attackRange: number;
  hpRegen: number;
  hpRegenPerLevel: number;
  manaRegen: number;
  manaRegenPerLevel: number;
  critChance: number;
  critChancePerLevel: number;
  attackDamage: number;
  attackDamagePerLevel: number;

  attackSpeedPerLevel: number;
  attackSpeedRatio: number;
  baseAttackSpeed: number;
}

export type BaseStatsCalculatedState = {
  [key in Stat]: number;
};

/**
 * Player Champion State:
 * - Manually updated data
 * - Enriched with Auto-updated data
 */
export interface PlayerChampionState extends PlayerChampionData {
  specification: ChampionSpecificationState;
  proficiency: ProficiencyState;
  itemRoleBonus: {
    [key in LanePosition]: boolean;
  };
  runes: (RuneId | undefined)[];
  baseStats: BaseStatsState;
  skillOrder: UpgradableSkill[];
  scenario: {
    preset: string;
  } & IChampionBattleSet;
  abilities: {
    P: AbilityState;
    Q: AbilityState;
    W: AbilityState;
    E: AbilityState;
    R: AbilityState;
  };
}

export interface PlayerChampionPreset {
  name: string;
  settings: PlayerChampionData;
}

export type ChampionAbilityInfo<T extends string | number> = {
  [ability in T]: {
    image: string;
    description: string;
  };
};
