---
"@lolmath/ui": patch
---

Use raw color values for tailwind so that tailwind's color functions work again. E.g. if you used bg-lol-blue-300/50, it would not result in a class compiled by tailwind due to the inability to interpolate var() values.

If this fix needs to be done for other value types remains to be seen.
