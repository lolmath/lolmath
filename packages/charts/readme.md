# LoL Math Charts

[TanStack Charts](https://tanstack.com/charts) drawn in the League of Legends
client's Hextech visual language. Built for the
[LoL Math website](https://lolmath.net) and used alongside
[`@lolmath/ui`](https://ui.lolmath.net).

## Installation

```bash
npm install @lolmath/charts
```

`react` and `react-dom` 19 or newer are peer dependencies. `@tanstack/charts`
comes along with the package and is re-exported from it, so you never end up
with two copies of the grammar.

## CSS

```ts
import "@lolmath/charts/css";
```

Every token falls back to a literal, so the package renders correctly on its
own. Load `@lolmath/ui` alongside it — for the Beaufort and Spiegel faces and
the shared colour scale — and the tokens resolve to the design system instead:

```ts
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";
import "@lolmath/ui/css";
import "@lolmath/charts/css";
```

The fonts matter for more than looks: the chart engine measures text against
the computed font of its own container, so axis layout is only right once they
have loaded.

All CSS lives in the `lol` layer, exactly as in `@lolmath/ui`, so a host app's
own rules outrank it without a specificity fight.

## Charts

```tsx
import { LineChart } from "@lolmath/charts";

<LineChart
	title="Team gold"
	subtitle="Ranked solo queue · patch 14.7"
	data={timeline}
	x={(row) => row.minute}
	series={[
		{ key: "blue", label: "Blue side", value: (row) => row.blueGold },
		{ key: "red", label: "Red side", value: (row) => row.redGold },
	]}
	xLabel="Minute"
	yLabel="Gold"
	formatY={(gold) => `${Math.round(gold / 1000)}k`}
/>;
```

| Component | For |
| --- | --- |
| `LineChart` | A measure read left to right. `curve`, `points`, `area`. |
| `AreaChart` | A composition over time. `stacked`, `normalize`. |
| `BarChart` | Columns over categories. `layout="grouped" \| "stacked"`. |
| `RankingChart` | The leaderboard shape: ranked horizontal bars, values at the tip. |
| `HextechChart` | Your own `defineChart` definition, themed but unstyled otherwise. |
| `ChartFrame` | The panel: gold hairline, diamond corners, Beaufort title. |
| `ChartLegend` | Diamond swatches and text in ink. |

Every chart takes its data wide — one row per x position — and a `series` array
that reads each measure out of a row. `x` and `series[].value` are accessors, so
nothing has to be reshaped before it reaches a chart.

### What they do without being asked

- **A legend for two or more series, never for one.** Colour alone is never the
  only way to tell two series apart. A single series gets no legend box: its
  title already names it.
- **A tooltip, and a crosshair on line and area charts.** An HTML chart is
  interactive; the hover layer is not opt-in.
- **Formatters reach everywhere.** `formatY` lands on the axis, the crosshair
  label and the tooltip from one place.
- **Gaps, not outlines.** Bars are separated by a two-pixel channel of surface
  and dots carry a two-pixel surface ring, rather than being outlined — a
  stroke around a mark is ink that carries no data.

## Writing your own

`defineChart` and the marks, scales and the tooltip extension are re-exported.
Wrap the result in `HextechChart` and it inherits the theme; wrap that in
`ChartFrame` and it inherits the panel.

```tsx
import {
	barY,
	ChartFrame,
	defineChart,
	HextechChart,
	ruleY,
	scaleBand,
	scaleLinear,
	tooltip,
} from "@lolmath/charts";

const chart = defineChart({
	marks: [
		barY(rows, {
			x: (row) => row.minute,
			y: (row) => row.lead,
			fill: (row) =>
				row.lead >= 0
					? "var(--lol-chart-positive)"
					: "var(--lol-chart-negative)",
		}),
		ruleY([0]),
	],
	x: { scale: () => scaleBand<number>().domain(minutes) },
	y: { scale: scaleLinear, nice: true, grid: true },
	tooltip,
});

<ChartFrame title="Gold lead">
	<HextechChart definition={chart} height={260} ariaLabel="Gold lead by minute" />
</ChartFrame>;
```

`withHextechTheme` does the same for a definition you render yourself.

## The Hextech language

The look is not a colour scheme; it follows the rules Riot set out in
[The Visual Language of Hextech](https://nexus.leagueoflegends.com/en-us/2016/12/the-visual-language-of-hextech/).
Metal linework frames information and hextech magic *is* the information, so
gold carries the frame, the axes and the grid at low opacity while the marks are
the only saturated thing on the panel. The square, the diamond and the circle
carry their stated jobs: square bar ends and a rectangular frame, diamonds at
the frame's corners and in the legend, a circle for the focused reading.

The storybook's **Hextech → The visual language** page walks through the
mapping in full.

## The palette

Six categorical slots, assigned in order and never cycled:

| Slot | Name | Value |
| --- | --- | --- |
| 1 | Hextech teal | `#0aa89b` |
| 2 | Piltover gold | `#ba8c2e` |
| 3 | Arcane violet | `#8e6be8` |
| 4 | Ruin red | `#e8574f` |
| 5 | Rift azure | `#1e8fd5` |
| 6 | Chemtech green | `#4fa83a` |

Slots 1 and 2 are the Hextech signature; the rest reach further into Runeterra,
because a palette that stayed inside gold and teal could not be told apart.

The set is checked against the `#010a13` surface for the OKLCH lightness band,
the chroma floor, protanopia and deuteranopia separation between neighbouring
slots, and 3:1 contrast. It clears all four for bars, lines and areas. Scatter
and bubble forms are held to the harder all-pairs test and clear it for the
**first three slots only** — past three series there, facet rather than reach
for a fourth colour. Re-run those checks before changing a value.

`--lol-chart-positive` and `--lol-chart-negative` sit outside the categorical
set and stay reserved for series that *mean* good or bad.

## Tokens

Everything is a CSS custom property, so a host page retunes the library without
threading colours through props.

| Token | Default |
| --- | --- |
| `--lol-chart-foreground` | `--lol-color-gold-100` |
| `--lol-chart-muted` | `--lol-color-gold-300` |
| `--lol-chart-grid` | `--lol-color-gold-200`, painted at 11% |
| `--lol-chart-surface` | `--lol-color-hextech-black` |
| `--lol-chart-frame-fill` | Blue-to-black gradient |
| `--lol-chart-frame-border` | Gold gradient hairline |
| `--lol-chart-frame-accent` | `--lol-color-gold-400` |
| `--lol-chart-series-1` … `-6` | The palette above |
| `--lol-chart-positive` / `-negative` | `#2e9e63` / `#d6453c` |
| `--lol-chart-font-display` | Beaufort |
| `--lol-chart-font-body` | Spiegel |

TanStack Charts' own `--ts-chart-*` variables are bridged to these, so a
hand-written definition that never sets a theme still picks up the palette and
the tooltip styling.

## Limits worth knowing

- **No time scale.** TanStack Charts ships band, point, linear and ordinal
  scales. Map a date to a number or to a pre-formatted label before it reaches a
  chart; `ChartXValue` is `string | number` for that reason.
- **Never a dual axis.** Two measures of different scale are two charts, small
  multiples, or one series indexed to a common base.
- **Overlaid areas stop being honest past three series.** Stack them, or facet.
