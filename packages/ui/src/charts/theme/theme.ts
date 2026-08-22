import type { ChartTheme } from "@tanstack/charts";

/**
 * The Hextech palette, in slot order. Every entry is a CSS custom property, so
 * a host page retunes the whole library by redefining `--lol-chart-series-N`
 * rather than by threading colours through props.
 *
 * Assign these in sequence and never cycle them: a seventh series is not a
 * seventh colour, it is a sign that the chart should fold its tail into
 * "Other" or split into small multiples.
 */
export const hextechPalette = [
	"var(--lol-chart-series-1)",
	"var(--lol-chart-series-2)",
	"var(--lol-chart-series-3)",
	"var(--lol-chart-series-4)",
	"var(--lol-chart-series-5)",
	"var(--lol-chart-series-6)",
] as const;

/** How many categorical series the palette can carry. */
export const hextechPaletteSize = hextechPalette.length;

/**
 * Dot, bubble and scatter forms are held to a harder test than bars and lines:
 * any two marks can end up touching, not just neighbouring slots. The palette
 * clears that test for its first three slots, so those forms cap at three
 * series — past that, facet rather than reach for a fourth colour.
 */
export const hextechScatterPaletteSize = 3;

/**
 * Reserved status colours. A series that *means* good or bad — a win rate, a
 * gold lead, a delta — wears these; a series that is merely "the third one"
 * wears the categorical palette. Never both in one chart.
 */
export const hextechStatusColors = {
	positive: "var(--lol-chart-positive)",
	negative: "var(--lol-chart-negative)",
} as const;

/**
 * The chart theme: gold ink and a near-black plot, matching the League client.
 *
 * `background` stays transparent so the frame behind the chart — or whatever
 * the host puts there — shows through.
 */
export const hextechChartTheme = {
	foreground: "var(--lol-chart-foreground)",
	muted: "var(--lol-chart-muted)",
	grid: "var(--lol-chart-grid)",
	background: "transparent",
	palette: hextechPalette,
} as const satisfies ChartTheme;

/** The colour for a categorical slot, counted from zero and never wrapped. */
export function hextechSeriesColor(index: number): string {
	return hextechPalette[index] ?? hextechPalette[hextechPalette.length - 1];
}

/**
 * Applies the Hextech theme to a chart definition you wrote by hand, keeping
 * any theme fields the definition sets for itself.
 *
 * ```ts
 * const chart = withHextechTheme(defineChart({ marks: [...], x, y }));
 * ```
 */
export function withHextechTheme<
	TDefinition extends { theme?: Partial<ChartTheme> },
>(definition: TDefinition): TDefinition {
	return {
		...definition,
		theme: { ...hextechChartTheme, ...definition.theme },
	};
}
