import type { ComponentProps } from "react";
import type {
	TextFieldProps as AriaTextFieldProps,
	InputProps,
} from "react-aria-components";
import {
	Input as AriaInput,
	TextField as AriaTextField,
	composeRenderProps,
} from "react-aria-components";

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
						className={composeRenderProps(
							inputProps.className,
							(className, values) =>
								textField({
									...values,
									className,
								}),
						)}
					/>
				</>
			)}
		</AriaTextField>
	);
}
