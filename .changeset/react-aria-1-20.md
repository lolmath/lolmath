---
"@lolmath/ui": minor
---

Upgrade to React Aria Components 1.20 / React Aria 3.51 and surface what it adds.

`PreviewTrigger` is new: a popover that opens on hover, focus, or long press, so hover-revealed content is reachable on touch — the gap that kept this library from having a tooltip. It composes with the existing `Popover`, and `Focusable` is now exported for triggers that are not already React Aria components.

`TokenField`, `TokenInput`, and `Token` are new (alpha upstream): a text field with inline, non-editable tokens sharing one caret, for mentions, tags, and prompt fields. Tokens take the same `gold`/`hextech`/`grey` treatment as `Tag`.

`MenuTrigger` now accepts `trigger="contextMenu"` for right click, long press, and the platform's context-menu key; `Pressable` is exported for wrapping a non-React-Aria trigger. `Table` accepts `keyboardNavigationBehavior="tab"`, which hands the arrow keys to a cell's own controls instead of moving between cells.
