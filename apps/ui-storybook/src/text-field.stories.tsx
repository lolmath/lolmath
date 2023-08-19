import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    inputProps: {
      placeholder: "The quick brown fox jumps over the lazy dog.",
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
