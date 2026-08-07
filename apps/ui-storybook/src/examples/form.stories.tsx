import { parseDate, Time } from "@internationalized/date";
import {
	Button,
	ButtonLink,
	Checkbox,
	DateField,
	DatePicker,
	DateRangePicker,
	Label,
	MultipleSelect,
	NumberField,
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
	Switch,
	TextArea,
	TextField,
	TimeField,
	ToggleButton,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FaGear } from "react-icons/fa6";

const meta = {
	title: "Examples/Form",
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextfieldWithButton: Story = {
	render: () => {
		return (
			<div style={{ display: "flex", gap: "0.25rem" }}>
				<TextField />
				<Button>Submit</Button>
			</div>
		);
	},
};

export const EverythingOnOneLine: Story = {
	render: () => {
		return (
			<div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
				<TextField />
				<Button>Submit</Button>
				<MultipleSelect
					items={[
						{ id: "1", name: "Apple" },
						{ id: "2", name: "Banana" },
						{ id: "3", name: "Cherry" },
					]}
					selectId={(i) => i.id}
					selectLabel={(i) => i.name}
				/>
				<Select>
					<SelectButton>
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
				<NumberField />
				<SearchField />
				<ToggleButton>Toggle Me</ToggleButton>
				<ButtonLink href="#">Link</ButtonLink>
				<Button shape="square">
					<FaGear />
				</Button>
				<Button shape="round">
					<FaGear />
				</Button>
				<Checkbox>Remember me</Checkbox>
				<Switch>Notifications</Switch>
				<RadioGroup defaultValue="cats">
					<Label>Favorite pet</Label>
					<Radio value="cats">Cat</Radio>
					<Radio value="dogs">Dog</Radio>
				</RadioGroup>
				<Slider defaultValue={50} style={{ width: 150 }} />
				<TextArea />
				<DateField defaultValue={parseDate("2026-08-15")} />
				<TimeField defaultValue={new Time(14, 30)} />
				<DatePicker defaultValue={parseDate("2026-08-15")} />
				<DateRangePicker
					defaultValue={{
						start: parseDate("2026-08-10"),
						end: parseDate("2026-08-16"),
					}}
				/>
			</div>
		);
	},
};

export const Small: Story = {
	render: () => {
		return (
			<div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
				<TextField size="small" />
				<Button size="small">Submit</Button>
				<MultipleSelect
					items={[
						{ id: "1", name: "Apple" },
						{ id: "2", name: "Banana" },
						{ id: "3", name: "Cherry" },
					]}
					selectId={(i) => i.id}
					selectLabel={(i) => i.name}
					size="small"
				/>
				<Select>
					<SelectButton size="small">
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
				<NumberField size="small" />
				<SearchField size="small" />
				<ToggleButton size="small">Toggle Me</ToggleButton>
				<ButtonLink size="small" href="#">
					Link
				</ButtonLink>
				<Button size="small" shape="square">
					<FaGear />
				</Button>
				<Button size="small" shape="round">
					<FaGear />
				</Button>
				<Checkbox>Remember me</Checkbox>
				<Switch>Notifications</Switch>
				<RadioGroup defaultValue="cats">
					<Label>Favorite pet</Label>
					<Radio value="cats">Cat</Radio>
					<Radio value="dogs">Dog</Radio>
				</RadioGroup>
				<Slider defaultValue={50} style={{ width: 150 }} />
				<TextArea />
				<DateField size="small" defaultValue={parseDate("2026-08-15")} />
				<TimeField size="small" defaultValue={new Time(14, 30)} />
				<DatePicker size="small" defaultValue={parseDate("2026-08-15")} />
				<DateRangePicker
					size="small"
					defaultValue={{
						start: parseDate("2026-08-10"),
						end: parseDate("2026-08-16"),
					}}
				/>
			</div>
		);
	},
};

export const Medium: Story = {
	render: () => {
		return (
			<div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
				<TextField size="medium" />
				<Button size="medium">Submit</Button>
				<MultipleSelect
					items={[
						{ id: "1", name: "Apple" },
						{ id: "2", name: "Banana" },
						{ id: "3", name: "Cherry" },
					]}
					selectId={(i) => i.id}
					selectLabel={(i) => i.name}
					size="medium"
				/>
				<Select>
					<SelectButton size="medium">
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
				<NumberField size="medium" />
				<SearchField size="medium" />
				<ToggleButton size="medium">Toggle Me</ToggleButton>
				<ButtonLink size="medium" href="#">
					Link
				</ButtonLink>
				<Button size="medium" shape="square">
					<FaGear />
				</Button>
				<Button size="medium" shape="round">
					<FaGear />
				</Button>
				<Checkbox>Remember me</Checkbox>
				<Switch>Notifications</Switch>
				<RadioGroup defaultValue="cats">
					<Label>Favorite pet</Label>
					<Radio value="cats">Cat</Radio>
					<Radio value="dogs">Dog</Radio>
				</RadioGroup>
				<Slider defaultValue={50} style={{ width: 150 }} />
				<TextArea />
				<DateField size="medium" defaultValue={parseDate("2026-08-15")} />
				<TimeField size="medium" defaultValue={new Time(14, 30)} />
				<DatePicker size="medium" defaultValue={parseDate("2026-08-15")} />
				<DateRangePicker
					size="medium"
					defaultValue={{
						start: parseDate("2026-08-10"),
						end: parseDate("2026-08-16"),
					}}
				/>
			</div>
		);
	},
};

export const Large: Story = {
	render: () => {
		return (
			<div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
				<TextField size="large" />
				<Button size="large">Submit</Button>
				<MultipleSelect
					items={[
						{ id: "1", name: "Apple" },
						{ id: "2", name: "Banana" },
						{ id: "3", name: "Cherry" },
					]}
					selectId={(i) => i.id}
					selectLabel={(i) => i.name}
					size="large"
				/>
				<Select>
					<SelectButton size="large">
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
				<NumberField size="large" />
				<SearchField size="large" />
				<ToggleButton size="large">Toggle Me</ToggleButton>
				<ButtonLink size="large" href="#">
					Link
				</ButtonLink>
				<Button size="large" shape="square">
					<FaGear />
				</Button>
				<Button size="large" shape="round">
					<FaGear />
				</Button>
				<Checkbox>Remember me</Checkbox>
				<Switch>Notifications</Switch>
				<RadioGroup defaultValue="cats">
					<Label>Favorite pet</Label>
					<Radio value="cats">Cat</Radio>
					<Radio value="dogs">Dog</Radio>
				</RadioGroup>
				<Slider defaultValue={50} style={{ width: 150 }} />
				<TextArea />
				<DateField size="large" defaultValue={parseDate("2026-08-15")} />
				<TimeField size="large" defaultValue={new Time(14, 30)} />
				<DatePicker size="large" defaultValue={parseDate("2026-08-15")} />
				<DateRangePicker
					size="large"
					defaultValue={{
						start: parseDate("2026-08-10"),
						end: parseDate("2026-08-16"),
					}}
				/>
			</div>
		);
	},
};
