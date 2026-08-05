---
"@lolmath/ui": patch
---

Fix `Checkbox`'s glyph squishing when the label text next to it left too little room. The icon is a flex item with no `flex-shrink: 0`, so long labels or narrow containers shrank its width while its fixed height stayed put, distorting the box. The icon now holds its size in both dimensions regardless of its sibling's length.
