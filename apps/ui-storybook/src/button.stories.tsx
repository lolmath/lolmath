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
    preset: {
      defaultValue: undefined,
    },
    shape: {
      defaultValue: "normal",
      description: "The Shape of the button",
    },
    thin: {
      defaultValue: false,
      description: "Is the button thin?",
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
    preset: "primary",
  },
};

export const Secondary: Story = {
  args: {
    preset: "secondary",
  },
};

export const Hextech: Story = {
  args: {
    preset: "hextech",
  },
};

export const Dimmed: Story = {
  args: {
    preset: "dimmed",
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Text: Story = {
  args: {
    preset: "text",
  },
};

export const TextDisabled: Story = {
  args: {
    isDisabled: true,
    preset: "text",
  },
};

export const TextInline: Story = {
  args: {
    preset: "text",
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
    preset: "primary",
    shape: "round",
    children: <FaGear />,
  },
};

export const RoundedSecondary: Story = {
  args: {
    preset: "secondary",
    shape: "round",
    children: <FaGear />,
  },
};

export const RoundedHextech: Story = {
  args: {
    preset: "hextech",
    shape: "round",
    children: <FaGear />,
  },
};

export const RoundedDimmed: Story = {
  args: {
    preset: "dimmed",
    shape: "round",
    children: <FaGear />,
  },
};

export const RoundedDisabled: Story = {
  args: {
    isDisabled: true,
    shape: "round",
    children: <FaGear />,
  },
};

export const RoundedText: Story = {
  args: {
    preset: "text",
    shape: "round",
    children: <FaGear />,
  },
};

export const RoundedTextDisabled: Story = {
  args: {
    isDisabled: true,
    shape: "round",
    preset: "text",
    children: <FaGear />,
  },
};

export const RoundedPrimaryWithText: Story = {
  args: {
    preset: "primary",
    shape: "round",
    children: "A",
  },
};

export const SquaredPrimary: Story = {
  args: {
    preset: "primary",
    shape: "square",
    children: <FaGear />,
  },
};

export const SquaredSecondary: Story = {
  args: {
    preset: "secondary",
    shape: "square",
    children: <FaGear />,
  },
};

export const SquaredHextech: Story = {
  args: {
    preset: "hextech",
    shape: "square",
    children: <FaGear />,
  },
};

export const SquaredDimmed: Story = {
  args: {
    preset: "dimmed",
    shape: "square",
    children: <FaGear />,
  },
};

export const SquaredDisabled: Story = {
  args: {
    isDisabled: true,
    shape: "square",
    children: <FaGear />,
  },
};

export const SquaredText: Story = {
  args: {
    preset: "text",
    shape: "square",
    children: <FaGear />,
  },
};

export const SquaredTextDisabled: Story = {
  args: {
    isDisabled: true,
    shape: "square",
    preset: "text",
    children: <FaGear />,
  },
};
