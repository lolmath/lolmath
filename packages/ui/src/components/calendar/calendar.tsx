import { cx } from "cva";
import type {
	CalendarCellProps as AriaCalendarCellProps,
	CalendarGridHeaderProps as AriaCalendarGridHeaderProps,
	CalendarGridProps as AriaCalendarGridProps,
	CalendarHeaderCellProps as AriaCalendarHeaderCellProps,
	CalendarProps as AriaCalendarProps,
	RangeCalendarProps as AriaRangeCalendarProps,
	DateValue,
} from "react-aria-components";
import {
	Calendar as AriaCalendar,
	CalendarCell as AriaCalendarCell,
	CalendarGrid as AriaCalendarGrid,
	CalendarGridBody as AriaCalendarGridBody,
	CalendarGridHeader as AriaCalendarGridHeader,
	CalendarHeaderCell as AriaCalendarHeaderCell,
	RangeCalendar as AriaRangeCalendar,
	CalendarHeading,
	CalendarMonthPicker,
	CalendarYearPicker,
	composeRenderProps,
} from "react-aria-components";
import { Button } from "../button";
import {
	Select,
	SelectButton,
	SelectListBox,
	SelectListBoxItem,
	SelectPopover,
	SelectValue,
} from "../select/select";
import classes from "./calendar.module.css";

function CalendarChevron({ flip }: { flip?: boolean }) {
	return (
		<svg
			width="10"
			height="10"
			viewBox="0 0 10 10"
			fill="none"
			aria-hidden="true"
			className={flip ? classes.chevronFlipped : undefined}
		>
			<path
				d="M7 1L3 5L7 9"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function CalendarNavButton({ slot }: { slot: "previous" | "next" }) {
	return (
		<Button
			preset="text"
			shape="round"
			size="small"
			slot={slot}
			aria-label={slot === "previous" ? "Previous" : "Next"}
		>
			<CalendarChevron flip={slot === "next"} />
		</Button>
	);
}

/**
 * Lets the user jump straight to a month, via a hextech-styled `Select`
 * fed by the calendar's own `CalendarMonthPicker`/`CalendarYearPicker`
 * render props (`aria-label`, `value`, `onChange`, `items`).
 */
function CalendarMonthYearNav() {
	return (
		<>
			<CalendarMonthPicker>
				{({ "aria-label": ariaLabel, value, onChange, items }) => (
					<Select
						aria-label={ariaLabel}
						selectedKey={value}
						onSelectionChange={onChange}
					>
						<SelectButton size="small" style={{ minWidth: "6.5rem" }}>
							<SelectValue />
						</SelectButton>
						<SelectPopover>
							<SelectListBox items={items}>
								{(item) => (
									<SelectListBoxItem id={item.id}>
										{item.formatted}
									</SelectListBoxItem>
								)}
							</SelectListBox>
						</SelectPopover>
					</Select>
				)}
			</CalendarMonthPicker>
			<CalendarYearPicker>
				{({ "aria-label": ariaLabel, value, onChange, items }) => (
					<Select
						aria-label={ariaLabel}
						selectedKey={value}
						onSelectionChange={onChange}
					>
						<SelectButton size="small" style={{ minWidth: "5rem" }}>
							<SelectValue />
						</SelectButton>
						<SelectPopover>
							<SelectListBox items={items}>
								{(item) => (
									<SelectListBoxItem id={item.id}>
										{item.formatted}
									</SelectListBoxItem>
								)}
							</SelectListBox>
						</SelectPopover>
					</Select>
				)}
			</CalendarYearPicker>
		</>
	);
}

export function CalendarHeaderCell({
	className,
	...props
}: AriaCalendarHeaderCellProps) {
	return (
		<AriaCalendarHeaderCell
			{...props}
			className={cx(classes.headerCell, className)}
		/>
	);
}

export function CalendarGridHeader({
	className,
	...props
}: AriaCalendarGridHeaderProps) {
	return (
		<AriaCalendarGridHeader
			{...props}
			className={cx(classes.gridHeader, className)}
		/>
	);
}

export function CalendarCell({ className, ...props }: AriaCalendarCellProps) {
	return (
		<AriaCalendarCell
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.cell, className),
			)}
		/>
	);
}

export function CalendarGrid({
	className,
	weekdayStyle = "narrow",
	...props
}: Omit<AriaCalendarGridProps, "children">) {
	return (
		<AriaCalendarGrid
			{...props}
			weekdayStyle={weekdayStyle}
			className={cx(classes.grid, className)}
		>
			<CalendarGridHeader>
				{(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
			</CalendarGridHeader>
			<AriaCalendarGridBody>
				{(date) => <CalendarCell date={date} />}
			</AriaCalendarGridBody>
		</AriaCalendarGrid>
	);
}

export interface CalendarProps<T extends DateValue>
	extends AriaCalendarProps<T> {
	/**
	 * `"heading"` shows a static "Month Year" heading with prev/next buttons.
	 * `"picker"` replaces it with Select-driven month and year dropdowns that
	 * jump straight to a month, always shown once regardless of
	 * `visibleDuration`.
	 *
	 * @default "heading"
	 */
	header?: "heading" | "picker";
}

export function Calendar<T extends DateValue>({
	header = "heading",
	className,
	...props
}: CalendarProps<T>) {
	const months = props.visibleDuration?.months ?? 1;

	return (
		<AriaCalendar
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.calendar, className),
			)}
		>
			{header === "picker" && (
				<div className={classes.nav}>
					<CalendarNavButton slot="previous" />
					<div className={classes.pickerGroup}>
						<CalendarMonthYearNav />
					</div>
					<CalendarNavButton slot="next" />
				</div>
			)}
			<div className={classes.months}>
				{Array.from({ length: months }, (_, i) => (
					<div className={classes.month} key={i}>
						{header === "heading" && (
							<div className={classes.nav}>
								{i === 0 && <CalendarNavButton slot="previous" />}
								<CalendarHeading
									offset={{ months: i }}
									className={classes.heading}
								/>
								{i === months - 1 && <CalendarNavButton slot="next" />}
							</div>
						)}
						<CalendarGrid offset={{ months: i }} />
					</div>
				))}
			</div>
		</AriaCalendar>
	);
}

export interface RangeCalendarProps<T extends DateValue>
	extends AriaRangeCalendarProps<T> {
	/**
	 * `"heading"` shows a static "Month Year" heading with prev/next buttons.
	 * `"picker"` replaces it with Select-driven month and year dropdowns that
	 * jump straight to a month, always shown once regardless of
	 * `visibleDuration`.
	 *
	 * @default "heading"
	 */
	header?: "heading" | "picker";
}

export function RangeCalendar<T extends DateValue>({
	header = "heading",
	className,
	...props
}: RangeCalendarProps<T>) {
	const months = props.visibleDuration?.months ?? 1;

	return (
		<AriaRangeCalendar
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.rangeCalendar, className),
			)}
		>
			{header === "picker" && (
				<div className={classes.nav}>
					<CalendarNavButton slot="previous" />
					<div className={classes.pickerGroup}>
						<CalendarMonthYearNav />
					</div>
					<CalendarNavButton slot="next" />
				</div>
			)}
			<div className={classes.months}>
				{Array.from({ length: months }, (_, i) => (
					<div className={classes.month} key={i}>
						{header === "heading" && (
							<div className={classes.nav}>
								{i === 0 && <CalendarNavButton slot="previous" />}
								<CalendarHeading
									offset={{ months: i }}
									className={classes.heading}
								/>
								{i === months - 1 && <CalendarNavButton slot="next" />}
							</div>
						)}
						<CalendarGrid offset={{ months: i }} />
					</div>
				))}
			</div>
		</AriaRangeCalendar>
	);
}
