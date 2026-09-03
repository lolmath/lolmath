---
"@lolmath/ui": minor
---

Upgrade to React Aria Components 1.21 / React Aria 3.52 and surface what it adds.

`NavigationTree` is new, with `NavigationTreeItem`, `NavigationTreeItemContent`, `NavigationTreeSection`, and `NavigationTreeHeader`: a nested set of links for a sidebar or a left rail. It selects nothing itself — `selectedRoute` is matched against each item's `href`, the match is marked `aria-current="page"` and takes the client's gold spine and hextech wash, and a collapsed branch above it keeps that trail visible. Tab moves through the links rather than trapping the arrow keys, and `actions` puts a row's own control beside the link instead of inside the anchor.

`Menu` now renders an `emptyState` when its collection is empty — the case an `Autocomplete` filter reaches — and `MenuLoadMoreItem` is exported: a sentinel that calls `onLoadMore` as it scrolls into view and shows the spinner while a page is in flight, matching `Tree` and `Table`.

`TokenFieldValue` carries the whole selection as `selectedRange` now, of which `caretPosition` is the `current` end; `withSelectedRange` restores one. Editing against `selectedRange.start` and `.end` covers the caret and a live selection in one call.

`FocusableElement`, `HoverEvent`, and `KeyboardEvent` are re-exported for typing handlers passed to these components, along with `setInteractionModality` and `Modality` for showing the focus ring on an element focus was moved to programmatically.
