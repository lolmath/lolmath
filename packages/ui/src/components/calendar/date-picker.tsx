import { cva, cx } from "cva";
import type { ComponentProps } from "react";
import type {
	ButtonProps as AriaButtonProps,
	DatePickerProps as AriaDatePickerProps,
	PopoverProps as AriaPopoverProps,
	DateValue,
} from "react-aria-components";
import {
	Button as AriaButton,
	DateInput as AriaDateInput,
	DatePicker as AriaDatePicker,
	Group as AriaGroup,
	Popover as AriaPopover,
	composeRenderProps,
} from "react-aria-components";
import { Calendar, type CalendarProps } from "./calendar";
import { DateSegment } from "./date-field";
import classes from "./date-picker.module.css";

/** A small calendar glyph for the trigger button. */
export function CalendarIcon() {
	return (
		<svg
			width="16"
			height="17"
			viewBox="0 0 32 34"
			fill="none"
			aria-hidden="true"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8.23077 30L2 24.8077V7.61692C2 6.51235 2.89543 5.61692 4 5.61692H4.61692L4.61692 5C4.61692 3.89543 5.51235 3 6.61692 3H7.80923C8.9138 3 9.80923 3.89543 9.80923 5V5.61692H21.0964L21.1212 4.9279C21.16 3.85209 22.0434 3 23.1199 3H24.3831C25.4876 3 26.3831 3.89543 26.3831 5V5.61692H27C28.1046 5.61692 29 6.51236 29 7.61692V9.48H2V11.64H29V30H8.23077ZM17.369 17.8088L15.5001 13.827L13.6311 17.8088L9.45215 18.4472L12.4762 21.5467L11.7623 25.923L15.5001 23.8568L19.238 25.923L18.5242 21.5467L21.5481 18.4472L17.369 17.8088Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export const dateGroup = cva({
	base: classes.group,
	variants: {
		size: {
			small: classes.small,
			medium: classes.medium,
			large: classes.large,
		},
	},
});

/**
 * The borderless `DateInput` used inside a `DatePicker`/`DateRangePicker`'s
 * `Group`, which draws the border itself. `DateField`/`TimeField` use the
 * standalone, self-bordered `DateInput` from "./date-field" instead.
 */
export function PickerDateInput({
	className,
	children,
	...props
}: Omit<ComponentProps<typeof AriaDateInput>, "children"> & {
	children?: ComponentProps<typeof AriaDateInput>["children"];
}) {
	return (
		<AriaDateInput
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.input, className),
			)}
		>
			{children ?? ((segment) => <DateSegment segment={segment} />)}
		</AriaDateInput>
	);
}

export function DatePickerButton({
	className,
	children,
	...props
}: AriaButtonProps) {
	return (
		<AriaButton {...props} className={cx(classes.button, className)}>
			{children ?? <CalendarIcon />}
		</AriaButton>
	);
}

export function DatePickerPopover({ className, ...props }: AriaPopoverProps) {
	return (
		<AriaPopover
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.popover, className),
			)}
		/>
	);
}

export function DatePicker<T extends DateValue>({
	children,
	groupProps = {},
	inputProps = {},
	buttonProps = {},
	popoverProps = {},
	calendarProps = {},
	size = "medium",
	...props
}: AriaDatePickerProps<T> & {
	groupProps?: ComponentProps<typeof AriaGroup>;
	inputProps?: ComponentProps<typeof PickerDateInput>;
	buttonProps?: AriaButtonProps;
	popoverProps?: AriaPopoverProps;
	calendarProps?: Omit<CalendarProps<T>, "value" | "defaultValue" | "onChange">;
	size?: "small" | "medium" | "large";
}) {
	return (
		<AriaDatePicker {...props}>
			{(values) => (
				<>
					{typeof children === "function" ? children(values) : children}
					<AriaGroup
						{...groupProps}
						className={composeRenderProps(
							groupProps.className,
							(className, v) => dateGroup({ className, size, ...v }),
						)}
					>
						<PickerDateInput {...inputProps} />
						<DatePickerButton {...buttonProps} />
					</AriaGroup>
					<DatePickerPopover {...popoverProps}>
						<Calendar {...calendarProps} />
					</DatePickerPopover>
				</>
			)}
		</AriaDatePicker>
	);
}
