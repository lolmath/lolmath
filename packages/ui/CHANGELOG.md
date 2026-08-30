# @lolmath/ui

## 9.7.0

### Minor Changes

- 47757eb: Add `PreviewButton`, the trigger for a term inside running text.

  The dashed-underline trigger that had to be hand-rolled with `Focusable` and an inline-styled `<button>` is now a component. It inherits the size, weight and leading of the sentence it sits in, so only the underline sets the term apart, and it is a real button, so a keyboard or screen reader user has something to act on. While the preview is open the dashes close up into a solid rule; the same applies under a `DialogTrigger` used as a toggle tip. The `previewButton` styles are exported for a term that should also navigate somewhere.

  ```tsx
  <PreviewTrigger>
    <PreviewButton>Doran's Blade</PreviewButton>
    <Popover>
      <PopoverBody>…</PopoverBody>
    </Popover>
  </PreviewTrigger>
  ```

  `Focusable` stays the escape hatch for a trigger that is not text — an item icon, a champion portrait.

## 9.6.0

### Minor Changes

- cda7719: Add `@lolmath/ui/charts`: TanStack Charts drawn in the Hextech visual language.

  `LineChart`, `AreaChart`, `BarChart` and `RankingChart` take wide data and a
  `series` array of accessors. `HextechChart` themes a `defineChart` definition of
  your own, and `ChartFrame` and `ChartLegend` are the panel and legend on their
  own. The palette, the ink and the frame are `--lol-chart-*` custom properties in
  `@lolmath/ui/css`, and TanStack's `--ts-chart-*` variables are bridged to them.

  `@tanstack/charts` is an optional peer dependency and only the `/charts` entry
  imports it, so nothing changes for consumers of `@lolmath/ui` who do not draw
  charts.

## 9.5.0

### Minor Changes

- 191abb3: Round out `Table` with the rest of what React Aria's table can do.

  Selection now looks like selection: `TableHeader` adds the select-all checkbox
  and `TableRow` the per-row one, so `selectionMode="multiple"` no longer needs the
  checkbox column to be written out by hand. `selectionBehavior="replace"` still
  drops them for a highlighted row, and a `TableFooter` row leaves the column blank
  rather than repeating the checkbox.

  New alongside it: expandable rows, where a `TableRow` nested in another indents
  under it in the table's `treeColumn` and grows an expand chevron;
  `TableLoadMoreItem`, the spinner row that doubles as the sentinel of an infinite
  scroll; and drag and drop, with `useTableDragAndDrop` returning the
  `dragAndDropHooks` a `Table` takes together with the gold line
  (`TableDropIndicator`) drawn between the rows a drop would land between.

  `ResizableTableContainer` is now the styled component it always claimed to be —
  it was re-exported unstyled, so its scroll container never had the overflow it
  needs — and a `Table` inside a `Virtualizer` scrolls its own rows under a frosted
  sticky header.

  `useAsyncList`, `useListData`, `useDragAndDrop` and `isTextDropItem` are
  re-exported for the lists these features are fed from.

- cc85bf4: Add `VerticalTable`, the table read down rather than across.

  A row per field, a column per record, and the field names heading the rows from
  the leading column — the table for comparing a handful of records field by
  field, and, with a single record and no `recordHeader`, for the stat card that
  is a table underneath. The data goes in the way it comes, one object per record,
  and the component does the flip:

  ```tsx
  <VerticalTable
    aria-label="Players compared"
    align="end"
    records={players}
    recordHeader={(player) => player.summoner}
    fields={[
      {
        id: "tier",
        name: "Tier",
        value: (player) => player.tier,
        align: "start",
      },
      { id: "lp", name: "LP", value: (player) => player.lp },
    ]}
  />
  ```

  It is a component of its own rather than a mode of `Table` because the two are
  not the same thing underneath. `Table` is React Aria's grid, whose collection is
  row major and cannot be transposed; everything it offers — selection, sorting,
  resizing, dragging, keyboard navigation — acts on rows, and a row here is a
  _field_, so all of it would act on the wrong axis. `VerticalTable` is markup and
  no more: a `<table>` whose field names are real `<th scope="row">`s and whose
  record headings are real `<th scope="col">`s, which is what ties every value to
  both without an `aria-*` in sight. Reach for `Table` the moment the rows have to
  be interacted with.

## 9.4.0

### Minor Changes

- cb851d1: Upgrade to React Aria Components 1.20 / React Aria 3.51 and surface what it adds.

  `PreviewTrigger` is new: a popover that opens on hover, focus, or long press, so hover-revealed content is reachable on touch — the gap that kept this library from having a tooltip. It composes with the existing `Popover`, and `Focusable` is now exported for triggers that are not already React Aria components.

  `TokenField`, `TokenInput`, and `Token` are new (alpha upstream): a text field with inline, non-editable tokens sharing one caret, for mentions, tags, and prompt fields. Tokens take the same `gold`/`hextech`/`grey` treatment as `Tag`.

  `MenuTrigger` now accepts `trigger="contextMenu"` for right click, long press, and the platform's context-menu key; `Pressable` is exported for wrapping a non-React-Aria trigger. `Table` accepts `keyboardNavigationBehavior="tab"`, which hands the arrow keys to a cell's own controls instead of moving between cells.

### Patch Changes

- 8ba637b: Give a disabled `DateField`/`TimeField` the same greyed-out fill as the other date and time inputs.

  `DatePicker`, `DateRangePicker`, and `NumberField` all swap their input's fill to `--lol-color-grey-300` when disabled, but the standalone `DateField`/`TimeField` only dimmed their border and segment text and kept the hextech-black fill. A disabled `DateField` sitting next to a disabled `DatePicker` in the same form read as two different states; they now match.

## 9.3.0

### Minor Changes

- 4766cf1: Add `Group`, for visually merging several focusable controls into a single bordered field (e.g. a summoner name plus its `#`-prefixed tag), along with the borderless `GroupInput` and `GroupSeparator` segments meant to sit inside it.

## 9.2.0

### Minor Changes

- 684aacc: Add `Calendar`, `RangeCalendar`, `DateField`, `TimeField`, `DatePicker`, and `DateRangePicker`. Selected dates get a continuous gold border with a hextech-black fill, rounded at the true start/end of a selection and at the start/end of every row it wraps through. `Calendar`/`RangeCalendar` support a `header="picker"` mode with Select-driven month and year dropdowns.
- 60f49cc: Add `PopoverBody` for composing a `Popover`'s text content. The popover itself carries no content padding, since text needs breathing room from the edge while other content (a divider, an image) already runs edge to edge on its own — `PopoverBody` supplies that padding without reaching for a one-off inline style.

### Patch Changes

- 4a6e3bf: Fix `Checkbox`'s glyph squishing when the label text next to it left too little room. The icon is a flex item with no `flex-shrink: 0`, so long labels or narrow containers shrank its width while its fixed height stayed put, distorting the box. The icon now holds its size in both dimensions regardless of its sibling's length.
- 8f0484f: Fix multiple select layout: left-align tags and empty text

## 9.1.2

### Patch Changes

- 20f0406: Fix every JS-imported image shipping as a bare payload with no `data:` prefix, which made the checkbox icons, spinner and breadcrumb divider broken images in consumers. `tsdown.config.ts` used the `base64` loader, which emits only the encoded bytes; it now uses `dataurl`, which emits a complete `data:image/png;base64,…` (or url-encoded `data:image/svg+xml,…`) URI. Failed image requests are never cached, so each broken asset was also re-requested on every render.
- a2ef20e: Give a selected `dimmed` `ToggleButton` a hextech border. Selecting a toggle
  swaps its body to the hextech gradient, so leaving the dimmed preset's resting
  grey frame around it read as an unfinished button; the border now follows the
  body, with the hextech hover and press gradients on top of it. Disabled toggles
  still grey out.

  The rule that was meant to cover this state matched a `.selected` class the
  component never renders — the selected state comes from react aria's
  `data-selected` — so it never applied.

- b754b84: Stop depending on Tailwind's preflight. Components rendered differently in an app with no CSS reset: the popover arrow floated off the popover because its `<svg>` sat on a text baseline, the bare buttons we never paint (`SearchField`'s clear, `NumberField`'s steppers, `TagGroup`'s remove, `Tree`'s chevron, `DisclosureButton`) fell back to the UA's `buttonface` slab — grey under `color-scheme: dark` — and `Heading`, `Divider`, `Breadcrumbs`, `NumberField`'s input and the empty `Table` cell kept UA margins, padding and borders. `Button` also picked up the UA's `1px 6px` padding for `preset="text"`, and `TextArea` could be dragged in both axes.

  Every one of those is now set on the library's own elements inside `@layer lol`, so a host's own CSS still outranks it and nothing is applied globally. `TagGroup` and `MultipleSelect` were also missing the `lol` layer the readme promises for every module, and are now wrapped like the rest.

## 9.1.1

### Patch Changes

- e6b2edc: Fix `Button`/`ToggleButton` with `shape="round"` rendering square. The `.round` rule was authored before `.button` at equal specificity, so the base `border-radius: 0px` won the cascade — and the same tie also dropped the heavier `font-weight: 900` from both `round` and `square`. The shape rules are now nested under `.button` so they win on specificity regardless of source order.

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
