import { cva } from "cva";
import { type Ref, forwardRef } from "react";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./button.module.css";

export type ButtonShape = "round" | "square" | "normal";
export type ButtonPreset =
	| "primary"
	| "secondary"
	| "text"
	| "hextech"
	| "dimmed";

interface ButtonProps extends AriaButtonProps {
	preset?: ButtonPreset;
	thin?: boolean;
	shape?: ButtonShape;
}

export const button = cva({
	base: classes.button,
	variants: {
		preset: {
			primary: classes.primary,
			secondary: classes.secondary,
			text: classes.text,
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
		isFocused: {
			true: "",
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
	},
});

export function _Button(
	{
		children,
		className,
		preset = "secondary",
		shape = "normal",
		thin = preset === "dimmed",
		...props
	}: ButtonProps,
	ref: Ref<HTMLButtonElement>,
) {
	return (
		<AriaButton
			ref={ref}
			{...props}
			className={composeRenderProps(className, (className, values) =>
				button({
					className,
					preset,
					shape,
					thin,
					...values,
				}),
			)}
		>
			{children}
		</AriaButton>
	);
}

export const Button = forwardRef(_Button);
Button.displayName = "Button";
