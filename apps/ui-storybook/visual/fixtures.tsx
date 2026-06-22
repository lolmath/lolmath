import {
	Breadcrumb,
	Breadcrumbs,
	ButtonLink,
	Checkbox,
	Disclosure,
	DisclosureButton,
	DisclosureGroup,
	DisclosurePanel,
	Divider,
	Heading,
	Label,
	NumberField,
	ProgressBar,
	Radio,
	RadioGroup,
	SearchField,
	Select,
	SelectButton,
	SelectListBox,
	SelectListBoxItem,
	SelectPopover,
	SelectValue,
	Slider,
	SliderOutput,
	Spinner,
	Switch,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	TagGroup,
	TagList,
	Text,
	TextArea,
	TextField,
	ToggleButton,
} from "@lolmath/ui";
import type { CSSProperties, ReactNode } from "react";

export interface Fixture {
	id: string;
	node: ReactNode;
	style?: CSSProperties;
}

const wide: CSSProperties = { width: 260 };

/**
 * Registry of components -> fixtures for visual regression. Each fixture id is
 * unique across the whole registry. The harness renders one component's
 * fixtures per page (via ?component=); the spec iterates this map.
 */
export const fixtures: Record<string, Fixture[]> = {
	breadcrumbs: [
		{
			id: "breadcrumbs-default",
			node: (
				<Breadcrumbs style={wide}>
					<Breadcrumb href="#">Home</Breadcrumb>
					<Breadcrumb href="#">React Aria</Breadcrumb>
					<Breadcrumb>Breadcrumbs</Breadcrumb>
				</Breadcrumbs>
			),
		},
	],
	"button-link": [
		{
			id: "button-link-secondary",
			node: <ButtonLink href="#">Secondary</ButtonLink>,
		},
		{
			id: "button-link-dimmed",
			node: (
				<ButtonLink preset="dimmed" href="#">
					Dimmed
				</ButtonLink>
			),
		},
		{
			id: "button-link-disabled",
			node: (
				<ButtonLink isDisabled href="#">
					Disabled
				</ButtonLink>
			),
		},
	],
	checkbox: [
		{ id: "checkbox-default", node: <Checkbox>Enable Low Spec Mode</Checkbox> },
		{
			id: "checkbox-selected",
			node: <Checkbox defaultSelected>Enable Low Spec Mode</Checkbox>,
		},
		{
			id: "checkbox-indeterminate",
			node: <Checkbox isIndeterminate>Enable Low Spec Mode</Checkbox>,
		},
		{
			id: "checkbox-disabled",
			node: (
				<Checkbox isDisabled defaultSelected>
					Enable Low Spec Mode
				</Checkbox>
			),
		},
	],
	disclosure: [
		{
			id: "disclosure-collapsed",
			node: (
				<DisclosureGroup style={wide}>
					<Disclosure id="a">
						<DisclosureButton>Title A</DisclosureButton>
						<DisclosurePanel>
							<Text>Hidden content.</Text>
						</DisclosurePanel>
					</Disclosure>
				</DisclosureGroup>
			),
		},
		{
			id: "disclosure-expanded",
			node: (
				<DisclosureGroup defaultExpandedKeys={["a"]} style={wide}>
					<Disclosure id="a">
						<DisclosureButton>Title A</DisclosureButton>
						<DisclosurePanel>
							<Text>Visible content.</Text>
						</DisclosurePanel>
					</Disclosure>
				</DisclosureGroup>
			),
		},
	],
	divider: [
		{ id: "divider-center", node: <Divider style={wide} /> },
		{ id: "divider-left", node: <Divider preset="left" style={wide} /> },
		{ id: "divider-right", node: <Divider preset="right" style={wide} /> },
		{
			id: "divider-with-children",
			node: (
				<Divider style={wide}>
					<Heading preset="h4">Section</Heading>
				</Divider>
			),
		},
	],
	"number-field": [
		{
			id: "number-field-default",
			node: (
				<NumberField defaultValue={0} style={wide}>
					<Label>Amount</Label>
				</NumberField>
			),
		},
		{
			id: "number-field-disabled",
			node: (
				<NumberField defaultValue={0} isDisabled style={wide}>
					<Label>Amount</Label>
				</NumberField>
			),
		},
	],
	"progress-bar": [
		{ id: "progress-bar-empty", node: <ProgressBar value={0} style={wide} /> },
		{
			id: "progress-bar-partial",
			node: <ProgressBar value={30} style={wide} />,
		},
		{ id: "progress-bar-full", node: <ProgressBar value={100} style={wide} /> },
	],
	"radio-group": [
		{
			id: "radio-group-default",
			node: (
				<RadioGroup defaultValue="cat" style={wide}>
					<Label>Favorite pet</Label>
					<Radio value="cat">Cat</Radio>
					<Radio value="dog">Dog</Radio>
				</RadioGroup>
			),
		},
		{
			id: "radio-group-disabled",
			node: (
				<RadioGroup defaultValue="cat" isDisabled style={wide}>
					<Label>Favorite pet</Label>
					<Radio value="cat">Cat</Radio>
					<Radio value="dog">Dog</Radio>
				</RadioGroup>
			),
		},
	],
	"search-field": [
		{
			id: "search-field-default",
			node: (
				<SearchField defaultValue="" style={wide}>
					<Label>Search</Label>
				</SearchField>
			),
		},
		{
			id: "search-field-disabled",
			node: (
				<SearchField defaultValue="" isDisabled style={wide}>
					<Label>Search</Label>
				</SearchField>
			),
		},
	],
	select: [
		{
			id: "select-default",
			node: (
				<Select style={wide}>
					<SelectButton>
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
							<SelectListBoxItem>Panda</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
			),
		},
		{
			id: "select-disabled",
			node: (
				<Select isDisabled style={wide}>
					<SelectButton>
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
			),
		},
	],
	slider: [
		{
			id: "slider-single",
			node: (
				<Slider defaultValue={50} style={wide}>
					<Label>Volume</Label>
					<SliderOutput />
				</Slider>
			),
		},
		{
			id: "slider-range",
			node: (
				<Slider defaultValue={[20, 80]} style={wide}>
					<Label>Range</Label>
					<SliderOutput />
				</Slider>
			),
		},
	],
	spinner: [{ id: "spinner-default", node: <Spinner /> }],
	switch: [
		{ id: "switch-off", node: <Switch>Low Power Mode</Switch> },
		{
			id: "switch-on",
			node: <Switch defaultSelected>Low Power Mode</Switch>,
		},
		{
			id: "switch-disabled",
			node: (
				<Switch isDisabled defaultSelected>
					Low Power Mode
				</Switch>
			),
		},
	],
	tabs: [
		{
			id: "tabs-default",
			node: (
				<Tabs defaultSelectedKey="triassic" style={wide}>
					<TabList aria-label="Periods">
						<Tab id="triassic">Triassic</Tab>
						<Tab id="jurassic">Jurassic</Tab>
						<Tab id="cretaceous">Cretaceous</Tab>
					</TabList>
					<TabPanel id="triassic">
						<Text>Triassic content.</Text>
					</TabPanel>
				</Tabs>
			),
		},
	],
	"tag-group": [
		{
			id: "tag-group-hextech",
			node: (
				<TagGroup aria-label="Champions" selectionMode="multiple">
					<TagList
						items={[
							{ id: 1, name: "Aatrox" },
							{ id: 2, name: "Braum" },
							{ id: 3, name: "Caitlyn" },
						]}
						selectLabel={(item: { name: string }) => item.name}
						variant="hextech"
					/>
				</TagGroup>
			),
		},
		{
			id: "tag-group-gold",
			node: (
				<TagGroup aria-label="Champions" selectionMode="multiple">
					<TagList
						items={[
							{ id: 1, name: "Aatrox" },
							{ id: 2, name: "Braum" },
						]}
						selectLabel={(item: { name: string }) => item.name}
						variant="gold"
					/>
				</TagGroup>
			),
		},
	],
	"text-area": [
		{
			id: "text-area-default",
			node: (
				<TextArea defaultValue="The quick brown fox." style={wide}>
					<Label>Notes</Label>
				</TextArea>
			),
		},
		{
			id: "text-area-disabled",
			node: (
				<TextArea defaultValue="The quick brown fox." isDisabled style={wide}>
					<Label>Notes</Label>
				</TextArea>
			),
		},
	],
	"text-field": [
		{
			id: "text-field-default",
			node: (
				<TextField defaultValue="The quick brown fox." style={wide}>
					<Label>Name</Label>
				</TextField>
			),
		},
		{
			id: "text-field-disabled",
			node: (
				<TextField defaultValue="The quick brown fox." isDisabled style={wide}>
					<Label>Name</Label>
				</TextField>
			),
		},
	],
	"toggle-button": [
		{
			id: "toggle-button-off",
			node: <ToggleButton>Toggle</ToggleButton>,
		},
		{
			id: "toggle-button-on",
			node: <ToggleButton defaultSelected>Toggle</ToggleButton>,
		},
		{
			id: "toggle-button-disabled",
			node: (
				<ToggleButton isDisabled defaultSelected>
					Toggle
				</ToggleButton>
			),
		},
	],
};

export const componentNames = Object.keys(fixtures);
