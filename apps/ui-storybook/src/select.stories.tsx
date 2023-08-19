import type { Meta, StoryObj } from "@storybook/react";

import { Item, Select } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Select",
  component: Select,
  render: (args) => (
    <Select {...args}>
      <Item>Chocolate</Item>
      <Item>Mint</Item>
      <Item>Strawberry</Item>
      <Item>Vanilla</Item>
    </Select>
  ),
  tags: ["autodocs"],
  argTypes: {},
  args: {
    label: "Select a flavor",
  },
} satisfies Meta<typeof Select>;

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
