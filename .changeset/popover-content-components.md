---
"@lolmath/ui": minor
---

Add `PopoverBody` for composing a `Popover`'s text content. The popover itself carries no content padding, since text needs breathing room from the edge while other content (a divider, an image) already runs edge to edge on its own — `PopoverBody` supplies that padding without reaching for a one-off inline style.
