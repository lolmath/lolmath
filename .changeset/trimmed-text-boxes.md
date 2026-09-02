---
"@lolmath/ui": minor
---

Trim the text boxes that are measured from, with `text-box: trim-both cap alphabetic`.

A line of type reserves room for every ascender and descender the face can
draw, plus the leading the preset asks for. In Beaufort that is 1.27em of box
around 0.69em of capitals, so an `h5` heading spent 11 of its 24 pixels on
space no glyph ever reached — and any margin, gap or padding set against that
box was quietly larger than it said.

`text-box: trim-both cap alphabetic` cuts the box down to the caps, so it is
now the type, and three places that measure from it say what they mean:

- **`Heading`** — the box is the height of its capitals, so the space around a
  heading is the space you set, and a heading beside something else lines up
  on its caps. It no longer brings its own breathing room: half the leading
  used to sit above the caps and half under the baseline, which read as
  padding. `Sonner`'s toast title and a `Divider`'s heading follow it.
- **`ChartFrame`** — the title's caps now sit exactly the frame's `1rem` below
  the hairline and level with the top of anything in `actions`. The gap
  between the title and the subtitle is restated as `0.375rem`, having been a
  two-pixel gap between two boxes that each carried four pixels of their own.
- **`ProgressBar`** — the `0.25rem` between the reading and the bar runs from
  the label's baseline rather than from the bottom of its descender space.

Everything else keeps its leading, on purpose. Running text (`Text`, `Label`,
`PreviewButton`) is inline, where the leading is what keeps lines apart; a
control whose padding *is* its leading — a button, a tab, a menu item, the
dialog heading that has no padding of its own — would only get shorter; and a
table cell cannot be trimmed at all.

Note that `cap alphabetic` measures to the cap height and the baseline, so an
accented capital or a descender reaches past the box. Nothing is clipped, but
a gap of zero is now a gap of zero. An engine without `text-box` support drops
the declaration and keeps the leading, which is the spacing this library
shipped before.
