import { parseDate } from "@internationalized/date";
import { DatePicker, Label } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Inputs/Temporal inputs/DatePicker",
	component: DatePicker,
	tags: ["autodocs"],
	argTypes: { onChange: { action: "onChange" } },
	args: {
		defaultValue: parseDate("2026-08-15"),
	},
	parameters: { layout: "centered" },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };

export const WithLabel: Story = {
	args: { children: <Label>Match date</Label> },
};

export const Open: Story = {
	args: { defaultOpen: true, children: <Label>Match date</Label> },
};

export const WithMonthYearPicker: Story = {
	name: "With month/year picker",
	args: {
		defaultOpen: true,
		children: <Label>Match date</Label>,
		calendarProps: { header: "picker" },
	},
};

export const MinMaxDate: Story = {
	name: "Constrained to a min/max date",
	args: {
		minValue: parseDate("2026-08-01"),
		maxValue: parseDate("2026-08-21"),
	},
};

export const Disabled: Story = {
	args: { isDisabled: true, children: <Label>Match date</Label> },
};

export const ReadOnly: Story = {
	args: { isReadOnly: true, children: <Label>Match date</Label> },
};

export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
