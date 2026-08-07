import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { RangeCalendar } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Inputs/RangeCalendar",
	component: RangeCalendar,
	tags: ["autodocs"],
	argTypes: { onChange: { action: "onChange" } },
	args: {
		"aria-label": "Date range",
		defaultValue: {
			start: parseDate("2026-08-10"),
			end: parseDate("2026-08-16"),
		},
	},
} satisfies Meta<typeof RangeCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };

/**
 * A range spanning several weeks: the continuous gold border caps off at the
 * start and end of the whole selection, but also at the start and end of
 * every row the range wraps through in between.
 */
export const SpanningMultipleWeeks: Story = {
	name: "Spanning multiple weeks",
	args: {
		defaultValue: {
			start: parseDate("2026-08-04"),
			end: parseDate("2026-09-02"),
		},
	},
};

export const TwoMonths: Story = {
	name: "Two months at once",
	args: { visibleDuration: { months: 2 } },
};

export const WithMonthYearPicker: Story = {
	name: "With month/year picker",
	args: { header: "picker" },
};

export const MinMaxDate: Story = {
	name: "Constrained to a min/max date",
	args: {
		minValue: parseDate("2026-08-01"),
		maxValue: parseDate("2026-08-28"),
	},
};

export const AllowsNonContiguousRanges: Story = {
	args: {
		allowsNonContiguousRanges: true,
		isDateUnavailable: (date) => date.day % 7 === 0,
	},
};

export const Disabled: Story = {
	args: { isDisabled: true },
};

export const Today: Story = {
	args: {
		defaultValue: {
			start: today(getLocalTimeZone()),
			end: today(getLocalTimeZone()).add({ days: 4 }),
		},
	},
};
