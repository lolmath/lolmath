import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@lolmath/ui";
import { FaGear } from "react-icons/fa6";

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
    isSquared: {
      defaultValue: false,
      description: "Is the button squared?",
      type: { name: "boolean" },
    },
    isRounded: {
      defaultValue: false,
      description: "Is the button rounded?",
      type: { name: "boolean" },
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

export const Tertiary: Story = {
  args: {
    priority: "tertiary",
  },
};

export const TertiaryDisabled: Story = {
  args: {
    isDisabled: true,
    priority: "tertiary",
  },
};

export const TertiaryInline: Story = {
  args: {
    priority: "tertiary",
  },
  render: (args) => (
    <div className="bg-black p-4 text-white">
      This is a <Button {...args} /> button. There is also a lot of text here.
      Multiline text even. It's pretty cool. I like it. I like it a lot. I like
      it so much that I'm going to keep typing. I'm going to keep typing until
      this text wraps. I'm going to keep typing until this text wraps twice.
    </div>
  ),
};

export const RoundedPrimary: Story = {
  args: {
    priority: "primary",
    isRounded: true,
    children: <FaGear />,
  },
};

export const RoundedSecondary: Story = {
  args: {
    priority: "secondary",
    isRounded: true,
    children: <FaGear />,
  },
};

export const RoundedDisabled: Story = {
  args: {
    isDisabled: true,
    isRounded: true,
    children: <FaGear />,
  },
};

export const RoundedTertiary: Story = {
  args: {
    priority: "tertiary",
    isRounded: true,
    children: <FaGear />,
  },
};

export const RoundedTeritaryDisabled: Story = {
  args: {
    isDisabled: true,
    isRounded: true,
    priority: "tertiary",
    children: <FaGear />,
  },
};

export const SquaredPrimary: Story = {
  args: {
    priority: "primary",
    isSquared: true,
    children: <FaGear />,
  },
};

export const SquaredSecondary: Story = {
  args: {
    priority: "secondary",
    isSquared: true,
    children: <FaGear />,
  },
};

export const SquaredDisabled: Story = {
  args: {
    isDisabled: true,
    isSquared: true,
    children: <FaGear />,
  },
};

export const SquaredTertiary: Story = {
  args: {
    priority: "tertiary",
    isSquared: true,
    children: <FaGear />,
  },
};

export const SquaredTeritaryDisabled: Story = {
  args: {
    isDisabled: true,
    isSquared: true,
    priority: "tertiary",
    children: <FaGear />,
  },
};
