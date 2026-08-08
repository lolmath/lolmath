import { cva, cx } from "cva";
import type { ComponentProps } from "react";
import type { GroupProps as AriaGroupProps } from "react-aria-components";
import {
	Group as AriaGroup,
	Input as AriaInput,
	composeRenderProps,
} from "react-aria-components";
import classes from "./group.module.css";

export const group = cva({
	base: classes.group,
	variants: {
		size: {
			small: classes.small,
			medium: classes.medium,
			large: classes.large,
		},
	},
});

export interface GroupProps extends AriaGroupProps {
	size?: "small" | "medium" | "large";
}

/**
 * Visually merges several focusable controls (inputs, buttons, static
 * segments) into what reads as a single bordered field, e.g. a summoner name
 * plus its `#`-prefixed tag. `Group` draws the border itself, so children
 * meant to sit inside it should stay borderless — see `GroupInput` and
 * `GroupSeparator`.
 */
export function Group({ size = "medium", className, ...props }: GroupProps) {
	return (
		<AriaGroup
			{...props}
			className={composeRenderProps(className, (className, values) =>
				group({ className, size, ...values }),
			)}
		/>
	);
}

/** A borderless text input for use as a segment inside a `Group`. */
export function GroupInput({
	className,
	...props
}: ComponentProps<typeof AriaInput>) {
	return (
		<AriaInput
			type="text"
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.input, className),
			)}
		/>
	);
}

/** A static, non-interactive segment for use inside a `Group`, e.g. a `#` between a name and its tag. */
export function GroupSeparator({
	className,
	...props
}: ComponentProps<"span">) {
	return (
		<span aria-hidden {...props} className={cx(classes.separator, className)} />
	);
}
