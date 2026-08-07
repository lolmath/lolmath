import type { ComponentProps } from "react";
import type {
	ButtonProps as AriaButtonProps,
	DateRangePickerProps as AriaDateRangePickerProps,
	PopoverProps as AriaPopoverProps,
	DateValue,
} from "react-aria-components";
import {
	DateRangePicker as AriaDateRangePicker,
	Group as AriaGroup,
	composeRenderProps,
} from "react-aria-components";
import { RangeCalendar, type RangeCalendarProps } from "./calendar";
import {
	DatePickerButton,
	DatePickerPopover,
	dateGroup,
	PickerDateInput,
} from "./date-picker";
import classes from "./date-picker.module.css";

export function DateRangePicker<T extends DateValue>({
	children,
	groupProps = {},
	startInputProps = {},
	endInputProps = {},
	buttonProps = {},
	popoverProps = {},
	calendarProps = {},
	size = "medium",
	// Picking a range takes two clicks (start, then end); closing after the
	// first would make it look like the second one never registered.
	shouldCloseOnSelect = false,
	...props
}: AriaDateRangePickerProps<T> & {
	groupProps?: ComponentProps<typeof AriaGroup>;
	startInputProps?: ComponentProps<typeof PickerDateInput>;
	endInputProps?: ComponentProps<typeof PickerDateInput>;
	buttonProps?: AriaButtonProps;
	popoverProps?: AriaPopoverProps;
	calendarProps?: Omit<
		RangeCalendarProps<T>,
		"value" | "defaultValue" | "onChange"
	>;
	size?: "small" | "medium" | "large";
}) {
	return (
		<AriaDateRangePicker {...props} shouldCloseOnSelect={shouldCloseOnSelect}>
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
						<PickerDateInput {...startInputProps} slot="start" />
						<span className={classes.separator} aria-hidden="true">
							–
						</span>
						<PickerDateInput {...endInputProps} slot="end" />
						<DatePickerButton {...buttonProps} />
					</AriaGroup>
					<DatePickerPopover {...popoverProps}>
						<RangeCalendar {...calendarProps} />
					</DatePickerPopover>
				</>
			)}
		</AriaDateRangePicker>
	);
}
