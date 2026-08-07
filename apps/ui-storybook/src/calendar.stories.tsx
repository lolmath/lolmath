import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Calendar } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Inputs/Temporal inputs/Calendar",
	component: Calendar,
	tags: ["autodocs"],
	argTypes: { onChange: { action: "onChange" } },
	args: {
		"aria-label": "Date",
		defaultValue: parseDate("2026-08-15"),
	},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };

export const Today: Story = {
	args: { defaultValue: today(getLocalTimeZone()) },
};

export const WithMonthYearPicker: Story = {
	name: "With month/year picker",
	args: { header: "picker" },
};

export const MultipleMonths: Story = {
	args: { visibleDuration: { months: 2 } },
};

export const MinMaxDate: Story = {
	name: "Constrained to a min/max date",
	args: {
		minValue: parseDate("2026-08-01"),
		maxValue: parseDate("2026-08-21"),
	},
};

export const UnavailableDates: Story = {
	args: {
		isDateUnavailable: (date) => date.day % 7 === 0,
	},
};

export const Disabled: Story = {
	args: { isDisabled: true },
};

export const ReadOnly: Story = {
	args: { isReadOnly: true },
};
