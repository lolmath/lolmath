import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
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

export const LabelText: Story = {
  args: {
    preset: "label",
  },
};

export const LargeNumberText: Story = {
  args: {
    preset: "large-number",
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
    color: "grey-100",
  },
};

export const TextGrey150: Story = {
  args: {
    color: "grey-150",
  },
};

export const TextGold100: Story = {
  args: {
    color: "gold-100",
  },
};
