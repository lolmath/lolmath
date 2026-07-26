---
"@lolmath/ui": minor
---

Add a `Table` built on `react-aria-components`, styled after the ranked ladder
in the League client (`rcp-fe-lol-leagues`).

- `Table`, `TableHeader`, `TableColumn`, `TableBody`, `TableRow`, `TableCell`,
  `TableFooter`, plus `ResizableTableContainer` and `TableColumnResizer`.
- Selected rows are marked with the client's gold spine and hextech highlight.
  Selection adds no checkbox column, so turning it on never shifts the layout.
- `TableColumn` and `TableCell` take an `align` prop (`start`/`center`/`end`)
  for stat columns, and sortable columns get a hextech sort indicator.
- `TableBody` takes an `emptyState` node, defaulting to "No results found".
- Re-exports the `SortDescriptor` and `SortDirection` types.
