import {
	Button,
	ButtonLink,
	Divider,
	Focusable,
	Heading,
	Popover,
	PopoverBody,
	PreviewTrigger,
	Text,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

// A preview is the hover affordance this library does have: unlike a tooltip it
// also opens on long press, so a touch user can reach it, and its content may
// be interactive because the popover can be tabbed into.
const meta = {
	title: "Overlays/PreviewTrigger",
	component: PreviewTrigger,
	tags: ["autodocs"],
	argTypes: {
		delay: { control: { type: "number" } },
		closeDelay: { control: { type: "number" } },
	},
	parameters: {
		layout: "centered",
	},
	args: {
		children: (
			<>
				<ButtonLink href="#">Ahri</ButtonLink>
				<Popover>
					<PopoverBody>
						<Heading preset="h4" as="h3" style={{ marginBottom: "0.25rem" }}>
							Ahri
						</Heading>
						<Text>The Nine-Tailed Fox — Mage, Assassin.</Text>
					</PopoverBody>
				</Popover>
			</>
		),
	},
	render: (args) => <PreviewTrigger {...args} />,
} satisfies Meta<typeof PreviewTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

// The default 600ms warmup is deliberate: it keeps previews from flashing open
// as the pointer crosses a list of links. Shorten it only where the trigger is
// a single, deliberate target.
export const Instant: Story = { args: { delay: 0 } };

export const Interactive: Story = {
	name: "With interactive content",
	args: {
		children: (
			<>
				<ButtonLink href="#">Ahri</ButtonLink>
				<Popover style={{ width: 320 }}>
					<img
						alt=""
						src="https://i.imgur.com/xIe7Wlb.png"
						style={{ display: "block", width: "100%", height: "auto" }}
					/>
					<PopoverBody>
						<Heading preset="h4" as="h3" style={{ marginBottom: "0.25rem" }}>
							Ahri
						</Heading>
						<Text>
							The popover stays open while the pointer travels towards it, and
							Tab moves into it, so the buttons below are reachable.
						</Text>
					</PopoverBody>
					<Divider />
					<PopoverBody style={{ display: "flex", gap: "0.5rem" }}>
						<Button preset="primary" onPress={() => alert("added to team")}>
							Add to team
						</Button>
						<Button preset="dimmed" onPress={() => alert("opened build")}>
							Build
						</Button>
					</PopoverBody>
				</Popover>
			</>
		),
	},
};

// A trigger that is not already a React Aria component has to forward its ref
// and props to a DOM element, which `Focusable` does. It also has to be
// something a screen reader announces as actionable on its own — a real
// `<button>` here, rather than a span wearing `role="button"`.
export const CustomTrigger: Story = {
	name: "Custom trigger via Focusable",
	args: {
		children: (
			<>
				<Focusable>
					<button
						type="button"
						style={{
							appearance: "none",
							background: "none",
							border: 0,
							borderBottom: "1px dashed var(--lol-color-gold-400)",
							padding: 0,
							color: "var(--lol-color-gold-100)",
							cursor: "pointer",
							font: "inherit",
							fontFamily: "var(--lol-font-family-spiegel)",
						}}
					>
						Doran's Blade
					</button>
				</Focusable>
				<Popover style={{ width: 260 }}>
					<PopoverBody>
						<Heading preset="h5" as="h3" style={{ marginBottom: "0.25rem" }}>
							Doran's Blade
						</Heading>
						<Text>
							450 gold — 80 health, 10 attack damage, 3.5% life steal.
						</Text>
					</PopoverBody>
				</Popover>
			</>
		),
	},
};

// Previews coordinate with each other: once one is open, moving to a sibling
// trigger swaps the content without waiting out the warmup delay again.
export function SeveralTriggersInARow() {
	return (
		<div style={{ display: "flex", gap: "0.75rem" }}>
			{["Ahri", "Garen", "Lux"].map((champion) => (
				<PreviewTrigger key={champion}>
					<ButtonLink href="#">{champion}</ButtonLink>
					<Popover>
						<PopoverBody>
							<Heading preset="h5" as="h3" style={{ marginBottom: "0.25rem" }}>
								{champion}
							</Heading>
							<Text>Hover the next name — it opens without a new delay.</Text>
						</PopoverBody>
					</Popover>
				</PreviewTrigger>
			))}
		</div>
	);
}
