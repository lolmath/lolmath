## `multiplicative`

Computes the multiplicative stacking of two values.

```ts
import { multiplicative } from "@lolmath/calc";

multiplicative(initial, value);
```

### Arguments

- `initial` (_Number_): The initial value.
- `value` (_Number_): The value to add to the accumulator.

### Returns

(_Number_) The result of the addition.

### Examples

```ts
const initial = 0.1; // Current Armor Penetration: 10%
const value = 0.1; // Additional Armor Penetration: 10%
const result = multiplicative(initial, value); // 19% Armor Penetration
```
