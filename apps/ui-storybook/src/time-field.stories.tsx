import { Time } from "@internationalized/date";
import { Label, TimeField } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Inputs/TimeField",
	component: TimeField,
	tags: ["autodocs"],
	argTypes: { onChange: { action: "onChange" } },
	args: {
		defaultValue: new Time(14, 30),
	},
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };

export const WithLabel: Story = {
	args: { children: <Label>Start time</Label> },
};

export const TwelveHour: Story = {
	name: "12-hour clock",
	args: { hourCycle: 12 },
};

export const TwentyFourHour: Story = {
	name: "24-hour clock",
	args: { hourCycle: 24 },
};

export const WithSeconds: Story = {
	args: { granularity: "second", defaultValue: new Time(14, 30, 5) },
};

export const Disabled: Story = {
	args: { isDisabled: true, children: <Label>Start time</Label> },
};

export const ReadOnly: Story = {
	args: { isReadOnly: true, children: <Label>Start time</Label> },
};

export const MinMaxTime: Story = {
	name: "Constrained to a min/max time",
	args: { minValue: new Time(9, 0), maxValue: new Time(17, 0) },
};

export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
