---
"@lolmath/ui": patch
---

Stop depending on Tailwind's preflight. Components rendered differently in an app with no CSS reset: the popover arrow floated off the popover because its `<svg>` sat on a text baseline, the bare buttons we never paint (`SearchField`'s clear, `NumberField`'s steppers, `TagGroup`'s remove, `Tree`'s chevron, `DisclosureButton`) fell back to the UA's `buttonface` slab — grey under `color-scheme: dark` — and `Heading`, `Divider`, `Breadcrumbs`, `NumberField`'s input and the empty `Table` cell kept UA margins, padding and borders. `Button` also picked up the UA's `1px 6px` padding for `preset="text"`, and `TextArea` could be dragged in both axes.

Every one of those is now set on the library's own elements inside `@layer lol`, so a host's own CSS still outranks it and nothing is applied globally. `TagGroup` and `MultipleSelect` were also missing the `lol` layer the readme promises for every module, and are now wrapped like the rest.
