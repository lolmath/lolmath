---
"@lolmath/ui": minor
---

Add `VerticalTable`, the table read down rather than across.

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
    { id: "tier", name: "Tier", value: (player) => player.tier, align: "start" },
    { id: "lp", name: "LP", value: (player) => player.lp },
  ]}
/>
```

It is a component of its own rather than a mode of `Table` because the two are
not the same thing underneath. `Table` is React Aria's grid, whose collection is
row major and cannot be transposed; everything it offers — selection, sorting,
resizing, dragging, keyboard navigation — acts on rows, and a row here is a
*field*, so all of it would act on the wrong axis. `VerticalTable` is markup and
no more: a `<table>` whose field names are real `<th scope="row">`s and whose
record headings are real `<th scope="col">`s, which is what ties every value to
both without an `aria-*` in sight. Reach for `Table` the moment the rows have to
be interacted with.
