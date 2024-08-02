import { createElement } from "react";
import classes from "./heading.module.css";
import { cva } from "class-variance-authority";

export type HeadingColor = "gold100" | "gold200" | "gold400" | "grey100";
export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5";

interface HeadingProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLHeadingElement>,
		HTMLHeadingElement
	> {
	preset?: HeadingElement;
	color?: HeadingColor;
	as?: HeadingElement | "span";
}

export const heading = cva(classes.heading, {
	variants: {
		color: {
			gold100: classes.gold100,
			gold200: classes.gold200,
			gold400: classes.gold400,
			grey100: classes.grey100,
		},
		preset: {
			h1: classes.h1,
			h2: classes.h2,
			h3: classes.h3,
			h4: classes.h4,
			h5: classes.h5,
		},
	},
});

export function Heading({
	as,
	preset = "h1",
	color = "gold100",
	className,
	...rest
}: HeadingProps): JSX.Element {
	const resultAs = as ?? preset;

	return createElement(resultAs, {
		...rest,
		className: heading({ preset, color, className }),
	});
}
