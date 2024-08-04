import { type Ref, forwardRef } from "react";
import { Link as AriaButton, type LinkProps } from "react-aria-components";
import { resolveClassName } from "../utilities/resolve-class-name.js";
import { cva } from "cva";
import classes from "./button.module.css";
import type { ButtonPreset, ButtonShape } from "./button.js";

interface ButtonLinkProps extends LinkProps {
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

export function _ButtonLink(
	{
		children,
		className,
		preset = "secondary",
		shape = "normal",
		thin = preset === "dimmed",
		...props
	}: ButtonLinkProps,
	ref: Ref<HTMLAnchorElement>,
) {
	return (
		<AriaButton
			ref={ref}
			{...props}
			className={(values) => {
				return button({
					className: resolveClassName(className, values),
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

export const ButtonLink = forwardRef(_ButtonLink);
ButtonLink.displayName = "ButtonLink";
