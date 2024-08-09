import { ToggleButton } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { FaGear } from "react-icons/fa6";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "ToggleButton",
	component: ToggleButton,
	tags: ["autodocs"],
	argTypes: {
		isDisabled: {
			defaultValue: false,
			description: "Is the button disabled?",
			type: { name: "boolean" },
		},
		preset: {
			defaultValue: undefined,
		},
		shape: {
			defaultValue: "normal",
			description: "The Shape of the button",
		},
		thin: {
			defaultValue: false,
			description: "Is the button thin?",
			type: { name: "boolean" },
		},
	},
	args: {
		children: "+",
	},
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Secondary: Story = {
	args: {
		children: "some text",
		preset: "secondary",
	},
};

export const Hextech: Story = {
	args: {
		children: "some text",
		preset: "hextech",
	},
};

export const Dimmed: Story = {
	args: {
		children: "some text",
		preset: "dimmed",
	},
};

export const Disabled: Story = {
	args: {
		children: "some text",
		isDisabled: true,
	},
};

export const RoundedSecondary: Story = {
	args: {
		preset: "secondary",
		shape: "round",
		children: <FaGear />,
	},
};

export const RoundedHextech: Story = {
	args: {
		preset: "hextech",
		shape: "round",
		children: <FaGear />,
	},
};

export const RoundedDimmed: Story = {
	args: {
		preset: "dimmed",
		shape: "round",
		children: <FaGear />,
	},
};

export const RoundedDisabled: Story = {
	args: {
		isDisabled: true,
		shape: "round",
		children: <FaGear />,
	},
};

export const RoundedSecondaryWithText: Story = {
	args: {
		preset: "secondary",
		shape: "round",
		children: "A",
	},
};

export const SquaredSecondary: Story = {
	args: {
		preset: "secondary",
		shape: "square",
		children: <FaGear />,
	},
};

export const SquaredHextech: Story = {
	args: {
		preset: "hextech",
		shape: "square",
		children: <FaGear />,
	},
};

export const SquaredDimmed: Story = {
	args: {
		preset: "dimmed",
		shape: "square",
		children: <FaGear />,
	},
};

export const SquaredDisabled: Story = {
	args: {
		isDisabled: true,
		shape: "square",
		children: <FaGear />,
	},
};

export const SquaredThinSecondary: Story = {
	args: {
		preset: "secondary",
		shape: "square",
		thin: true,
		children: <FaGear />,
	},
};

export const SquaredDimmedDisabled: Story = {
	args: {
		preset: "dimmed",
		shape: "square",
		isDisabled: true,
		children: <FaGear />,
	},
};
