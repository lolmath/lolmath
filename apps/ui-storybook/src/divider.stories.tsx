import { Divider, Heading } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

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

export const WithChildren: Story = {
	args: {
		children: <Heading preset="h4">Text</Heading>,
	},
};

export const WithChildrenLeft: Story = {
	args: {
		preset: "left",
		children: <Heading preset="h4">Text</Heading>,
	},
};

export const WithChildrenRight: Story = {
	args: {
		preset: "right",
		children: <Heading preset="h4">Text</Heading>,
	},
};
