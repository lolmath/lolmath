import { cx } from "cva";
import {
	ProgressBar as AriaProgressBar,
	type ProgressBarProps as AriaProgressBarProps,
	Label,
} from "react-aria-components";
import classes from "./progress-bar.module.css";

interface ProgressBarProps extends Omit<AriaProgressBarProps, "children"> {
	label?: string;
}

export function ProgressBar({
	className,
	label,
	...props
}: ProgressBarProps): JSX.Element {
	return (
		<AriaProgressBar className={cx(classes.wrapper, className)} {...props}>
			{({ percentage, valueText }) => (
				<>
					<div className={classes.labelWrapper}>
						<Label>{label ?? "Loading"}</Label>
						<span>{valueText}</span>
					</div>
					<div className={classes.progressBar}>
						<div className={classes.fill} style={{ width: `${percentage}%` }} />
					</div>
				</>
			)}
		</AriaProgressBar>
	);
}
