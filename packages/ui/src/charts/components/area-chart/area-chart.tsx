import type { ChartMark, DomChartDefinition } from "@tanstack/charts";
import { areaY, crosshair, lineY, stack } from "@tanstack/charts";
import type { JSX } from "react";
import { useMemo } from "react";
import {
	type CartesianChartProps,
	type ChartCurveName,
	type ChartXValue,
	foldSeries,
	hextechTooltip,
	legendItems,
	pointXAxis,
	resolveAriaLabel,
	resolveCurve,
	seriesColor,
	seriesColorLookup,
	showLegend,
	valueAxis,
} from "../chart-common";
import { ChartFrame } from "../chart-frame/chart-frame";
import { ChartLegend } from "../chart-legend/chart-legend";
import { HextechChart } from "../hextech-chart/hextech-chart";

export interface AreaChartProps<TDatum> extends CartesianChartProps<TDatum> {
	/** How the boundary travels between points. */
	curve?: ChartCurveName;
	/**
	 * Stacks the series into a total instead of overlaying them. Stack when the
	 * parts genuinely sum to something — damage by source, gold by lane.
	 */
	stacked?: boolean;
	/**
	 * Turns a stack into shares of 100%. Only meaningful when `stacked`.
	 */
	normalize?: boolean;
	/** Draws the boundary of each area. On by default. */
	stroke?: boolean;
	/** Follows the pointer with a vertical guide. On by default. */
	crosshair?: boolean;
}

/**
 * Filled areas — a composition over time, or a single magnitude you want to
 * read as volume rather than as a trace.
 *
 * Overlaid areas (the default) are only honest for two or three series; past
 * that the ones behind disappear. Stack them, or split into small multiples.
 */
export function AreaChart<TDatum>({
	data,
	series,
	x,
	curve = "linear",
	stacked = false,
	normalize = false,
	stroke = true,
	crosshair: withCrosshair = true,
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
	glow = true,
	ariaLabel,
	ariaDescription,
	className,
	frameProps,
}: AreaChartProps<TDatum>): JSX.Element {
	const definition = useMemo(() => {
		const resolvedCurve = resolveCurve(curve);
		const marks: ChartMark<TDatum, ChartXValue, number>[] = [];

		if (stacked) {
			// A stack is resolved inside one mark, off its series channel, so the
			// wide rows are folded rather than split into a mark each.
			const rows = foldSeries(data, series, x);
			const colorOf = seriesColorLookup(series);
			marks.push(
				areaY(rows, {
					id: "areas",
					x: (row) => row.x,
					y: (row) => row.value,
					z: (row) => row.seriesKey,
					fill: (row) => colorOf(row.seriesKey),
					// A stack reads as blocks, so it can carry more ink than an
					// overlay, where the series behind have to stay visible.
					fillOpacity: 0.62,
					curve: resolvedCurve,
					layout: stack(normalize ? { offset: "normalize" } : undefined),
					...(stroke
						? { stroke: "var(--lol-chart-surface)", strokeWidth: 1 }
						: {}),
				}) as unknown as ChartMark<TDatum, ChartXValue, number>,
			);
		} else {
			for (const [index, entry] of series.entries()) {
				const color = seriesColor(entry, index);

				marks.push(
					areaY(data, {
						id: entry.key,
						x,
						y: entry.value,
						fill: color,
						fillOpacity: 0.16,
						curve: resolvedCurve,
					}) as ChartMark<TDatum, ChartXValue, number>,
				);

				// An overlay's fill is too faint to trace, so the reading lives on
				// a full-weight line drawn over the top of every wash.
				if (stroke) {
					marks.push(
						lineY(data, {
							id: `${entry.key}-line`,
							x,
							y: entry.value,
							stroke: color,
							strokeWidth: 2,
							curve: resolvedCurve,
						}) as ChartMark<TDatum, ChartXValue, number>,
					);
				}
			}
		}

		if (withCrosshair) {
			marks.push(
				crosshair({
					x: true,
					y: false,
					stroke: "var(--lol-chart-frame-accent)",
					strokeOpacity: 0.45,
				}) as unknown as ChartMark<TDatum, ChartXValue, number>,
			);
		}

		return {
			marks,
			x: pointXAxis(data, x, { label: xLabel, format: formatX }),
			y: valueAxis({ label: yLabel, format: formatY, grid }),
			focus: "group-x",
			tooltip: hextechTooltip({
				series,
				xLabel,
				yLabel,
				formatX,
				formatY,
			}),
		} as unknown as DomChartDefinition<TDatum, ChartXValue, number>;
	}, [
		curve,
		data,
		formatX,
		formatY,
		grid,
		normalize,
		series,
		stacked,
		stroke,
		withCrosshair,
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
					<ChartLegend items={legendItems(series)} />
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
