import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	argTypes: {},
	args: {
		children: "Enable Low Spec Mode",
	},
} satisfies Meta<typeof Checkbox>;

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
export const Indeterminate: Story = {
	args: {
		isIndeterminate: true,
	},
};

export const Multiple: Story = {
	render: () => (
		<div className="inline-grid grid-cols-2">
			<Checkbox />
			<Checkbox />
			<Checkbox />
			<Checkbox />
		</div>
	),
};
