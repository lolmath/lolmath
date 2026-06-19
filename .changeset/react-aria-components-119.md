---
"@lolmath/ui": minor
---

Upgrade react-aria-components to 1.19 and react-aria to 3.50.

- Added `SwitchField`/`SwitchButton`, `CheckboxField`/`CheckboxButton`, and `RadioField`/`RadioButton` built on the new react-aria field model, enabling description and `<FieldError>` slots on individual switches, checkboxes, and radios. The existing `Switch`, `Checkbox`, and `Radio` components are now `Field` + `Button` combos so they keep working standalone.
- `Slider` now renders its fill with `SliderFill` instead of hand-rolled left/width math (single and range thumbs both supported).
- `Menu`'s `onAction` now passes both the item key and value: `onAction(key, value)`.
- `Autocomplete` now also re-exports `AutocompleteContext` and `AutocompleteStateContext` for inline-completion flows.
