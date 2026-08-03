---
"@lolmath/ui": patch
---

Give a selected `dimmed` `ToggleButton` a hextech border. Selecting a toggle
swaps its body to the hextech gradient, so leaving the dimmed preset's resting
grey frame around it read as an unfinished button; the border now follows the
body, with the hextech hover and press gradients on top of it. Disabled toggles
still grey out.

The rule that was meant to cover this state matched a `.selected` class the
component never renders — the selected state comes from react aria's
`data-selected` — so it never applied.
