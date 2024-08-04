import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "@lolmath/ui";

const meta = {
	title: "Card",
	component: Card,
	tags: ["autodocs"],
	argTypes: {},
	args: {
		children: (
			<div className="text-white p-4">
				line one <br />
				line two <br />
				line three <br />
				line four <br />
				line five <br />
			</div>
		),
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const BackgroundImage: Story = {
	args: {
		children: (
			<img
				src="https://ddragon-webp.lolmath.net/img/champion/loading/Jhin_37.webp"
				alt="Jhin"
			/>
		),
		className: "inline-block",
	},
};

export const SmallerBorderWidth: Story = {
	args: {
		borderWidth: "1px",
	},
};
