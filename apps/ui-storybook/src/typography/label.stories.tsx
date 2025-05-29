import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Typography/Label",
	component: Label,
	tags: ["autodocs"],
	argTypes: {},
	args: {
		children: "The quick brown fox jumps over the lazy dog.",
	},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalLabel: Story = {};
