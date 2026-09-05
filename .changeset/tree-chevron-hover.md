---
"@lolmath/ui": patch
---

A `Tree` row lighting up no longer looks exactly like its expand chevron lighting up. Hovering anywhere on the row swapped the chevron to its hover art, so the two targets — expand the branch, or act on the row — gave the same answer and there was no way to tell from the screen which one the pointer was on. The arrow now takes its hover art only when the pointer is on the button itself, and a plate appears behind it that no row wash ever draws.

The chevron's drawing is eight pixels across, which is not a target anyone can aim at, let alone one whose hover you could read. The button keeps that size so no row moves, and the pointer now lands on a box around three times as wide and the height of the row — the same trade `NavigationTree` already made. Nothing about a tree at rest changes.
