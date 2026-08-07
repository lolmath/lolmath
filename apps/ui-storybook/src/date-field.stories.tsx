import { parseDate } from "@internationalized/date";
import { DateField, Label } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Inputs/DateField",
	component: DateField,
	tags: ["autodocs"],
	argTypes: { onChange: { action: "onChange" } },
	args: {
		defaultValue: parseDate("2026-08-15"),
	},
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };

export const WithLabel: Story = {
	args: { children: <Label>Date of birth</Label> },
};

export const Empty: Story = {
	args: { defaultValue: undefined, children: <Label>Date of birth</Label> },
};

export const Disabled: Story = {
	args: { isDisabled: true, children: <Label>Date of birth</Label> },
};

export const ReadOnly: Story = {
	args: { isReadOnly: true, children: <Label>Date of birth</Label> },
};

export const MonthAndYearOnly: Story = {
	name: "Month and year only",
	args: { granularity: "month", children: <Label>Expiry</Label> },
};

export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
