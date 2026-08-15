---
"@lolmath/ui": patch
---

Give a disabled `DateField`/`TimeField` the same greyed-out fill as the other date and time inputs.

`DatePicker`, `DateRangePicker`, and `NumberField` all swap their input's fill to `--lol-color-grey-300` when disabled, but the standalone `DateField`/`TimeField` only dimmed their border and segment text and kept the hextech-black fill. A disabled `DateField` sitting next to a disabled `DatePicker` in the same form read as two different states; they now match.
