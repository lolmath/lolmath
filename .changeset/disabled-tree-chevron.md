---
"@lolmath/ui": patch
---

A disabled `Tree` row's chevron no longer lights up under the pointer. React Aria's expand button checks the row's disabled state before toggling, but does not pass that state to the button, so the chevron kept swapping to its hover art for a press it would never answer. It is handed the state now, which also announces it as disabled rather than as a live control.
