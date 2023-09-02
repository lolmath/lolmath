import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
