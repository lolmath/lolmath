import { type Ref, forwardRef } from "react";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
	type ButtonRenderProps,
} from "react-aria-components";
import { resolveClassName } from "../utilities/resolve-class-name.js";
import { cva } from "cva";
import classes from "./button.module.css";

export type ButtonShape = "round" | "square" | "normal";
export type ButtonPreset =
	| "primary"
	| "secondary"
	| "text"
	| "hextech"
	| "dimmed";

interface ButtonProps extends AriaButtonProps {
	innerClassName?: string | ((values: ButtonRenderProps) => string);
	preset?: ButtonPreset;
	thin?: boolean;
	shape?: ButtonShape;
}

const button = cva({
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

function _Button(
	{
		children,
		className,
		preset = "secondary",
		shape = "normal",
		innerClassName,
		thin = preset === "dimmed",
		...props
	}: ButtonProps,
	ref: Ref<HTMLButtonElement>,
) {
	return (
		<AriaButton
			ref={ref}
			{...props}
			className={(values) => {
				return button({
					className: resolveClassName(innerClassName, values),
					preset,
					shape,
					thin,
					...values,
				});
			}}
		>
			{children}
		</AriaButton>
	);
}

export const Button = forwardRef(_Button);
