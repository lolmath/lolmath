import type { ChartMark, DomChartDefinition } from "@tanstack/charts";
import { barX, text } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import type { HTMLAttributes, JSX, ReactNode } from "react";
import { useMemo } from "react";
import { hextechSeriesColor } from "../../theme/theme";
import { ChartFrame } from "../chart-frame/chart-frame";
import { HextechChart } from "../hextech-chart/hextech-chart";

export interface RankingChartProps<TDatum> {
	/** The rows to rank. */
	data: readonly TDatum[];
	/** Names a row — a champion, an item, a player. */
	label: (datum: TDatum) => string;
	/** The measure the ranking is on. */
	value: (datum: TDatum) => number;
	/**
	 * Paints one bar. Every bar wears the same hue by default, because the
	 * ranking is already carried by the order and the length — spending the
	 * identity channel on rank would mean a bar changes colour when the filter
	 * changes. Reach for this when a row *means* something: a pick you are
	 * highlighting, a positive against a negative delta.
	 */
	color?: string | ((datum: TDatum, rank: number) => string);
	/** How to order the rows before drawing. */
	order?: "descending" | "ascending" | "input";
	/** Keeps only the first N rows after ordering. */
	limit?: number;
	/** Writes each value at the tip of its bar. On by default. */
	showValues?: boolean;
	/** Formats the value, for the tip label, the axis and the tooltip. */
	formatValue?: (value: number) => string;
	/** Axis title for the measure. */
	valueLabel?: string;
	/** Draws the measure axis and its grid. Off by default — the tip labels
	 * already carry every value, and the axis would only repeat them. */
	axis?: boolean;
	/** Plot height. Defaults to something proportional to the row count. */
	height?: number;
	title?: ReactNode;
	subtitle?: ReactNode;
	actions?: ReactNode;
	frame?: boolean;
	glow?: boolean;
	ariaLabel?: string;
	ariaDescription?: string;
	className?: string;
	frameProps?: Omit<
		HTMLAttributes<HTMLElement>,
		"title" | "className" | "children"
	>;
}

interface RankedRow<TDatum> {
	datum: TDatum;
	label: string;
	value: number;
	rank: number;
}

const defaultFormat = new Intl.NumberFormat();

/**
 * A ranked horizontal bar chart — the leaderboard shape. Longest bar on top,
 * every value written at the tip.
 *
 * ```tsx
 * <RankingChart
 *   title="Damage to champions"
 *   data={scoreboard}
 *   label={(row) => row.champion}
 *   value={(row) => row.damage}
 *   formatValue={(value) => `${Math.round(value / 1000)}k`}
 * />
 * ```
 */
export function RankingChart<TDatum>({
	data,
	label,
	value,
	color,
	order = "descending",
	limit,
	showValues = true,
	formatValue,
	valueLabel,
	axis = false,
	height,
	title,
	subtitle,
	actions,
	frame = true,
	glow = false,
	ariaLabel,
	ariaDescription,
	className,
	frameProps,
}: RankingChartProps<TDatum>): JSX.Element {
	const rows = useMemo(() => {
		const mapped = data.map((datum) => ({
			datum,
			label: label(datum),
			value: value(datum),
		}));
		if (order === "descending") mapped.sort((a, b) => b.value - a.value);
		if (order === "ascending") mapped.sort((a, b) => a.value - b.value);
		const limited = limit === undefined ? mapped : mapped.slice(0, limit);
		return limited.map((row, rank): RankedRow<TDatum> => ({ ...row, rank }));
	}, [data, label, limit, order, value]);

	const format =
		formatValue ?? ((input: number) => defaultFormat.format(input));

	const definition = useMemo(() => {
		const fill = (row: RankedRow<TDatum>) =>
			typeof color === "function"
				? color(row.datum, row.rank)
				: (color ?? hextechSeriesColor(0));
		const domain = rows.map((row) => row.label);

		const marks: ChartMark<RankedRow<TDatum>, number, string>[] = [
			barX(rows, {
				id: "value",
				x: (row) => row.value,
				y: (row) => row.label,
				fill,
				inset: 1,
				maxThickness: 24,
			}) as ChartMark<RankedRow<TDatum>, number, string>,
		];

		if (showValues) {
			marks.push(
				text(rows, {
					id: "value-label",
					x: (row) => row.value,
					y: (row) => row.label,
					text: (row) => format(row.value),
					// Text wears ink, never the series hue — the bar beside it
					// already carries the identity.
					fill: "var(--lol-chart-foreground)",
					anchor: "start",
					dx: 8,
					fontSize: 12,
				}) as unknown as ChartMark<RankedRow<TDatum>, number, string>,
			);
		}

		return {
			marks,
			x: {
				scale: scaleLinear,
				nice: true,
				grid: axis,
				axis: axis ? { label: valueLabel, ticks: { format } } : false,
			},
			y: {
				scale: () => scaleBand<string>().domain(domain).padding(0.28),
				axis: { line: false, ticks: { size: 0, padding: 8 } },
			},
			// Room for the tip labels, which sit outside the plot area.
			...(showValues ? { margin: { right: 56 } } : {}),
			clip: false,
			focus: "nearest",
			tooltip: {
				use: tooltip,
				items: [
					{
						channel: "y",
						label: "Name",
						text: (point: { datum: RankedRow<TDatum> }) => point.datum.label,
					},
					{
						channel: "x",
						label: valueLabel,
						text: (point: { datum: RankedRow<TDatum> }) =>
							format(point.datum.value),
					},
				],
			},
		} as unknown as DomChartDefinition<RankedRow<TDatum>, number, string>;
	}, [axis, color, format, rows, showValues, valueLabel]);

	return (
		<ChartFrame
			title={title}
			subtitle={subtitle}
			actions={actions}
			preset={frame ? "framed" : "bare"}
			className={className}
			{...frameProps}
		>
			<HextechChart
				definition={definition}
				height={height ?? Math.max(120, rows.length * 34 + 24)}
				glow={glow}
				ariaLabel={ariaLabel ?? (typeof title === "string" ? title : "Ranking")}
				ariaDescription={ariaDescription}
			/>
		</ChartFrame>
	);
}
