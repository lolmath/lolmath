import { Text } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Spiegel, in the sizes the client reads in, plus the two presets for a figure
// rather than a sentence: `stat` and `largeNumber`.
//
// `Text` renders inline, and `text-box: trim-both cap alphabetic` only reaches a
// box — which is exactly the behaviour to want. A reading inside a sentence
// keeps the leading that holds the sentence's lines apart; the same component
// laid out as a flex or grid item of its own, which is how a field label, a help
// line or a stat gets placed, is trimmed to its capitals, so the gap set against
// it is the gap that shows up.
const meta = {
	title: "Typography/Text",
	component: Text,
	tags: ["autodocs"],
	argTypes: {},
	args: {
		children: "The quick brown fox jumps over the lazy dog.",
	},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalText: Story = {};

export const SmallText: Story = {
	args: {
		preset: "sm",
	},
};

export const BaseText: Story = {
	args: {
		preset: "base",
	},
};

export const MediumText: Story = {
	args: {
		preset: "md",
	},
};

export const LargeText: Story = {
	args: {
		preset: "lg",
	},
};

export const LargeNumberText: Story = {
	args: {
		preset: "largeNumber",
		children: "+1,381",
	},
};

export const StatText: Story = {
	args: {
		preset: "stat",
		children: "16 / 3 / 210",
	},
};

export const TextGrey100: Story = {
	args: {
		color: "grey100",
	},
};

export const TextGrey150: Story = {
	args: {
		color: "grey150",
	},
};

export const TextGold100: Story = {
	args: {
		color: "gold100",
	},
};
