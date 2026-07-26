import { Label, NumberField } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Inputs/NumberField",
	component: NumberField,
	tags: ["autodocs"],
	argTypes: {
		onChange: { action: "onChange" },
	},
	args: {
		defaultValue: 0,
	},
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const WithLabel: Story = {
	args: {
		children: <Label>Some label</Label>,
	},
};

export const Dimmed: Story = {
	args: {
		preset: "dimmed",
	},
};

export const AlignStart: Story = {
	render: (args) => (
		<div className="flex items-start">
			<NumberField {...args} />
		</div>
	),
};
