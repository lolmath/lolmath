import { cva } from "cva";
import type { JSX } from "react";
import {
	Label as AriaLabel,
	type LabelProps as AriaLabelProps,
	Text as AriaText,
	type TextProps as AriaTextProps,
} from "react-aria-components";
import classes from "./text.module.css";

export type TextColor = "grey100" | "grey150" | "gold100";
export type TextElement = "p" | "span" | "div";
export type TextPreset = "sm" | "base" | "md" | "lg" | "largeNumber" | "stat";

export const text = cva({
	base: classes.text,
	variants: {
		color: {
			grey100: classes.grey100,
			grey150: classes.grey150,
			gold100: classes.gold100,
		},
		preset: {
			sm: classes.sm,
			base: classes.base,
			md: classes.md,
			lg: classes.lg,
			label: classes.label,
			largeNumber: classes.largeNumber,
			stat: classes.stat,
		},
	},
});

interface TextProps extends AriaTextProps {
	preset?: TextPreset;
	color?: TextColor;
}
export function Text({
	preset = "base",
	color = "grey100",
	className,
	...rest
}: TextProps): JSX.Element {
	return <AriaText className={text({ preset, color, className })} {...rest} />;
}

interface LabelProps extends AriaLabelProps {
	preset?: TextPreset | "label";
	color?: TextColor;
}
export function Label({
	preset = "sm",
	color = "grey100",
	className,
	...rest
}: LabelProps): JSX.Element {
	return <AriaLabel className={text({ preset, color, className })} {...rest} />;
}
