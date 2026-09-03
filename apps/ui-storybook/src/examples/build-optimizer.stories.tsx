import {
	Button,
	Divider,
	Heading,
	Label,
	NumberField,
	ProgressBar,
	Select,
	SelectButton,
	SelectListBox,
	SelectListBoxItem,
	SelectPopover,
	SelectValue,
	Slider,
	SliderOutput,
	Switch,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	TagGroup,
	TagList,
	Text,
	ToggleButton,
	ToggleButtonGroup,
	VerticalTable,
	type VerticalTableField,
} from "@lolmath/ui";
import { LineChart, RankingChart } from "@lolmath/ui/charts";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";

const meta = {
	title: "Examples/Templates/Build optimizer",
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"The product screen: a column of controls against a column of " +
					"read-outs. Every control is a library component and the two " +
					"charts come from `@lolmath/ui/charts`, so the only thing the " +
					"template adds is the grid holding them.",
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface LevelDamage {
	level: number;
	build: number;
	baseline: number;
}

const damageByLevel: LevelDamage[] = [
	{ level: 1, build: 62, baseline: 58 },
	{ level: 3, build: 148, baseline: 132 },
	{ level: 5, build: 264, baseline: 221 },
	{ level: 7, build: 402, baseline: 318 },
	{ level: 9, build: 571, baseline: 430 },
	{ level: 11, build: 782, baseline: 549 },
	{ level: 13, build: 1024, baseline: 671 },
	{ level: 15, build: 1298, baseline: 796 },
	{ level: 17, build: 1602, baseline: 921 },
	{ level: 18, build: 1764, baseline: 984 },
];

interface AbilityDamage {
	ability: string;
	damage: number;
}

const abilityDamage: AbilityDamage[] = [
	{ ability: "R — Massacre", damage: 742 },
	{ ability: "Q — The Darkin Blade", damage: 486 },
	{ ability: "W — Infernal Chains", damage: 214 },
	{ ability: "Auto attack", damage: 187 },
	{ ability: "E — Umbral Dash", damage: 0 },
];

interface Item {
	id: string;
	name: string;
}

const startingItems: Item[] = [
	{ id: "goredrinker", name: "Goredrinker" },
	{ id: "sterak", name: "Sterak's Gage" },
	{ id: "deaths-dance", name: "Death's Dance" },
	{ id: "plated", name: "Plated Steelcaps" },
];

interface Comparison {
	id: string;
	build: string;
	burst: number;
	dps: number;
	cost: number;
}

const comparisons: Comparison[] = [
	{ id: "current", build: "Current", burst: 1764, dps: 612, cost: 11400 },
	{ id: "bruiser", build: "Bruiser", burst: 1508, dps: 704, cost: 10900 },
	{ id: "lethality", build: "Lethality", burst: 2016, dps: 498, cost: 12100 },
];

const comparisonFields: VerticalTableField<Comparison>[] = [
	{ id: "burst", name: "Burst", value: (row) => row.burst.toLocaleString() },
	{ id: "dps", name: "DPS", value: (row) => row.dps.toLocaleString() },
	{
		id: "cost",
		name: "Gold",
		value: (row) => `${(row.cost / 1000).toFixed(1)}k`,
	},
];

const surface: CSSProperties = {
	background: "var(--lol-gradient-hextech-black)",
	color: "var(--lol-color-grey-100)",
	fontFamily: "var(--lol-font-family-spiegel)",
};

const rule = "1px solid var(--lol-color-gold-600)";

const panel: CSSProperties = {
	border: rule,
	background: "var(--lol-color-grey-300)",
	padding: "1rem",
};

const field: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "0.375rem",
};

/** A number worth reading from across the room, with its name under it. */
function Stat({ label, value }: { label: string; value: ReactNode }) {
	return (
		<div style={{ ...panel, flex: 1, minWidth: "8rem" }}>
			<Text color="gold100" elementType="div" preset="stat">
				{value}
			</Text>
			<Text color="grey150" elementType="div" preset="sm">
				{label}
			</Text>
		</div>
	);
}

export const BuildOptimizer: Story = {
	render: () => {
		const [items, setItems] = useState(startingItems);

		return (
			<div style={{ ...surface, minHeight: "100vh" }}>
				<header
					style={{
						display: "flex",
						alignItems: "center",
						gap: "1rem",
						padding: "0 1.5rem",
						height: "3.5rem",
						borderBottom: rule,
					}}
				>
					<Heading as="h1" preset="h5" style={{ whiteSpace: "nowrap" }}>
						Aatrox · Top
					</Heading>
					<Text color="grey150" preset="sm">
						Patch 14.18
					</Text>
					<div
						style={{
							display: "flex",
							gap: "0.5rem",
							marginInlineStart: "auto",
						}}
					>
						<Button preset="dimmed">Reset</Button>
						<Button preset="primary">Save build</Button>
					</div>
				</header>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "19rem minmax(0, 1fr)",
						alignItems: "start",
						gap: "1.5rem",
						padding: "1.5rem",
					}}
				>
					{/* Controls */}
					<form
						style={{ ...panel, display: "grid", gap: "1.25rem" }}
						onSubmit={(event) => event.preventDefault()}
					>
						<Heading as="h2" preset="h5">
							Setup
						</Heading>

						<div style={field}>
							<Label>Champion</Label>
							<Select defaultSelectedKey="aatrox">
								<SelectButton>
									<SelectValue />
								</SelectButton>
								<SelectPopover>
									<SelectListBox>
										<SelectListBoxItem id="aatrox">Aatrox</SelectListBoxItem>
										<SelectListBoxItem id="camille">Camille</SelectListBoxItem>
										<SelectListBoxItem id="darius">Darius</SelectListBoxItem>
										<SelectListBoxItem id="sett">Sett</SelectListBoxItem>
									</SelectListBox>
								</SelectPopover>
							</Select>
						</div>

						<div style={field}>
							<Label>Level</Label>
							<NumberField defaultValue={18} maxValue={18} minValue={1} />
						</div>

						<div style={field}>
							<Label id="target-label">Target</Label>
							<ToggleButtonGroup
								aria-labelledby="target-label"
								defaultSelectedKeys={["squishy"]}
								selectionMode="single"
							>
								<ToggleButton id="squishy">Squishy</ToggleButton>
								<ToggleButton id="bruiser">Bruiser</ToggleButton>
								<ToggleButton id="tank">Tank</ToggleButton>
							</ToggleButtonGroup>
						</div>

						<Slider defaultValue={140} maxValue={400} minValue={0}>
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<Label>Target armour</Label>
								<SliderOutput />
							</div>
						</Slider>

						<Switch defaultSelected>Include runes</Switch>

						<Divider />

						<div style={field}>
							<Label id="items-label">Items</Label>
							<TagGroup
								aria-labelledby="items-label"
								onRemove={(keys) =>
									setItems((previous) =>
										previous.filter((item) => !keys.has(item.id)),
									)
								}
							>
								<TagList items={items} selectLabel={(item) => item.name} />
							</TagGroup>
							{items.length < 4 && (
								<Button
									onPress={() => setItems(startingItems)}
									preset="dimmed"
									style={{ justifySelf: "start" }}
								>
									Restore removed items
								</Button>
							)}
						</div>

						<ProgressBar label="Simulating 10,000 fights" value={72} />
					</form>

					{/* Read-outs */}
					<Tabs>
						<TabList aria-label="Build results">
							<Tab id="damage">Damage</Tab>
							<Tab id="compare">Compare</Tab>
							<Tab id="notes">Notes</Tab>
						</TabList>

						<TabPanel id="damage" style={{ paddingTop: "1rem" }}>
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: "0.75rem",
									marginBottom: "1rem",
								}}
							>
								<Stat label="Burst at 18" value="1,764" />
								<Stat label="Sustained DPS" value="612" />
								<Stat label="Gold spent" value="11.4k" />
								<Stat label="Damage per gold" value="0.15" />
							</div>

							<div
								style={{
									display: "grid",
									gap: "1rem",
									gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
								}}
							>
								<LineChart
									data={damageByLevel}
									formatY={(damage) => damage.toLocaleString()}
									series={[
										{
											key: "build",
											label: "This build",
											value: (row) => row.build,
										},
										{
											key: "baseline",
											label: "No items",
											value: (row) => row.baseline,
										},
									]}
									subtitle="Full combo against the selected target"
									title="Damage by level"
									x={(row) => row.level}
									xLabel="Level"
									yLabel="Damage"
								/>
								<RankingChart
									data={abilityDamage}
									formatValue={(damage) => damage.toLocaleString()}
									label={(row) => row.ability}
									subtitle="One rotation at level 18"
									title="Where the damage comes from"
									value={(row) => row.damage}
									valueLabel="Damage"
								/>
							</div>
						</TabPanel>

						<TabPanel id="compare" style={{ paddingTop: "1rem" }}>
							<div style={panel}>
								<VerticalTable
									align="end"
									aria-label="Builds compared"
									fields={comparisonFields}
									recordHeader={(row) => row.build}
									recordKey={(row) => row.id}
									records={comparisons}
								/>
							</div>
						</TabPanel>

						<TabPanel id="notes" style={{ paddingTop: "1rem" }}>
							<div style={{ ...panel, maxWidth: "38rem" }}>
								<Text elementType="p">
									Lethality wins the burst column and loses the sustained one,
									which is the trade the whole page exists to show: pick the
									column that matches the fight you expect, not the bigger
									number.
								</Text>
							</div>
						</TabPanel>
					</Tabs>
				</div>
			</div>
		);
	},
};
