import type { Stacking } from "../enum/addition-type";
import type { StatKey } from "../enum/stat-key";

export interface Stat {
	key: StatKey;
	name: string;
	stacking: Stacking;
}
