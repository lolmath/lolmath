import { ProgressBar } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "ProgressBar",
	component: ProgressBar,
	tags: ["autodocs"],
	argTypes: {},
	args: {
		value: 30,
	},
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Empty: Story = {
	args: {
		value: 0,
	},
};

export const Full: Story = {
	args: {
		value: 100,
	},
};
