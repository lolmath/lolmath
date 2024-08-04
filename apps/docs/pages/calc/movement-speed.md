## `msCap`

Applies movement speed caps to a raw movement speed value.



```ts
import { msCap } from "@lolmath/calc";

msCap(msRaw)
```

### Arguments

- `msRaw` (*Number*): Raw movement speed


### Returns

(*Number*) Movement speed after caps



---
## `msTotal`

Calculates the total movement speed of a champion.



```ts
import { msTotal } from "@lolmath/calc";

msTotal(base, flat, percent, percentMultiplicative, bonusMultiplier)
```

### Arguments

- `base` (*Number*): The champion their base movement speed
- `flat` (*Number*): From shoes and other flat movement bonuses
- `percent` (*Number*): e.g. percentBonus1 + percentBonus2
- `percentMultiplicative` (*Number*): e.g. (1 + percentBonus1) * (1 + percentBonus2)
- `bonusMultiplier` (*Number*): unique for celerity


### Returns

(*Number*) The final movement speed of a champion

