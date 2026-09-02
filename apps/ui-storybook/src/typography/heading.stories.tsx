import { Heading } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

// The client's voice for anything that names a thing: Beaufort, uppercased and
// spaced, in five sizes.
//
// The box is trimmed to the capitals with `text-box: trim-both cap alphabetic`,
// so a heading is exactly as tall as the type you can see — none of the
// ascender, descender or leading space the face reserves. That makes the margin
// or gap you set around a heading the space you actually get, and lines a
// heading up on its caps with whatever sits beside it, but it also means a
// heading brings no breathing room of its own: the half-leading that used to sit
// above the caps and under the baseline is gone, so set the space you want.
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
		color: "gold100",
	},
};

export const ColorGold200Heading: Story = {
	args: {
		color: "gold200",
	},
};

export const ColorGold400Heading: Story = {
	args: {
		color: "gold400",
	},
};

export const ColorGrey100Heading: Story = {
	args: {
		color: "grey100",
	},
};
