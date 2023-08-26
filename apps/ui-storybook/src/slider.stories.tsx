import type { Meta, StoryObj } from "@storybook/react";

import { Slider, SliderLabel } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    label: "Overall Volume",
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    defaultValue: [20, 80],
  },
};

export const SingleSlider: Story = {
  args: {
    defaultValue: 50,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    value: 20,
  },
};

export const OnChange: Story = {
  render: () => (
    <Slider
      defaultValue={20}
      onChange={(v) => {
        console.log(v);
      }}
    />
  ),
};

export const WithLabel: Story = {
  args: {
    value: 20,
  },
  render: () => (
    <Slider>
      <SliderLabel>Label</SliderLabel>
    </Slider>
  ),
};
