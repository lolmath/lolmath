import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Switch>;

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

export const Multiple: Story = {
  render: () => (
    <div className="inline-grid grid-cols-2">
      <Switch />
      <Switch />
      <Switch />
      <Switch />
    </div>
  ),
};
