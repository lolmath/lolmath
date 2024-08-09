import { cva } from "cva";
import type { ComponentProps } from "react";
import type {
	TextFieldProps as AriaTextFieldProps,
	TextAreaProps,
} from "react-aria-components";
import {
	TextArea as AriaTextArea,
	TextField as AriaTextField,
} from "react-aria-components";
import { resolveClassName } from "../utilities/resolve-class-name.js";
import classes from "./text-area.module.css";

const textArea = cva({
	base: classes.textArea,
	variants: {
		isDisabled: {
			true: classes.disabled,
		},
		isFocused: {
			true: classes.focus,
		},
	},
});

export function TextArea({
	textAreaProps = {},
	children,
	...props
}: AriaTextFieldProps & {
	textAreaProps?: TextAreaProps;
}) {
	return (
		<AriaTextField {...props}>
			{(values) => (
				<>
					{typeof children === "function" ? children(values) : children}
					<AriaTextArea
						{...textAreaProps}
						className={(values) =>
							textArea({
								...values,
								className: resolveClassName(textAreaProps?.className, values),
							})
						}
					/>
				</>
			)}
		</AriaTextField>
	);
}
