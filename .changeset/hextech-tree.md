---
"@lolmath/ui": minor
---

Add a `Tree` built on `react-aria-components`, styled after the collapsible
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
