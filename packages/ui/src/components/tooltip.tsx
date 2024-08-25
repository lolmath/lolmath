import { cva } from "cva";
import type { TooltipProps } from "react-aria-components";
import {
	Tooltip as AriaTooltip,
	OverlayArrow,
	composeRenderProps,
} from "react-aria-components";
import classes from "./tooltip.module.css";

const tooltip = cva({
	base: classes.tooltip,
	variants: {
		placement: {
			bottom: classes.bottom,
			top: classes.top,
			left: classes.left,
			right: classes.right,
			center: "",
		},
	},
});

const arrow = cva({
	base: classes.arrow,
	variants: {
		placement: {
			top: classes.top,
			bottom: classes.bottom,
			left: classes.left,
			right: classes.right,
			center: "",
		},
	},
});

export function Tooltip({ children, className, ...props }: TooltipProps) {
	return (
		<AriaTooltip
			{...props}
			className={composeRenderProps(className, (className, values) =>
				tooltip({
					...values,
					className,
				}),
			)}
			
		>
			{(values) => (
				<>
					<OverlayArrow>
						{(values) => (
							<>
								<svg
									viewBox="0 0 12 6"
									className={arrow(values)}
									width={20}
									height={10}
								>
									<title>Tooltip Arrow</title>
									<path d="M0 0,L6 6,L12 0" className={classes.outer} />
									<path d="M2 0 6 4 10 0" className={classes.inner} />
								</svg>
							</>
						)}
					</OverlayArrow>
					{typeof children === "function" ? children(values) : children}
				</>
			)}
		</AriaTooltip>
	);
}

export { TooltipTrigger } from "react-aria-components";
