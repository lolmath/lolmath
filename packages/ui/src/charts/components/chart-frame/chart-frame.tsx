import { cx } from "cva";
import type { HTMLAttributes, JSX, ReactNode } from "react";
import classes from "./chart-frame.module.css";

export interface ChartFrameProps
	extends Omit<HTMLAttributes<HTMLElement>, "title"> {
	/** Names what is plotted. Set in Beaufort, uppercased, like the client. */
	title?: ReactNode;
	/** One line of context under the title — a patch, a rank, a sample size. */
	subtitle?: ReactNode;
	/** Controls that belong to this chart: a range picker, a toggle group. */
	actions?: ReactNode;
	/** Rendered under the plot. The chart components put the legend here. */
	footer?: ReactNode;
	/** Drops the metal, keeping the type and colours. */
	preset?: "framed" | "bare";
	children?: ReactNode;
}

/**
 * The panel a Hextech chart sits in: a gold hairline, diamond corners, a title
 * in Beaufort and a rule under it.
 *
 * Every chart in this package renders one of these. Reach for it directly when
 * you are building a chart of your own and want it to sit alongside them.
 */
export function ChartFrame({
	title,
	subtitle,
	actions,
	footer,
	preset = "framed",
	className,
	children,
	...rest
}: ChartFrameProps): JSX.Element {
	const hasHeader = title !== undefined || subtitle !== undefined || actions;

	return (
		<figure
			className={cx(
				classes.frame,
				preset === "bare" && classes.bare,
				className,
			)}
			{...rest}
		>
			{hasHeader && (
				<figcaption className={classes.header}>
					<div className={classes.headings}>
						{title !== undefined && <p className={classes.title}>{title}</p>}
						{subtitle !== undefined && (
							<p className={classes.subtitle}>{subtitle}</p>
						)}
					</div>
					{actions && <div className={classes.actions}>{actions}</div>}
				</figcaption>
			)}

			{hasHeader && (
				<div aria-hidden className={classes.rule}>
					<span className={classes.ruleDiamond} />
					<hr className={classes.ruleLine} />
					<span className={classes.ruleDiamond} />
				</div>
			)}

			<div className={classes.body}>{children}</div>

			{footer && <div className={classes.footer}>{footer}</div>}

			{/* Last, not first: `figcaption` has to be the figure's first or last
			    child, and the caption claims the first slot. */}
			<span aria-hidden className={cx(classes.corner, classes.cornerTopLeft)} />
			<span
				aria-hidden
				className={cx(classes.corner, classes.cornerTopRight)}
			/>
			<span
				aria-hidden
				className={cx(classes.corner, classes.cornerBottomLeft)}
			/>
			<span
				aria-hidden
				className={cx(classes.corner, classes.cornerBottomRight)}
			/>
		</figure>
	);
}
