## `dmgx`

Converts an amount of resist to a *Damage Multiplier*.



```ts
import { dmgx } from "@lolmath/calc";

dmgx(resist)
```

### Arguments

- `resist` (*Number*): The amount of armor or magic resist.


### Returns

(*Number*) The damage multiplier.

### Examples

```ts
const resist = 100; // 100 armor
const dmg = 100; // 100 damage
const result = dmgx(resist); // 50 damage
```

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

### Examples

```ts
const lethality = 100;
const level = 13;

const armorPenFlat = lethality * lethalityx(level); // ~88.9
```

---
## `postReductionResist`

Calculates the resist after all reductions and penetrations have been
applied.

<details><summary>More Info</summary>
<p>

Magic penetration and magic resist reduction work exactly like armor
penetration and armor reduction. penetration and reduction are considered on
the target champion in the following order:

1. Reduction, flat.
2. Reduction, percentage.
3. Penetration, percentage.
4. Penetration, flat.

</p>
</details>


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

