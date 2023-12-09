import type { Meta, StoryObj } from "@storybook/react";

import { Button, Tooltip, TooltipTrigger } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    isOpen: true,
    children: "fsd",
  },

  render: (args) => (
    <TooltipTrigger isOpen={args.isOpen}>
      <Button>Tooltip</Button>
      <Tooltip {...args} />
    </TooltipTrigger>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Open: Story = {
  args: {
    isOpen: true,
  },
};

export const Left: Story = {
  args: {
    placement: "left",
  },
};

export const Right: Story = {
  args: {
    placement: "right",
    isOpen: true,
  },
};

export const Top: Story = {
  args: {
    placement: "top",
  },
};

export const Bottom: Story = {
  args: {
    placement: "bottom",
  },
};

export const LongText: Story = {
  args: {
    children: (
      <div className="prose text-lol-grey-300 font-spiegel p-2 font-normal">
        <h1>Lorum Ipsum</h1>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
        </p>
      </div>
    ),
    isOpen: undefined,
    className: "w-[400px]",
  },
};

export const Instant: Story = {
  args: {
    children: (
      <div className="prose text-lol-grey-300 font-spiegel p-2 font-normal">
        This tooltip should appear instantly
      </div>
    ),
  },
  render: (args) => (
    <TooltipTrigger delay={0} closeDelay={0}>
      <Button>Tooltip</Button>
      <Tooltip {...args} />
    </TooltipTrigger>
  ),
};
