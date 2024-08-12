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

const tooltipArrowBorder = cva({
	base: classes.arrowBorder,
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

const tooltipArrowInner = cva({
	base: classes.arrowInner,
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
								<svg viewBox="0 0 12 12" className={tooltipArrowBorder(values)}>
									<path d="M0 0,L6 6,L12 0" />
								</svg>
								<svg viewBox="0 0 12 12" className={tooltipArrowInner(values)}>
									<path d="M0 0,L6 6,L12 0" />
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
