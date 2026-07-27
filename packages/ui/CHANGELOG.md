# @lolmath/ui

## 9.1.0

### Minor Changes

- 188be70: Add a `Tree` built on `react-aria-components`, styled after the collapsible
  lists in the League client.

  - `Tree`, `TreeItem`, `TreeItemContent` and `TreeLoadMoreItem`.
  - `TreeItemContent` adds the expand chevron for items with children and the
    selection checkbox for `selectionMode="multiple"`; leaves keep the chevron's
    footprint so their labels stay aligned. `selectionBehavior="replace"` drops
    the checkboxes in favour of highlighting the row.
  - Selected rows get the same gold spine and hextech highlight as `Table` rows.
  - Branch rows are set in uppercase Beaufort like the client's section headers,
    leaves in Spiegel, and top-level items are separated by a gold hairline.
  - Indentation comes from the level react aria exposes on each row, tunable per
    tree with the `--lol-tree-indent` custom property.
  - `Tree` takes an `emptyState` node, defaulting to "No results found", and
    `TreeLoadMoreItem` renders the spinner while `isLoading`.

- a1240e1: Add `ToggleButtonGroup` and `Toolbar`.

  - `ToggleButtonGroup` wraps a set of `ToggleButton`s with single or multiple
    selection, roving focus, and a shared `isDisabled`. Give each button an `id`
    to address it through `selectedKeys`/`onSelectionChange`. Adjacent buttons
    overlap by one border width so the group reads as a single segmented control
    rather than a row of separate buttons. Supports `orientation="vertical"`.
  - `Toolbar` groups related controls (buttons, toggle button groups, checkboxes)
    behind arrow key navigation, with `ToolbarSeparator` for the gold divider
    between groups. `ToolbarSeparator` defaults to `orientation="vertical"` for a
    horizontal toolbar; pass `orientation="horizontal"` inside a vertical one.

## 9.0.0

### Major Changes

- 68e95dc: Move to tsdown

### Minor Changes

- 9ddab57: Add a `Table` built on `react-aria-components`, styled after the ranked ladder
  in the League client (`rcp-fe-lol-leagues`).

  - `Table`, `TableHeader`, `TableColumn`, `TableBody`, `TableRow`, `TableCell`,
    `TableFooter`, plus `ResizableTableContainer` and `TableColumnResizer`.
  - Selected rows are marked with the client's gold spine and hextech highlight.
    Selection adds no checkbox column, so turning it on never shifts the layout.
  - `TableColumn` and `TableCell` take an `align` prop (`start`/`center`/`end`)
    for stat columns, and sortable columns get a hextech sort indicator.
  - `TableBody` takes an `emptyState` node, defaulting to "No results found".
  - Re-exports the `SortDescriptor` and `SortDirection` types.

- 61a81f4: Upgrade react-aria-components to 1.19 and react-aria to 3.50.

  - Added `SwitchField`/`SwitchButton`, `CheckboxField`/`CheckboxButton`, and `RadioField`/`RadioButton` built on the new react-aria field model, enabling description and `<FieldError>` slots on individual switches, checkboxes, and radios. The existing `Switch`, `Checkbox`, and `Radio` components are now `Field` + `Button` combos so they keep working standalone.
  - `Slider` now renders its fill with `SliderFill` instead of hand-rolled left/width math (single and range thumbs both supported).
  - `Menu`'s `onAction` now passes both the item key and value: `onAction(key, value)`.
  - `Autocomplete` now also re-exports `AutocompleteContext` and `AutocompleteStateContext` for inline-completion flows.

### Patch Changes

- 4627763: Fix dimmed (thin) buttons rendering with a 2px border instead of 1px.

  A prior refactor moved the `.thin { border-width: 1px }` rule above `.button`, and `.button`'s `border` shorthand (equal specificity, later source order) silently overrode it. The override is now scoped as `.button.thin` so it wins regardless of ordering.

## 8.1.0

### Minor Changes

- 9b468a7: Add animation for Tabs components; upgrade react-aria

## 8.0.0

### Major Changes

- b5532cb: Changed multiple-select API and layout

## 7.0.0

### Major Changes

- c5d1c2e: Updated to tailwind 4; tailwind 3 cannot be used anymore. Removed the tailwind plugin in favor of a new tailwind Theme.

### Patch Changes

- 0f9e56c: Upgrade dependencies

## 6.4.0

### Minor Changes

- 2653e5a: adjust text elements to use react-aria text
- d52788a: Add SelectVirtualizer and MenuVirtualizer
- 2653e5a: export Virtualizer from react-aria-components

## 6.3.0

### Minor Changes

- 700f65e: Add separator component
- 700f65e: Add arrow to the submenu

## 6.2.0

### Minor Changes

- 75cd778: Add Menu Selection styling

## 6.1.0

### Minor Changes

- 0a101a1: Add MenuPopover

### Patch Changes

- 0a101a1: Fix sizing of menu, select with autocomplete component

## 6.0.0

### Major Changes

- 42d7528: Reworked select component to not be batteries included.

### Minor Changes

- 42d7528: Exposed Autocomplete for both select and menu

## 5.0.0

### Major Changes

- 3257e52: Switch to bundled output so that all css files are also bundled (which will be supported by more libraries)

### Minor Changes

- 8b82eb1: Menu popover now separately exported as UnstyledPopover. Menu now poperly in lol css layer.
- fca488b: Added `@layer lol` to all css files
- f6c6cec: Add Menu
- 51101f4: Add Sonner Component

### Patch Changes

- 7968290: tooltip positioning
- 1cdf0e8: Use raw color values for tailwind so that tailwind's color functions work again. E.g. if you used bg-lol-blue-300/50, it would not result in a class compiled by tailwind due to the inability to interpolate var() values.

  If this fix needs to be done for other value types remains to be seen.

- 7968290: Tooltip arrow svg size
- 54a5002: Upgrade dependencies; add lerp to calc

## 4.1.0

### Minor Changes

- 42c4e04: Export RouterProvider to allow for client-side routing customization. See also https://react-spectrum.adobe.com/react-aria/routing.html#app-router

### Patch Changes

- 66836c7: Use default cursor for disabled links
- a1e3c51: Fix select colors

## 4.0.0

### Major Changes

- 12aebbc: Use CSS modules instead of tailwind for internal component styles

## 3.2.5

### Patch Changes

- 67c5a5f: Tabs is a `use client` component.

## 3.2.4

### Patch Changes

- 9257833: Upgrade dependencies

## 3.2.3

### Patch Changes

- df0f027: switch to nodenext module resolution
- 3473fb2: Change file names of cjs exports

## 3.2.2

### Patch Changes

- b4c9c80: Use modern.js instead of tsup

## 3.2.1

### Patch Changes

- 4d8e119: Add extra prop forwarding for divider

## 3.2.0

### Minor Changes

- be713a2: Add Divider Component
- c4b3afe: Export gradients

## 3.1.1

### Patch Changes

- abe5adb: Change way border width is applied so that it works better with flex

## 3.1.0

### Minor Changes

- 41ba8a2: Add toggle button component

### Patch Changes

- cc316da: Make sure aspect ratio of square and round buttons is set properly for text based icons (icons with width smaller than height)

## 3.0.1

### Patch Changes

- 7b65269: remove background from accordion

## 3.0.0

### Major Changes

- 0b16e14: Adjust theme to be inline with https://brand.riotgames.com/en-us/league-of-legends/color/

### Minor Changes

- 0b16e14: Add typography components similar to branding guide

## 2.8.1

### Patch Changes

- e272d45: change number field, search input, slider, text area, text field so that they may receive children (labels)

## 2.8.0

### Minor Changes

- c54f762: Add squared, rounded button shapes
- c54f762: Add Card component
- c54f762: Add Tertiary button priority

## 2.7.0

### Minor Changes

- c9c5882: Initial version of Tooltip added

### Patch Changes

- 86914ce: slight change of colors of tooltips

## 2.6.0

### Minor Changes

- ec2a721: Add TextArea component

## 2.5.2

### Patch Changes

- 5c23331: forward classname of text field, search field, button

## 2.5.1

### Patch Changes

- 3cc0914: update package json and readme

## 2.5.0

### Minor Changes

- 1339caa: Add checkbox

### Patch Changes

- 6e90c02: Changed outline of tabs to not be visible by default, only when focus-visible.

## 2.4.1

### Patch Changes

- ba30c6f: forward class names

## 2.4.0

### Minor Changes

- 85d41cc: Add tabs

## 2.3.1

### Patch Changes

- 8d47fa4: re-add overflow to hide borders

## 2.3.0

### Minor Changes

- 963ce0f: Add view transitions to accordion component

## 2.2.0

### Minor Changes

- 43095eb: Add Modal

## 2.1.0

### Minor Changes

- 5b516bb: Add Spinner component

### Patch Changes

- e55dc68: Make label brighter

## 2.0.2

### Patch Changes

- b074d13: make sure groupProps is optional on number field

## 2.0.1

### Patch Changes

- f0550c0: infer type of slider (number or number array)

## 2.0.0

### Major Changes

- edff669: SliderLabel is now a separate component; removed from the main Slider component

### Minor Changes

- 5c864ab: Expose sliderTrackBackgroundClassName and sliderTrackForegroundClassName on Slider

## 1.3.0

### Minor Changes

- 6ca3bca: Add number field component

## 1.2.0

### Minor Changes

- 215447d: Add Radio Group
- 215447d: Add Label

### Patch Changes

- 215447d: Add utility to merge classes from userland

## 1.1.1

### Patch Changes

- 1e3e06f: make inputProps optional for both search field and text field

## 1.1.0

### Minor Changes

- 0e04991: add text field, change api of search field to match textfield (added inputProps prop)

## 1.0.3

### Patch Changes

- 1191873: add tailwindcss as peer dependency

## 1.0.2

### Patch Changes

- 8cf8309: Adjust package json publish config
