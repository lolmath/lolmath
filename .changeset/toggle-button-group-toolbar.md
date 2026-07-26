---
"@lolmath/ui": minor
---

Add `ToggleButtonGroup` and `Toolbar`.

- `ToggleButtonGroup` wraps a set of `ToggleButton`s with single or multiple
  selection, roving focus, and a shared `isDisabled`. Give each button an `id`
  to address it through `selectedKeys`/`onSelectionChange`. Supports
  `orientation="vertical"`.
- `Toolbar` groups related controls (buttons, toggle button groups, checkboxes)
  behind arrow key navigation, with `ToolbarSeparator` for the gold divider
  between groups. `ToolbarSeparator` defaults to `orientation="vertical"` for a
  horizontal toolbar; pass `orientation="horizontal"` inside a vertical one.
