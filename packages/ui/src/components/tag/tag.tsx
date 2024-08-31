"use client";

import { cva, cx } from "cva";
import {
	Button as AriaButton,
	Tag as AriaTag,
	type TagProps as AriaTagProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./tag.module.css";

const removeButton = cva({
	base: classes.remove,
	variants: {
		isHovered: {
			true: classes.hover,
		},
		isPressed: {
			true: classes.press,
		},
	},
});

export function Tag({ children, className, ...props }: AriaTagProps) {
	return (
		<AriaTag
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.tag, className),
			)}
		>
			{composeRenderProps(children, (children) => (
				<>
					<span className={classes.text}>{children}</span>
					<AriaButton
						slot="remove"
						className={(values) => removeButton(values)}
					/>
				</>
			))}
		</AriaTag>
	);
}
