---
"@lolmath/ui": minor
---

Add `@lolmath/ui/charts`: TanStack Charts drawn in the Hextech visual language.

`LineChart`, `AreaChart`, `BarChart` and `RankingChart` take wide data and a
`series` array of accessors. `HextechChart` themes a `defineChart` definition of
your own, and `ChartFrame` and `ChartLegend` are the panel and legend on their
own. The palette, the ink and the frame are `--lol-chart-*` custom properties in
`@lolmath/ui/css`, and TanStack's `--ts-chart-*` variables are bridged to them.

`@tanstack/charts` is an optional peer dependency and only the `/charts` entry
imports it, so nothing changes for consumers of `@lolmath/ui` who do not draw
charts.
