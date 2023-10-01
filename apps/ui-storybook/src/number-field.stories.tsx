import type { Meta, StoryObj } from "@storybook/react";

import { NumberField } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "NumberField",
  component: NumberField,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "onChange" },
  },
  args: {
    defaultValue: 0,
  },
} satisfies Meta<typeof NumberField>;

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
