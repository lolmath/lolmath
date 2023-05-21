import { Stacking } from "../enum/addition-type";
import { StatKey } from "../enum/stat-key";

export interface Stat {
  key: StatKey;
  name: string;
  stacking: Stacking;
}
