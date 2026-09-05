---
"@lolmath/ui": minor
---

`Tree` takes a `preset`, with fifteen alternatives to the row treatment it has always had: `rail` draws guide lines down the ancestors so depth is shown rather than counted off the indent, `plate` racks every row as a bordered plate, `ledger` rules and stripes them as densely as a stat sheet, `banner` turns branches into gilded section bars, `compact` and `spacious` are the same treatment at either end of the spacing dial, `minimal` strips it to a tick and a weight, `glass` is a translucent pane to float over other content, `arcane` swaps gold for hextech teal, and `pill` insets the selected row the way an app sidebar does.

Five of the fifteen exist to keep the hextech wash the tables use off the selected row, since it is the loudest thing the default tree does: `engraved` presses the row into a metal face as a lit well, `gilded` fills it with the client's gold and puts the ink in hextech black, `bracket` closes a bracket on each end and tints nothing at all, `ember` blooms warm off the inline start with no edge anywhere in it, and `parchment` is ink on a scroll rather than light on a screen — the one preset that is not a dark panel.

Every preset draws every state — branch, leaf, hovered, selected, disabled — so the choice is only ever about how a tree looks, never about what it tells you.

`preset` defaults to `default`, which is the look every tree already had, so nothing changes for a tree that does not ask for one. The Storybook has a preset gallery that puts all sixteen side by side, and a second one for just the presets that leave the blue out.
