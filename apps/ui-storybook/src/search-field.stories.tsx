import type { Meta, StoryObj } from "@storybook/react";

import { SearchField } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    placeholder: "Search",
  },
} satisfies Meta<typeof SearchField>;

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
