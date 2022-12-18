## `dmgx`

Get a damage multiplier for a value of enemy resist. e.g. 100 armor = 0.5 physical damage dealt.

```ts
import { dmgx } from "@lolmath/calc";

dmgx(resist)
```

### Arguments

- `resist` (*Number*): the amount of armor or magic resist the enemy has.

### Returns

(*Number*) the damage multiplier



---
## `lethalityx`

Calculates the multiplier to be used for lethality to armor penetration
conversion.

```ts
import { lethalityx } from "@lolmath/calc";

lethalityx(lvl)
```

### Arguments

- `lvl` (*Number*): Current champion level

### Returns

(*Number*) The multiplier to be used for converting lethality to flat armor
penetration.



---
## `postReductionResist`

Magic penetration and magic resist reduction work exactly like armor
penetration and armor reduction. penetration and reduction are considered on
the target champion in the following order:

1. Reduction, flat.
2. Reduction, percentage.
3. Penetration, percentage.
4. Penetration, flat.

```ts
import { postReductionResist } from "@lolmath/calc";

postReductionResist(resist, flatReduction, percentReduction, percentPenetration, flatPenetration)
```

### Arguments

- `resist` (*Number*): The initial magic resist or armor.
- `flatReduction` (*Number*): Flat reduction of magic resist or armor.
- `percentReduction` (*Number*): Percent reduction of magic resist or armor.
- `percentPenetration` (*Number*): Percent penetration of magic resist or armor.
- `flatPenetration` (*Number*): Flat penetration of magic resist or armor.

### Returns

(*Number*) The resist after all reductions and penetrations.

