import { cva } from "cva";
import {
	ToggleButton as AriaToggleButton,
	type ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components";
import { resolveClassName } from "../utilities/resolve-class-name.js";
import classes from "./button.module.css";

export type ToggleButtonShape = "round" | "square" | "normal";
export type ToggleButtonPreset = "secondary" | "hextech" | "dimmed";

const button = cva({
	base: classes.button,
	variants: {
		preset: {
			secondary: classes.secondary,
			hextech: classes.hextech,
			dimmed: classes.dimmed,
		},
		isHovered: {
			true: classes.hover,
		},
		isPressed: {
			true: classes.press,
		},
		isDisabled: {
			true: classes.disabled,
		},
		isFocusVisible: {
			true: classes.focusVisible,
		},
		shape: {
			round: classes.round,
			square: classes.square,
			normal: classes.normal,
		},
		thin: {
			true: classes.thin,
		},
		isSelected: {
			true: classes.selected,
		},
	},
});
interface ToggleButtonProps extends AriaToggleButtonProps {
	preset?: ToggleButtonPreset;
	thin?: boolean;
	shape?: ToggleButtonShape;
}

export function ToggleButton({
	children,
	className,
	preset = "secondary",
	shape = "normal",
	thin = preset === "dimmed",
	...props
}: ToggleButtonProps) {
	return (
		<AriaToggleButton
			{...props}
			className={(values) =>
				button({
					...values,
					preset,
					shape,
					thin,
					className: resolveClassName(className, values),
				})
			}
		>
			{children}
		</AriaToggleButton>
	);
}
