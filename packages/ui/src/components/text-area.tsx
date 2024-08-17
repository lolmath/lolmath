import type {
	TextFieldProps as AriaTextFieldProps,
	TextAreaProps,
} from "react-aria-components";
import {
	TextArea as AriaTextArea,
	TextField as AriaTextField,
	composeRenderProps,
} from "react-aria-components";
import { textField } from "./text-field";

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
						className={composeRenderProps(
							textAreaProps.className,
							(className, values) =>
								textField({
									...values,
									className,
									isTextArea: true,
								}),
						)}
					/>
				</>
			)}
		</AriaTextField>
	);
}
