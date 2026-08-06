import { cva, cx } from "cva";
import type { PopoverProps } from "react-aria-components";
import {
	Popover as AriaPopover,
	composeRenderProps,
	Dialog,
	OverlayArrow,
} from "react-aria-components";
import classes from "./popover.module.css";

// Note: there is no tooltip component. Tooltips do not work on mobile devices.
// Use a text on the page instead, or use a toggle tip (which is a popover that
// is used only for informational purposes).

const popover = cva({
	base: classes.popover,
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

export function Popover({ children, className, ...props }: PopoverProps) {
	return (
		<AriaPopover
			{...props}
			className={composeRenderProps(className, (className, values) =>
				popover({
					...values,
					className,
					placement: values.placement ?? undefined,
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
									className={arrow({
										...values,
										placement: values.placement ?? undefined,
									})}
									width={20}
									height={10}
									aria-hidden="true"
								>
									<path d="M0 0,L6 6,L12 0" className={classes.outer} />
									<path d="M2 0 6 4 10 0" className={classes.inner} />
								</svg>
							</>
						)}
					</OverlayArrow>
					<Dialog>
						{typeof children === "function" ? children(values) : children}
					</Dialog>
				</>
			)}
		</AriaPopover>
	);
}

// The popover itself carries no content padding, since text needs breathing
// room from the popover's edge while other content (a divider, an image)
// should run edge to edge already. Wrap text content in this instead of
// reaching for a one-off inline style.

export function PopoverBody({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div {...props} className={cx(classes.body, className)} />;
}
