import type { ComponentProps } from "react";
import type {
	TextFieldProps as AriaTextFieldProps,
	InputProps,
} from "react-aria-components";
import {
	Input as AriaInput,
	TextField as AriaTextField,
} from "react-aria-components";
import { resolveClassName } from "../utilities/resolve-class-name";

import { cva } from "cva";
import classes from "./text-field.module.css";

export const textField = cva({
	base: classes.textField,
	variants: {
		isDisabled: {
			true: classes.disabled,
		},
		isFocused: {
			true: classes.focus,
		},
	},
});

export function TextField({
	inputProps = {},
	borderProps = {},
	children,
	...props
}: AriaTextFieldProps & {
	inputProps?: InputProps;
	borderProps?: ComponentProps<"div">;
}) {
	return (
		<AriaTextField {...props}>
			{(values) => (
				<>
					{typeof children === "function" ? children(values) : children}

					<AriaInput
						type="text"
						{...inputProps}
						className={(values) =>
							textField({
								...values,
								className: resolveClassName(inputProps?.className, values),
							})
						}
					/>
				</>
			)}
		</AriaTextField>
	);
}
