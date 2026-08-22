import type {
	ChartAxisOptions,
	ChartAxisPresentationOptions,
	ChartCurve,
	ChartTooltipItem,
	ChartTooltipOptions,
	ChartValue,
} from "@tanstack/charts";
import { d3Curve } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { curveLinear, curveMonotoneX, curveStepAfter } from "d3-shape";
import type { HTMLAttributes, ReactNode } from "react";
import { hextechSeriesColor } from "../theme/theme";
import type { ChartLegendItem } from "./chart-legend/chart-legend";

/**
 * What a chart can plot along its independent axis. Dates are deliberately
 * absent: the engine ships no time scale, so map a date to a number or to a
 * pre-formatted label before it reaches a chart.
 */
export type ChartXValue = string | number;

/** One measure drawn across the data — a line, an area, a set of bars. */
export interface ChartSeries<TDatum> {
	/** Stable identity. Used for React keys and for the mark's id. */
	key: string;
	/** What the legend and the tooltip call it. Falls back to `key`. */
	label?: string;
	/** Reads this series' value out of a row. Return null to break the line. */
	value: (datum: TDatum) => number | null | undefined;
	/**
	 * Overrides the palette slot. Reach for it when the series *means*
	 * something — a win rate, a gold lead — and should wear a status colour.
	 */
	color?: string;
}

/** How a line or an area gets from one point to the next. */
export type ChartCurveName = "linear" | "smooth" | "step";

/** Props every cartesian chart in this package accepts. */
export interface CartesianChartProps<TDatum> {
	/** One row per position along the x axis. */
	data: readonly TDatum[];
	/** The measures to draw. Two or more get a legend. */
	series: readonly ChartSeries<TDatum>[];
	/** Reads the x position out of a row. */
	x: (datum: TDatum) => ChartXValue;
	/** Plot height in pixels. The width fills the container. */
	height?: number;
	/** Names what is plotted, in the frame's header. */
	title?: ReactNode;
	/** A line of context under the title. */
	subtitle?: ReactNode;
	/** Controls belonging to this chart, in the frame's header. */
	actions?: ReactNode;
	/** Axis titles. */
	xLabel?: string;
	yLabel?: string;
	/** Tick and tooltip formatting. */
	formatX?: (value: ChartXValue) => string;
	formatY?: (value: number) => string;
	/** Horizontal grid lines. On by default. */
	grid?: boolean;
	/**
	 * Forces the legend on or off. By default it appears for two or more
	 * series and is left off for one, whose title already names it.
	 */
	legend?: boolean;
	/** Drops the metal frame, keeping the type and colours. */
	frame?: boolean;
	/** Lights the marks with the hextech bloom. */
	glow?: boolean;
	/**
	 * What a screen reader announces. Derived from a string `title` when it can
	 * be; pass it explicitly whenever the title is a node or absent.
	 */
	ariaLabel?: string;
	ariaDescription?: string;
	className?: string;
	/** Props for the frame element. */
	frameProps?: Omit<
		HTMLAttributes<HTMLElement>,
		"title" | "className" | "children"
	>;
}

const CURVES: Record<ChartCurveName, ChartCurve> = {
	linear: d3Curve(curveLinear),
	smooth: d3Curve(curveMonotoneX),
	step: d3Curve(curveStepAfter),
};

export function resolveCurve(name: ChartCurveName): ChartCurve {
	return CURVES[name];
}

/** The colour a series is drawn in: its own, or its slot in the palette. */
export function seriesColor<TDatum>(
	series: ChartSeries<TDatum>,
	index: number,
): string {
	return series.color ?? hextechSeriesColor(index);
}

export function seriesLabel<TDatum>(series: ChartSeries<TDatum>): string {
	return series.label ?? series.key;
}

export function legendItems<TDatum>(
	series: readonly ChartSeries<TDatum>[],
): ChartLegendItem[] {
	return series.map((entry, index) => ({
		key: entry.key,
		label: seriesLabel(entry),
		color: seriesColor(entry, index),
	}));
}

/**
 * Whether to draw the legend. One series does not get one: there is a single
 * colour, and the title already says what it is.
 */
export function showLegend<TDatum>(
	series: readonly ChartSeries<TDatum>[],
	legend: boolean | undefined,
): boolean {
	return legend ?? series.length > 1;
}

/**
 * The chart needs a label whatever the caller passed. A string title is the
 * obvious one; past that we fall back to naming the series, so the chart is
 * never announced as an unlabelled graphic.
 */
export function resolveAriaLabel<TDatum>(
	ariaLabel: string | undefined,
	title: ReactNode,
	series: readonly ChartSeries<TDatum>[],
): string {
	if (ariaLabel) return ariaLabel;
	if (typeof title === "string") return title;
	if (typeof title === "number") return String(title);
	const names = series.map(seriesLabel);
	return names.length ? `Chart of ${names.join(", ")}` : "Chart";
}

/** One (row, series) pair. See {@link foldSeries}. */
export interface FoldedRow<TDatum> {
	datum: TDatum;
	seriesKey: string;
	x: ChartXValue;
	value: number | null | undefined;
}

/**
 * Folds wide rows into one row per (row, series) pair.
 *
 * Grouping and stacking are computed *within* a mark, off its series channel —
 * so a grouped or stacked chart is a single mark over folded data, not one mark
 * per series. Rows come out x-major, which keeps a stack in the order the
 * `series` array declares.
 */
export function foldSeries<TDatum>(
	data: readonly TDatum[],
	series: readonly ChartSeries<TDatum>[],
	x: (datum: TDatum) => ChartXValue,
): FoldedRow<TDatum>[] {
	const rows: FoldedRow<TDatum>[] = [];
	for (const datum of data) {
		const xValue = x(datum);
		for (const entry of series) {
			rows.push({
				datum,
				seriesKey: entry.key,
				x: xValue,
				value: entry.value(datum),
			});
		}
	}
	return rows;
}

/** Looks up each series' colour by key, for a folded mark's `fill`. */
export function seriesColorLookup<TDatum>(
	series: readonly ChartSeries<TDatum>[],
): (key: string) => string {
	const colors = new Map(
		series.map((entry, index) => [entry.key, seriesColor(entry, index)]),
	);
	return (key) =>
		colors.get(key) ?? seriesColor(series[0] ?? { key, value: () => 0 }, 0);
}

/** Every distinct x value, in the order the data first mentions it. */
export function xDomain<TDatum>(
	data: readonly TDatum[],
	x: (datum: TDatum) => ChartXValue,
): ChartXValue[] {
	const seen = new Set<ChartXValue>();
	const domain: ChartXValue[] = [];
	for (const datum of data) {
		const value = x(datum);
		if (seen.has(value)) continue;
		seen.add(value);
		domain.push(value);
	}
	return domain;
}

/** Categorical unless every x is a number. */
export function isCategoricalX<TDatum>(
	data: readonly TDatum[],
	x: (datum: TDatum) => ChartXValue,
): boolean {
	return data.some((datum) => typeof x(datum) !== "number");
}

/**
 * The x axis for a chart whose marks sit *between* positions — lines, areas,
 * dots. Categorical data gets a point scale; numbers get a linear one.
 */
export function pointXAxis<TDatum>(
	data: readonly TDatum[],
	x: (datum: TDatum) => ChartXValue,
	options: { label?: string; format?: (value: ChartXValue) => string },
): ChartAxisOptions<ChartXValue> {
	const categorical = isCategoricalX(data, x);
	const domain = xDomain(data, x);
	return {
		scale: categorical
			? () => scalePoint<ChartXValue>().domain(domain).padding(0.2)
			: (scaleLinear as unknown as ChartAxisOptions<ChartXValue>["scale"]),
		nice: !categorical,
		axis: axisPresentation(options),
	};
}

/** The x axis for marks that occupy a slot: bars and their labels. */
export function bandXAxis<TDatum>(
	data: readonly TDatum[],
	x: (datum: TDatum) => ChartXValue,
	options: {
		label?: string;
		format?: (value: ChartXValue) => string;
		padding?: number;
	},
): ChartAxisOptions<ChartXValue> {
	const domain = xDomain(data, x);
	return {
		scale: () =>
			scaleBand<ChartXValue>()
				.domain(domain)
				.padding(options.padding ?? 0.24),
		axis: axisPresentation(options),
	};
}

/** A linear measure axis, niced and — usually — gridded. */
export function valueAxis(options: {
	label?: string;
	format?: (value: number) => string;
	grid?: boolean;
}): ChartAxisOptions<number> {
	return {
		scale: scaleLinear,
		nice: true,
		grid: options.grid ?? true,
		axis: axisPresentation(options),
	};
}

function axisPresentation<TValue extends ChartValue>(options: {
	label?: string;
	format?: (value: TValue) => string;
}): ChartAxisPresentationOptions<TValue> {
	return {
		label: options.label,
		ticks: options.format ? { format: options.format } : undefined,
	};
}

/**
 * The tooltip, wired so it speaks the caller's labels and formats rather than
 * the raw channel values. The `group` item is what turns "line-0" into
 * "Blue side" on a shared-x tooltip.
 */
export function hextechTooltip<TDatum>(args: {
	series: readonly ChartSeries<TDatum>[];
	xLabel?: string;
	yLabel?: string;
	formatX?: (value: ChartXValue) => string;
	formatY?: (value: number) => string;
}): { use: typeof tooltip } & ChartTooltipOptions<TDatum, never, never> {
	const labels = new Map(
		args.series.map((entry) => [entry.key, seriesLabel(entry)]),
	);
	const items: ChartTooltipItem<TDatum, never, never>[] = [
		{
			channel: "x",
			label: args.xLabel,
			text: (point) => formatChartValue(point.xValue, args.formatX),
		},
		{
			channel: "y",
			label: args.yLabel,
			text: (point) => formatChartValue(point.yValue, args.formatY),
		},
	];
	if (args.series.length > 1) {
		items.push({
			channel: "group",
			// One mark per series names the series in `markId`; a folded mark
			// names it in the series channel. Either way the reader sees the
			// label they wrote, not a mark id.
			text: (point) =>
				labels.get(String(point.group ?? point.markId)) ?? point.groupLabel,
		});
	}
	return { use: tooltip, items };
}

/** Row-level accessor for a tooltip item, tolerant of the widened value type. */
function formatChartValue(
	value: unknown,
	format?: ((value: never) => string) | undefined,
): string {
	if (format) return (format as (value: unknown) => string)(value);
	if (typeof value === "number") return numberFormat.format(value);
	return String(value);
}

const numberFormat = new Intl.NumberFormat();
