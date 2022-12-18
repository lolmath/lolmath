## `growth`

Stats in League of Legends do not increase linearly with champion level. Use
this function to calculate the stat multiplier.

```ts
import { growth } from "@lolmath/calc";

growth(lvl)
```

### Arguments

- `lvl` (*Number*): The current champion level

### Returns

(*Number*) the stat multiplier



---
## `linear`

Linear scaling function. Returns a multiplier that is 0 at level 1 and 1 at
maxLevel.

```ts
import { linear } from "@lolmath/calc";

linear(maxLvl, lvl)
```

### Arguments

- `maxLvl` (*Number*): The level at which the scaling is 1
- `lvl` (*Number*): The current level of the ability

### Returns

(*Number*) the scaling multiplier



---
## `linear18`

The scaling for abilities that max out at level 18.

```ts
import { linear18 } from "@lolmath/calc";

linear18(lvl)
```

### Arguments

- `lvl` (*Number*): The current level of the ability

### Returns

(*Number*) the scaling multiplier



---
## `linear3`

The scaling for abilities that max out at level 3.

```ts
import { linear3 } from "@lolmath/calc";

linear3(lvl)
```

### Arguments

- `lvl` (*Number*): The current level of the ability

### Returns

(*Number*) the scaling multiplier



---
## `linear5`

The scaling for abilities that max out at level 5.

```ts
import { linear5 } from "@lolmath/calc";

linear5(lvl)
```

### Arguments

- `lvl` (*Number*): The current level of the ability

### Returns

(*Number*) the scaling multiplier

