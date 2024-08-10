import type { TooltipProps } from "react-aria-components";
import { Tooltip as AriaTooltip, OverlayArrow } from "react-aria-components";
import { resolveClassName } from "../utilities/resolve-class-name.js";
import { tv } from "../utilities/tv.js";
import classes from "./tooltip.module.css";

const tooltipBorder = tv({
	base: classes.tooltip,
	variants: {
		placement: {
			bottom: classes.bottom,
			top: classes.top,
		},
	},
});

const tooltipArrowBorder = tv({
	base: classes.arrowBorder,
	variants: {
		placement: {
			top: classes.top,
			bottom: classes.bottom,
			left: classes.left,
			right: classes.right,
		},
	},
});

const tooltipArrow = tv({
	base: classes.arrow,
	variants: {
		placement: {
			top: classes.top,
			bottom: classes.bottom,
			left: classes.left,
			right: classes.right,
		},
	},
});

export function Tooltip({ children, ...props }: TooltipProps) {
	return (
		<AriaTooltip
			{...props}
			className={(values) =>
				tooltipBorder({
					...values,
					className: resolveClassName(props?.className, values),
				})
			}
		>
			{(values) => (
				<>
					<OverlayArrow className="translate-y-1 transform">
						{(values) => (
							<>
								<svg viewBox="0 0 12 12" className={tooltipArrowBorder(values)}>
									<path d="M0 0,L6 6,L12 0" />
								</svg>
								<svg viewBox="0 0 12 12" className={tooltipArrow(values)}>
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
