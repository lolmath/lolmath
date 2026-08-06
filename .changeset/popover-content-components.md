---
"@lolmath/ui": minor
---

Add `PopoverBody`, `PopoverDivider`, and `PopoverImage` for composing a `Popover`'s content. The popover itself carries no content padding, since the right amount differs by what's inside — text needs breathing room from the edge, while a divider or image should run edge to edge. These let a rich popover be built without any custom CSS: `PopoverBody` pads its children, while `PopoverDivider` and `PopoverImage` stay flush with the popover's edges.
