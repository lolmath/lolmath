import type { ChartValue, DomChartDefinition } from "@tanstack/charts";
import { Chart, type ChartProps } from "@tanstack/charts/react";
import { cx } from "cva";
import { type HTMLAttributes, type JSX, useMemo } from "react";
import { hextechChartTheme, withHextechTheme } from "../../theme/theme";
import classes from "./hextech-chart.module.css";

export interface HextechChartProps<
	TDatum = unknown,
	TXValue extends ChartValue = ChartValue,
	TYValue extends ChartValue = ChartValue,
> extends ChartProps<TDatum, TXValue, TYValue> {
	/**
	 * Lights the marks with the faint hextech bloom. On by default — turn it
	 * off for dense charts, where a glow on every line turns into haze.
	 */
	glow?: boolean;
	/** Props for the element wrapping the plot. */
	wrapperProps?: HTMLAttributes<HTMLDivElement>;
}

/**
 * A TanStack chart wearing the Hextech theme, with no frame around it.
 *
 * Use it when you have written a `defineChart` definition of your own and want
 * it to look like the rest of the library. The theme is merged into the
 * definition, so anything the definition sets for itself still wins.
 */
export function HextechChart<
	TDatum,
	TXValue extends ChartValue = ChartValue,
	TYValue extends ChartValue = ChartValue,
>({
	definition,
	glow = true,
	className,
	wrapperProps,
	...rest
}: HextechChartProps<TDatum, TXValue, TYValue>): JSX.Element {
	const themed = useMemo(() => applyHextechTheme(definition), [definition]);
	const { className: wrapperClassName, ...restWrapperProps } =
		wrapperProps ?? {};

	return (
		<div
			data-lol-chart=""
			data-lol-chart-glow={glow}
			className={cx(classes.chart, wrapperClassName)}
			{...restWrapperProps}
		>
			<Chart definition={themed} className={className} {...rest} />
		</div>
	);
}

/**
 * Merges the theme in. A responsive definition builds its spec per size, so the
 * theme has to go on what the builder returns rather than on the definition.
 */
function applyHextechTheme<
	TDatum,
	TXValue extends ChartValue,
	TYValue extends ChartValue,
>(
	definition: DomChartDefinition<TDatum, TXValue, TYValue>,
): DomChartDefinition<TDatum, TXValue, TYValue> {
	if ("chart" in definition) {
		const build = definition.chart;
		return {
			...definition,
			chart: (context) => withHextechTheme(build(context)),
		};
	}
	return {
		...definition,
		theme: { ...hextechChartTheme, ...definition.theme },
	};
}
