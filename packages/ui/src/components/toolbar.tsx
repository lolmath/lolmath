"use client";

import { cx } from "cva";
import {
	Separator as AriaSeparator,
	type SeparatorProps as AriaSeparatorProps,
	Toolbar as AriaToolbar,
	type ToolbarProps as AriaToolbarProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./toolbar.module.css";

export interface ToolbarProps extends AriaToolbarProps {}

export function Toolbar({ className, ...props }: ToolbarProps) {
	return (
		<AriaToolbar
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.toolbar, className),
			)}
		/>
	);
}

export interface ToolbarSeparatorProps extends AriaSeparatorProps {}

/**
 * Separates groups of controls inside a `Toolbar`. Defaults to the orientation
 * that crosses a horizontal toolbar; pass `orientation="horizontal"` when the
 * toolbar itself is vertical.
 */
export function ToolbarSeparator({
	className,
	orientation = "vertical",
	...props
}: ToolbarSeparatorProps) {
	return (
		<AriaSeparator
			{...props}
			orientation={orientation}
			className={cx(classes.separator, className)}
		/>
	);
}
