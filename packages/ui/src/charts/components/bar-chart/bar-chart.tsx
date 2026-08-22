import type { ChartMark, DomChartDefinition } from "@tanstack/charts";
import { barY, group, stack } from "@tanstack/charts";
import type { JSX } from "react";
import { useMemo } from "react";
import {
	bandXAxis,
	type CartesianChartProps,
	type ChartXValue,
	foldSeries,
	hextechTooltip,
	legendItems,
	resolveAriaLabel,
	seriesColorLookup,
	showLegend,
	valueAxis,
} from "../chart-common";
import { ChartFrame } from "../chart-frame/chart-frame";
import { ChartLegend } from "../chart-legend/chart-legend";
import { HextechChart } from "../hextech-chart/hextech-chart";

export interface BarChartProps<TDatum> extends CartesianChartProps<TDatum> {
	/**
	 * Side by side or stacked. Group when the series are compared against each
	 * other; stack when they sum to a whole.
	 */
	layout?: "grouped" | "stacked";
	/** Turns a stack into shares of 100%. Only meaningful when stacked. */
	normalize?: boolean;
	/**
	 * Corner radius. Zero by default: Hextech is chamfered and square, and the
	 * square is the shape the language uses to sit things on a grid.
	 */
	radius?: number;
	/** Widest a bar is allowed to get, in pixels. */
	maxThickness?: number;
}

/**
 * Columns over categories — per-champion damage, per-role gold share, counts
 * by patch.
 *
 * Bars are separated by a gap in the surface rather than by an outline: a
 * stroke around a bar is ink that carries no data.
 */
export function BarChart<TDatum>({
	data,
	series,
	x,
	layout = "grouped",
	normalize = false,
	radius = 0,
	maxThickness = 24,
	height = 280,
	title,
	subtitle,
	actions,
	xLabel,
	yLabel,
	formatX,
	formatY,
	grid = true,
	legend,
	frame = true,
	glow = false,
	ariaLabel,
	ariaDescription,
	className,
	frameProps,
}: BarChartProps<TDatum>): JSX.Element {
	const definition = useMemo(() => {
		const stacked = layout === "stacked";
		// Grouping and stacking are resolved inside one mark, off its series
		// channel, so the wide rows are folded rather than split into a mark
		// each. A single series needs neither and keeps its rows as they are.
		const rows = foldSeries(data, series, x);
		const colorOf = seriesColorLookup(series);

		const marks = [
			barY(rows, {
				id: "bars",
				x: (row) => row.x,
				y: (row) => row.value,
				z: (row) => row.seriesKey,
				fill: (row) => colorOf(row.seriesKey),
				// One pixel off each edge leaves a two-pixel channel of surface
				// between neighbours — the gap does the separating.
				inset: 1,
				maxThickness,
				radius,
				layout: stacked
					? stack(normalize ? { offset: "normalize" } : undefined)
					: group({ padding: 0.16 }),
			}),
		] as ChartMark<TDatum, ChartXValue, number>[];

		return {
			marks,
			x: bandXAxis(data, x, { label: xLabel, format: formatX }),
			y: valueAxis({ label: yLabel, format: formatY, grid }),
			focus: series.length > 1 ? "group-x" : "nearest",
			tooltip: hextechTooltip({
				series,
				xLabel,
				yLabel,
				formatX,
				formatY,
			}),
		} as unknown as DomChartDefinition<TDatum, ChartXValue, number>;
	}, [
		data,
		formatX,
		formatY,
		grid,
		layout,
		maxThickness,
		normalize,
		radius,
		series,
		x,
		xLabel,
		yLabel,
	]);

	return (
		<ChartFrame
			title={title}
			subtitle={subtitle}
			actions={actions}
			preset={frame ? "framed" : "bare"}
			className={className}
			footer={
				showLegend(series, legend) ? (
					<ChartLegend items={legendItems(series)} swatch="square" />
				) : undefined
			}
			{...frameProps}
		>
			<HextechChart
				definition={definition}
				height={height}
				glow={glow}
				ariaLabel={resolveAriaLabel(ariaLabel, title, series)}
				ariaDescription={ariaDescription}
			/>
		</ChartFrame>
	);
}
