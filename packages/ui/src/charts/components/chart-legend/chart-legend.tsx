import { cx } from "cva";
import type { CSSProperties, HTMLAttributes, JSX } from "react";
import classes from "./chart-legend.module.css";

export interface ChartLegendItem {
	/** Stable identity for the entry. */
	key: string;
	/** What the reader sees. Falls back to `key`. */
	label?: string;
	/** The colour of the mark this entry stands for. */
	color: string;
}

export interface ChartLegendProps extends HTMLAttributes<HTMLUListElement> {
	items: readonly ChartLegendItem[];
	/** Matches the swatch to the mark: a diamond, a square, or a line key. */
	swatch?: "diamond" | "square" | "line";
}

/**
 * The legend every multi-series chart carries.
 *
 * Colour alone is never allowed to be the only way to tell two series apart,
 * so this is not optional decoration — a chart with two or more series renders
 * one. A single-series chart does not: its title already says what is plotted,
 * and a lone swatch would only restate it.
 */
export function ChartLegend({
	items,
	swatch = "diamond",
	className,
	...rest
}: ChartLegendProps): JSX.Element {
	return (
		<ul className={cx(classes.legend, className)} {...rest}>
			{items.map((item) => (
				<li className={classes.item} key={item.key}>
					<span
						aria-hidden
						className={cx(
							classes.swatch,
							swatch === "square" && classes.square,
							swatch === "line" && classes.line,
						)}
						style={{ "--lol-chart-legend-color": item.color } as CSSProperties}
					/>
					{/* A box for the label: the entry's text would otherwise be an
					    anonymous flex item, which the trim cannot reach. */}
					<span className={classes.label}>{item.label ?? item.key}</span>
				</li>
			))}
		</ul>
	);
}
