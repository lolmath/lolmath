---
"@lolmath/ui": patch
---

Fix dimmed (thin) buttons rendering with a 2px border instead of 1px.

A prior refactor moved the `.thin { border-width: 1px }` rule above `.button`, and `.button`'s `border` shorthand (equal specificity, later source order) silently overrode it. The override is now scoped as `.button.thin` so it wins regardless of ordering.
