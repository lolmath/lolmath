## `multiplicative`

Computes the multiplicative stacking of two values.



```ts
import { multiplicative } from "@lolmath/calc";

multiplicative(initial, value)
```

### Arguments

- `initial` (*Number*): The initial value.
- `value` (*Number*): The value to add.


### Returns

(*Number*) The result of the addition.

### Examples

```ts
const initial = 0.1; // Current Armor Penetration: 10%
const value = 0.1; // Additional Armor Penetration: 10%
const result = multiplicative(initial, value); // 19% Armor Penetration