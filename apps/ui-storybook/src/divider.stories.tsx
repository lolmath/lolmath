import type { Meta, StoryObj } from "@storybook/react";

import { Divider } from "@lolmath/ui";

const meta = {
	title: "Divider",
	component: Divider,
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Center: Story = {
	args: {},
};

export const Left: Story = {
	args: {
		preset: "left",
	},
};

export const Right: Story = {
	args: {
		preset: "right",
	},
};
