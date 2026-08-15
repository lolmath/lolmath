---
"@lolmath/ui": minor
---

Give `Table` an `orientation`, so it can be read down as well as across.

`orientation="vertical"` is the transposed table, the one that compares a
handful of records field by field: a row per field, a column per record, and the
header reading down the leading column rather than across the top. The hairline
that separates the header from the data turns with it, running down the table
instead of under its first row, and the field names are set like the column
headings they are.

React Aria's table is row major whichever way it is read, so the flip is in the
data — the fields are the `TableBody` items and the records the columns — and
the header column is the one already marked `isRowHeader`, which is what makes
its cells headers to a screen reader too.

`TableHeader` takes `isVisuallyHidden` alongside it, for the vertical table of a
single record that has nothing to call its one column: the header row cannot be
left out, since React Aria builds the table's columns from it and they are what
names every cell, so it is clipped out of the layout instead.
