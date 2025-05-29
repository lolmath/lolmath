import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label, SearchField } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "SearchField",
	component: SearchField,
	tags: ["autodocs"],
	argTypes: {},
	args: {
		defaultValue: "The quick brown fox jumps over the lazy dog.",
		inputProps: {
			placeholder: "Search",
		},
	},
} satisfies Meta<typeof SearchField>;

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
