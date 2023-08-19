import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    isDisabled: {
      defaultValue: false,
      description: "Is the button disabled?",
      type: { name: "boolean" },
    },
    priority: {
      defaultValue: undefined,
    },
  },
  args: {
    children: "League of Legends",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    priority: "primary",
  },
};

export const Secondary: Story = {
  args: {
    priority: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
