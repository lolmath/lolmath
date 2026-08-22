import { ChartFrame, ChartLegend } from "@lolmath/ui/charts";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Charts/Building Blocks/ChartFrame",
	component: ChartFrame,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"The panel a chart sits in: a gold hairline drawn into the border " +
					"box, four diamond corners, a Beaufort title and a rule under it. " +
					"Reach for it directly when you are building a chart of your own " +
					"and want it to sit alongside the rest.",
			},
		},
	},
	argTypes: {
		preset: { control: "inline-radio", options: ["framed", "bare"] },
	},
	args: {
		title: "Objective control",
		subtitle: "Ranked solo queue · patch 14.7",
		children: (
			<div
				style={{
					height: "10rem",
					display: "grid",
					placeItems: "center",
					color: "#a09b8c",
				}}
			>
				Anything can go here.
			</div>
		),
	},
	render: (args) => (
		<div style={{ maxWidth: "34rem" }}>
			<ChartFrame {...args} />
		</div>
	),
} satisfies Meta<typeof ChartFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitleOnly: Story = {
	args: { subtitle: undefined },
};

export const WithoutHeader: Story = {
	args: { title: undefined, subtitle: undefined },
};

export const Bare: Story = {
	args: { preset: "bare" },
};

export const WithFooter: Story = {
	args: {
		footer: (
			<ChartLegend
				items={[
					{
						key: "blue",
						label: "Blue side",
						color: "var(--lol-chart-series-1)",
					},
					{ key: "red", label: "Red side", color: "var(--lol-chart-series-4)" },
				]}
			/>
		),
	},
};
