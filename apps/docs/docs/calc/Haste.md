## `cdx`

Calculates the *Cooldown Multiplier* from Ability Haste

```ts
import { cdx } from "@lolmath/calc";

cdx(ah)
```

### Arguments

- `ah` (*Number*): The amount of Ability Haste

### Returns

(*Number*) The Cooldown Multiplier

### Examples

```ts
const ah = 0.1; // 10% Ability Haste
const cd = 10; // 10 seconds cooldown

const newCd = cd * cdx(ah); // ~9.1 seconds cooldown
```