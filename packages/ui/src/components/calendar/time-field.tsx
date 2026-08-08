import type { ComponentProps } from "react";
import type {
	TimeFieldProps as AriaTimeFieldProps,
	TimeValue,
} from "react-aria-components";
import { TimeField as AriaTimeField } from "react-aria-components";
import { DateInput } from "./date-field";

export function TimeField<T extends TimeValue>({
	inputProps = {},
	children,
	size = "medium",
	...props
}: AriaTimeFieldProps<T> & {
	inputProps?: Omit<ComponentProps<typeof DateInput>, "size">;
	size?: "small" | "medium" | "large";
}) {
	return (
		<AriaTimeField {...props}>
			{(values) => (
				<>
					{typeof children === "function" ? children(values) : children}
					<DateInput {...inputProps} size={size} />
				</>
			)}
		</AriaTimeField>
	);
}
