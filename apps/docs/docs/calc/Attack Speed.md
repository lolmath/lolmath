## `totalAttackSpeed`

Calculates the total attack speed of a champion

```ts
import { totalAttackSpeed } from "@lolmath/calc";

totalAttackSpeed(base, ratio, bonus, urfMode, isMelee)
```

### Arguments

- `base` (*Number*): Base attack speed
- `ratio` (*Number*): Attack speed ratio
- `bonus` (*Number*): Bonus attack speed
- `urfMode` (*Boolean*): Is URF mode active?
- `isMelee` (*Boolean*): Is the champion melee? (This is only used in URF mode)

### Returns

(*Number*) Total attack speed

