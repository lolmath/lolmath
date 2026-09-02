# LoL Math UI

The League of Legends Math UI is React Component library made to look similar to
the League of Legends client. It is used in the [LoL Math website](https://lolmath.net)

## Installation

```bash
npm install @lolmath/ui
```

## CSS Files

Import the global CSS file and fonts into your project.

```ts
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";
import "@lolmath/ui/css";
```

## No CSS Reset Required

The components look the same with or without a reset — they set whatever they
need on their own elements rather than assuming a normalized baseline. Tailwind's
preflight, another reset, or none at all all render identically.

`apps/ui-storybook` deliberately ships no reset so this stays true, and
`visual/preflight.visual.spec.ts` renders every component twice — bare and with
preflight applied — and fails if a single pixel differs.

## Trimmed Text Boxes

A line of type reserves room for every ascender and descender the face can
draw, plus the leading the preset asks for — in Beaufort, 1.27em of box around
0.69em of capitals. Where a box is sized by its own text and something is
measured from its edge, it is trimmed down to the caps with
`text-box: trim-both cap alphabetic`:

| Component | What it buys |
| --- | --- |
| `Heading` | The box is the height of the capitals, so the margin or gap you set around a heading is the space you get. |
| `ChartFrame` | The title's caps sit exactly the frame's padding below the hairline, and level with the top of anything in `actions`. |
| `ProgressBar` | The `0.25rem` between the reading and the bar runs from the label's baseline. |

Two things follow from it:

- **A heading no longer brings its own breathing room.** Half the leading used
  to sit above the caps and half under the baseline, which read as padding.
  Set the space you want.
- **Accented capitals and descenders reach past the box.** `cap alphabetic`
  measures to the cap height and the baseline, so an `Ö` and a `g` overflow it.
  Nothing is clipped, but a gap of zero is a gap of zero.

Everything else keeps its leading. Running text — `Text`, `Label`,
`PreviewButton` — is inline, where the leading is what keeps lines apart, and a
control whose padding *is* its leading (a button, a tab, a menu item) would
only get shorter. An engine without `text-box` support drops the declaration
and keeps the leading, which is the spacing this library shipped before.

## CSS Layer

All CSS modules have the `lol` layer. You can use `@layer` to control the
order of the CSS. This also means that the CSS is less specific than "normal",
global CSS. This is useful for overriding the default styles (e.g. with
tailwind).

```css
@layer someLayer, lol, someOtherLayer;
```

### Usage with tailwind

You can use the `@layer` directive to control the order of the CSS. For more
information on using `@layer` with tailwind, see
https://tailwindcss.com/docs/preflight

```css
@layer theme, base, components, lol, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
```

## TailwindCSS Theme

Optionally, you can use the tailwind theme to get League of Legends colors and
fonts.

```css tailwind.css
@layer theme, base, components, lol, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);

/* Import the theme */
@import "@lolmath/ui/tailwind";
```

## Charts

`@lolmath/ui/charts` draws [TanStack Charts](https://tanstack.com/charts) in the
same visual language as the rest of the library.

It is a separate entrypoint because `@tanstack/charts` is an **optional peer
dependency**: install it only if you import from `/charts`, and nothing changes
for anyone who does not.

```bash
npm install @tanstack/charts
```

```tsx
import { LineChart } from "@lolmath/ui/charts";

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

The chart styles ship inside `@lolmath/ui/css`, so there is no second
stylesheet to import. The fonts matter for more than looks here: the chart
engine measures text against the computed font of its own container, so axis
layout is only right once Beaufort and Spiegel have loaded.

| Component | For |
| --- | --- |
| `LineChart` | A measure read left to right. `curve`, `points`, `area`. |
| `AreaChart` | A composition over time. `stacked`, `normalize`. |
| `BarChart` | Columns over categories. `layout="grouped" \| "stacked"`. |
| `RankingChart` | The leaderboard shape: ranked horizontal bars, values at the tip. |
| `HextechChart` | Your own `defineChart` definition, themed. |
| `ChartFrame` | The panel: gold hairline, diamond corners, Beaufort title. |
| `ChartLegend` | Diamond swatches and text in ink. |

Every chart takes its data wide — one row per x position — plus a `series`
array that reads each measure out of a row, so nothing has to be reshaped
before it is plotted.

### What they do without being asked

- **A legend for two or more series, never for one.** Colour is never the only
  way to tell two series apart; a lone swatch would only restate the title.
- **A tooltip, and a crosshair on line and area charts.** An HTML chart is
  interactive, so the hover layer is not opt-in.
- **Formatters reach everywhere.** `formatY` lands on the axis, the crosshair
  label and the tooltip from one place.
- **Gaps, not outlines.** Bars are separated by a two-pixel channel of surface
  and dots carry a two-pixel surface ring — a stroke around a mark is ink that
  carries no data.

### Writing your own

`defineChart`, the marks, the scales and the tooltip extension are re-exported
from `@lolmath/ui/charts`, so a chart shape the library does not ship still
needs only one import path. Wrap the result in `HextechChart` for the theme and
`ChartFrame` for the panel.

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
} from "@lolmath/ui/charts";

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

### The Hextech mapping

The look follows the rules Riot set out in
[The Visual Language of Hextech](https://nexus.leagueoflegends.com/en-us/2016/12/the-visual-language-of-hextech/):
metal linework *frames* information and hextech magic *is* the information. So
gold carries the frame, the axes and the grid at low opacity, and the marks are
the only saturated thing on the panel. The square, the diamond and the circle
keep their stated jobs — square bar ends and a rectangular frame, diamonds at
the corners and in the legend, a circle for the focused reading. The storybook's
**Charts → The Hextech language** page walks through it in full.

### The palette

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

The set is checked against the hextech-black surface for the OKLCH lightness
band, the chroma floor, protanopia and deuteranopia separation between
neighbouring slots, and 3:1 contrast. It clears all four for bars, lines and
areas. Scatter and bubble forms are held to the harder all-pairs test and clear
it for the **first three slots only** — past three series there, facet rather
than reach for a fourth colour. Re-run those checks before changing a value.

`--lol-chart-positive` and `--lol-chart-negative` sit outside the categorical
set and stay reserved for series that *mean* good or bad.

Everything is a `--lol-chart-*` custom property alongside the rest of the
design tokens, and TanStack's own `--ts-chart-*` variables are bridged to them,
so a hand-written definition that never sets a theme still picks up the palette
and the tooltip styling.

### Limits worth knowing

- **No time scale.** TanStack Charts ships band, point, linear and ordinal
  scales. Map a date to a number or to a pre-formatted label before it reaches
  a chart; `ChartXValue` is `string | number` for that reason.
- **Never a dual axis.** Two measures of different scale are two charts, small
  multiples, or one series indexed to a common base.
- **Overlaid areas stop being honest past three series.** Stack them, or facet.

## Client-side Routing

See [react-aria-components](https://react-spectrum.adobe.com/react-aria/routing.html#app-router)

## Links

- [Storybook](https://ui.lolmath.net).
- [NPM Package](https://www.npmjs.com/package/@lolmath/ui).
- [Repository](https://gitlab.com/lol-math/lolmath/-/tree/main/packages/ui)
