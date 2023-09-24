import type { Meta, StoryObj } from "@storybook/react";

import { TextArea } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    defaultValue: "The quick brown fox jumps over the lazy dog.",
    inputProps: {
      placeholder: "The quick brown fox jumps over the lazy dog.",
    },
  },
} satisfies Meta<typeof TextArea>;

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
