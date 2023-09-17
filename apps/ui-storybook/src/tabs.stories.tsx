import type { Meta, StoryObj } from "@storybook/react";

import { Tab, TabList, TabPanel, Tabs } from "@lolmath/ui";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  render: (args) => {
    let [timePeriod, setTimePeriod] = useState<React.Key>("triassic");

    return (
      <Tabs
        selectedKey={timePeriod}
        onSelectionChange={setTimePeriod}
        {...args}
      >
        <TabList aria-label="Mesozoic time periods">
          <Tab id="triassic">Triassic</Tab>
          <Tab id="jurassic">Jurassic</Tab>
          <Tab id="cretaceous">Cretaceous</Tab>
        </TabList>
        <TabPanel id="triassic">
          The Triassic ranges roughly from 252 million to 201 million years ago,
          preceding the Jurassic Period.
        </TabPanel>
        <TabPanel id="jurassic">
          The Jurassic ranges from 200 million years to 145 million years ago.
        </TabPanel>
        <TabPanel id="cretaceous">
          The Cretaceous is the longest period of the Mesozoic, spanning from
          145 million to 66 million years ago.
        </TabPanel>
      </Tabs>
    );
  },
} satisfies Meta<typeof Tabs>;

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
