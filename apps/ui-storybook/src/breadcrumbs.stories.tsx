import type { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs, Breadcrumb } from "@lolmath/ui";

const meta = {
  title: "Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    children: (
      <>
        <Breadcrumb href="/">Home</Breadcrumb>
        <Breadcrumb href="/react-aria">React Aria</Breadcrumb>
        <Breadcrumb>Breadcrumbs</Breadcrumb>
      </>
    ),
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
