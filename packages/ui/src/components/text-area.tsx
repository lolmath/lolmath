import type {
	TextFieldProps as AriaTextFieldProps,
	TextAreaProps,
} from "react-aria-components";
import {
	TextArea as AriaTextArea,
	TextField as AriaTextField,
} from "react-aria-components";
import { resolveClassName } from "../utilities/resolve-class-name.js";
import { textField } from "./text-field.js";

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
							textField({
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
