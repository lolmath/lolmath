import { parseDate } from "@internationalized/date";
import { DateRangePicker, Label } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Inputs/Temporal inputs/DateRangePicker",
	component: DateRangePicker,
	tags: ["autodocs"],
	argTypes: { onChange: { action: "onChange" } },
	args: {
		defaultValue: {
			start: parseDate("2026-08-10"),
			end: parseDate("2026-08-16"),
		},
	},
	parameters: { layout: "centered" },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };

export const WithLabel: Story = {
	args: { children: <Label>Event dates</Label> },
};

export const Open: Story = {
	args: { defaultOpen: true, children: <Label>Event dates</Label> },
};

export const TwoMonths: Story = {
	name: "Two months at once",
	args: {
		defaultOpen: true,
		children: <Label>Event dates</Label>,
		calendarProps: { visibleDuration: { months: 2 } },
	},
};

export const MinMaxDate: Story = {
	name: "Constrained to a min/max date",
	args: {
		minValue: parseDate("2026-08-01"),
		maxValue: parseDate("2026-08-28"),
	},
};

export const Disabled: Story = {
	args: { isDisabled: true, children: <Label>Event dates</Label> },
};

export const ReadOnly: Story = {
	args: { isReadOnly: true, children: <Label>Event dates</Label> },
};

export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
