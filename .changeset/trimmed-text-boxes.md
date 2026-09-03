---
"@lolmath/ui": minor
---

Trim every text box that is sized by its own type, with `text-box: trim-both cap alphabetic`.

A line of type reserves room for every ascender and descender the face can
draw, plus the leading the preset asks for. In Beaufort that is 1.27em of box
around 0.69em of capitals, in Spiegel 1.11em around 0.66em — so an `h5`
heading spent 11 of its 24 pixels on space no glyph ever reached, and every
margin, gap and padding set against a text box was quietly larger than it
said, by an amount only the font knew.

Trimmed, the box is the type:

- **`Heading`, `DialogHeading`, `Text`, `Label`** — the box is the height of
  the capitals, so the space set around it is the space that shows up. A
  heading no longer brings its own breathing room: half the leading used to sit
  above the caps and half under the baseline, which read as padding. Set the
  space you want. `Sonner`'s title and description and a `Divider`'s heading
  follow the primitives.
- **`MenuItem`, `SelectListBoxItem`, `Tab`, `TreeItem`** — the row's block
  padding now runs from the baseline rather than from the descender space under
  it. Every one of these rows is the height it always was: the padding was
  restated (`0.375rem` → `0.625rem` on the menu and select rows, `0.25rem` →
  `0.5rem` on a tab) to say out loud what the leading had been topping up. A
  tree row states its height outright, because trimming the label handed that
  job to whichever control the row carried and branches came out taller than
  leaves.
- **`Breadcrumb`, `Tag`, `Calendar`, `ChartLegend`, `Disclosure`** — whatever
  sits beside the type now centres on its capitals: a divider, a remove
  control, a swatch, a chevron.
- **`ChartFrame`** — the title's caps sit exactly the frame's `1rem` below the
  hairline and level with the top of anything in `actions`. The gap to the
  subtitle is restated as `0.375rem`, having been two pixels between boxes that
  each carried several of their own.
- **`ProgressBar`** — the `0.25rem` between the reading and the bar runs from
  the label's baseline.
- **`DateField` and `TimeField`** — a segment's hover and focus highlight is
  centred on the number instead of on the em box around it.

`Text` and `Label` render inline, and the trim only reaches a box: a reading
inside a sentence keeps the leading that holds the sentence's lines apart,
while the same component laid out as a flex or grid item — a field label, a
help line, a stat, a toast's description — is trimmed. Which is the right
answer in both places.

Four things are deliberately left alone, for measured reasons: a table cell,
because `text-box-edge` does not apply to one; text sitting straight inside a
flex row, which is an anonymous item CSS cannot select (`ChartLegend`,
`Disclosure` and `TreeItem` grew a box for their label, `Button` did not —
a wrapper would take an icon-only button's glyph off the flex line, and with
`min-height` setting the box there is under half a pixel in it); a `Checkbox`
or `Switch` label, whose icon is taller than its trimmed capitals; and a
`Radio`, where react aria's in-flow `<input>` sets the line box.

Note that `cap alphabetic` measures to the cap height and the baseline, so an
accented capital or a descender reaches past the box. Nothing is clipped, but a
gap of zero is now a gap of zero. An engine without `text-box` support drops
the declaration and keeps the leading, which is the spacing this library
shipped before.
