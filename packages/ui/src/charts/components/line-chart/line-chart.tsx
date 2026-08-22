import type { ChartMark, DomChartDefinition } from "@tanstack/charts";
import { areaY, crosshair, dot, lineY } from "@tanstack/charts";
import type { JSX } from "react";
import { useMemo } from "react";
import {
	type CartesianChartProps,
	type ChartCurveName,
	type ChartXValue,
	hextechTooltip,
	legendItems,
	pointXAxis,
	resolveAriaLabel,
	resolveCurve,
	seriesColor,
	showLegend,
	valueAxis,
} from "../chart-common";
import { ChartFrame } from "../chart-frame/chart-frame";
import { ChartLegend } from "../chart-legend/chart-legend";
import { HextechChart } from "../hextech-chart/hextech-chart";

export interface LineChartProps<TDatum> extends CartesianChartProps<TDatum> {
	/** How the line travels between points. Straight by default. */
	curve?: ChartCurveName;
	/** Marks each reading with a dot. Worth it below ~30 points a series. */
	points?: boolean;
	/** Washes the area under each line in its own hue. */
	area?: boolean;
	/** Follows the pointer with a vertical guide. On by default. */
	crosshair?: boolean;
}

/**
 * Lines over time — gold curves, damage curves, anything that only makes sense
 * read left to right.
 *
 * ```tsx
 * <LineChart
 *   title="Team gold"
 *   data={timeline}
 *   x={(row) => row.minute}
 *   series={[
 *     { key: "blue", label: "Blue side", value: (row) => row.blueGold },
 *     { key: "red", label: "Red side", value: (row) => row.redGold },
 *   ]}
 *   xLabel="Minute"
 *   yLabel="Gold"
 * />
 * ```
 */
export function LineChart<TDatum>({
	data,
	series,
	x,
	curve = "linear",
	points = false,
	area = false,
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
}: LineChartProps<TDatum>): JSX.Element {
	const definition = useMemo(() => {
		const resolvedCurve = resolveCurve(curve);
		const marks: ChartMark<TDatum, ChartXValue, number>[] = [];

		for (const [index, entry] of series.entries()) {
			const color = seriesColor(entry, index);

			if (area) {
				marks.push(
					areaY(data, {
						id: `${entry.key}-area`,
						x,
						y: entry.value,
						fill: color,
						// A wash, never a saturated block: the line carries the
						// reading, the fill only says which side of it is "under".
						fillOpacity: 0.12,
						curve: resolvedCurve,
					}) as ChartMark<TDatum, ChartXValue, number>,
				);
			}

			marks.push(
				lineY(data, {
					id: entry.key,
					x,
					y: entry.value,
					stroke: color,
					strokeWidth: 2,
					curve: resolvedCurve,
				}) as ChartMark<TDatum, ChartXValue, number>,
			);

			if (points) {
				marks.push(
					dot(data, {
						id: `${entry.key}-points`,
						x,
						y: entry.value,
						r: 4,
						fill: color,
						// A ring in the surface colour, so a dot stays legible
						// where it crosses another series' line.
						stroke: "var(--lol-chart-surface)",
						strokeWidth: 2,
					}) as ChartMark<TDatum, ChartXValue, number>,
				);
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
			// Every series at the hovered x at once: comparing two gold curves is
			// the whole reason the chart exists.
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
		area,
		curve,
		data,
		formatX,
		formatY,
		grid,
		points,
		series,
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
					<ChartLegend items={legendItems(series)} swatch="line" />
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
