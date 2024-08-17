import { cva } from "cva";
import { createElement } from "react";
import {
	Label as AriaLabel,
	type LabelProps as AriaLabelProps,
} from "react-aria-components";
import classes from "./text.module.css";

export type TextColor = "grey100" | "grey150" | "gold100";
export type TextElement = "p" | "span" | "div";
export type TextPreset = "sm" | "base" | "md" | "lg" | "largeNumber" | "stat";

const presetElements: Record<TextPreset, TextElement> = {
	sm: "p",
	base: "p",
	md: "p",
	lg: "p",
	largeNumber: "span",
	stat: "span",
};

const text = cva({
	base: classes.text,
	variants: {
		color: {
			grey100: classes.grey100,
			grey150: classes.grey150,
			gold100: classes.gold100,
		},
		preset: {
			sm: classes.sm,
			medium: classes.medium,
			md: classes.md,
			lg: classes.lg,
			label: classes.label,
			largeNumber: classes.largeNumber,
			stat: classes.stat,
		},
	},
});

interface TextProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement>,
		HTMLElement
	> {
	preset?: TextPreset;
	color?: TextColor;
	as?: TextElement;
}
export function Text({
	as = "p",
	preset = "base",
	color = "grey100",
	className,
	...rest
}: TextProps): JSX.Element {
	const elementType = as ?? presetElements[preset];
	return createElement(elementType, {
		...rest,
		className: text({ preset, color, className }),
	});
}

interface LabelProps extends AriaLabelProps {
	preset?: TextPreset | "label";
	color?: TextColor;
	as?: TextElement;
}
export function Label({
	preset = "sm",
	color = "grey100",
	className,
	...rest
}: LabelProps): JSX.Element {
	return createElement(AriaLabel, {
		...rest,
		className: text({ preset, color, className }),
	});
}
