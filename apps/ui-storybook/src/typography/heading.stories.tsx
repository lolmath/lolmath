import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Typography/Heading",
	component: Heading,
	tags: ["autodocs"],
	argTypes: {},
	args: {
		children: "The quick brown fox jumps over the lazy dog.",
	},
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1Heading: Story = {
	args: {
		preset: "h1",
	},
};

export const H2Heading: Story = {
	args: {
		preset: "h2",
	},
};

export const H3Heading: Story = {
	args: {
		preset: "h3",
	},
};

export const H4Heading: Story = {
	args: {
		preset: "h4",
	},
};

export const H5Heading: Story = {
	args: {
		preset: "h5",
	},
};

export const ColorGold100Heading: Story = {
	args: {
		color: "gold-100",
	},
};

export const ColorGold200Heading: Story = {
	args: {
		color: "gold-200",
	},
};

export const ColorGold400Heading: Story = {
	args: {
		color: "gold-400",
	},
};

export const ColorGrey100Heading: Story = {
	args: {
		color: "grey-100",
	},
};
