"use client";

import { cx } from "cva";
import {
	ToggleButtonGroup as AriaToggleButtonGroup,
	type ToggleButtonGroupProps as AriaToggleButtonGroupProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./toggle-button-group.module.css";

export interface ToggleButtonGroupProps extends AriaToggleButtonGroupProps {}

export function ToggleButtonGroup({
	className,
	...props
}: ToggleButtonGroupProps) {
	return (
		<AriaToggleButtonGroup
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.toggleButtonGroup, className),
			)}
		/>
	);
}
