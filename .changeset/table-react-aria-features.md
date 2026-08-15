---
"@lolmath/ui": minor
---

Round out `Table` with the rest of what React Aria's table can do.

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
needs — and a `Table` inside a `Virtualizer` scrolls its own rows.

`useAsyncList`, `useListData`, `useDragAndDrop` and `isTextDropItem` are
re-exported for the lists these features are fed from.
