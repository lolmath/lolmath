---
"@lolmath/charts": minor
---

Add `@lolmath/charts`: TanStack Charts drawn in the Hextech visual language.

`LineChart`, `AreaChart`, `BarChart` and `RankingChart` take wide data and a
`series` array of accessors. `HextechChart` themes a `defineChart` definition of
your own, and `ChartFrame` and `ChartLegend` are the panel and legend on their
own. The palette, the ink and the frame are CSS custom properties, and
TanStack's `--ts-chart-*` variables are bridged to them.
