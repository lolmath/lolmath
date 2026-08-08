import { cva, cx } from "cva";
import type { ComponentProps } from "react";
import type {
	DateFieldProps as AriaDateFieldProps,
	DateInputProps as AriaDateInputProps,
	DateSegmentProps as AriaDateSegmentProps,
	DateValue,
} from "react-aria-components";
import {
	DateField as AriaDateField,
	DateInput as AriaDateInput,
	DateSegment as AriaDateSegment,
	composeRenderProps,
} from "react-aria-components";
import classes from "./date-field.module.css";

export const dateInput = cva({
	base: classes.dateInput,
	variants: {
		size: {
			small: classes.small,
			medium: classes.medium,
			large: classes.large,
		},
	},
});

export function DateSegment({ className, ...props }: AriaDateSegmentProps) {
	return (
		<AriaDateSegment
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.segment, className),
			)}
		/>
	);
}

export function DateInput({
	className,
	size = "medium",
	children,
	...props
}: Omit<AriaDateInputProps, "children"> & {
	size?: "small" | "medium" | "large";
	children?: AriaDateInputProps["children"];
}) {
	return (
		<AriaDateInput
			{...props}
			className={composeRenderProps(className, (className, values) =>
				dateInput({ className, size, ...values }),
			)}
		>
			{children ?? ((segment) => <DateSegment segment={segment} />)}
		</AriaDateInput>
	);
}

export function DateField<T extends DateValue>({
	inputProps = {},
	children,
	size = "medium",
	...props
}: AriaDateFieldProps<T> & {
	inputProps?: Omit<ComponentProps<typeof DateInput>, "size">;
	size?: "small" | "medium" | "large";
}) {
	return (
		<AriaDateField {...props}>
			{(values) => (
				<>
					{typeof children === "function" ? children(values) : children}
					<DateInput {...inputProps} size={size} />
				</>
			)}
		</AriaDateField>
	);
}
