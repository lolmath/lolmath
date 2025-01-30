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
		size: {
			small: classes.small,
			medium: classes.medium,
			large: classes.large,
		},
		isTextArea: { true: classes.textArea },
	},
});

export function TextField({
	inputProps = {},
	borderProps = {},
	children,
	size = "medium",
	...props
}: AriaTextFieldProps & {
	inputProps?: InputProps;
	borderProps?: ComponentProps<"div">;
	size?: "small" | "medium" | "large";
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
									size,
								}),
						)}
					/>
				</>
			)}
		</AriaTextField>
	);
}
