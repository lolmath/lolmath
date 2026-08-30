import {
	Button,
	DialogTrigger,
	Heading,
	Popover,
	PopoverBody,
	PreviewButton,
	PreviewTrigger,
	Text,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

// The trigger for a term inside running text — an item, a rune, a stat the
// reader may not know. It inherits the type of the sentence it sits in and
// marks itself with a dashed underline, so the prose still reads as prose,
// and it is a real button, so a keyboard or screen reader user has something
// to act on. The underline goes solid while the preview is open.
const meta = {
	title: "Buttons/PreviewButton",
	component: PreviewButton,
	tags: ["autodocs"],
	argTypes: {
		isDisabled: {
			defaultValue: false,
			description: "Is the button disabled?",
			type: { name: "boolean" },
		},
		onPress: {
			action: "onPress",
		},
	},
	args: {
		children: "Doran's Blade",
	},
	parameters: {
		layout: "centered",
	},
	// A `PreviewButton` on its own is only half of the affordance: it belongs to
	// the trigger that owns the popover, which is what gives it its open state.
	render: (args) => (
		<PreviewTrigger>
			<PreviewButton {...args} />
			<Popover style={{ width: 260 }}>
				<PopoverBody>
					<Heading preset="h5" as="h3" style={{ marginBottom: "0.25rem" }}>
						Doran's Blade
					</Heading>
					<Text>450 gold — 80 health, 10 attack damage, 3.5% life steal.</Text>
				</PopoverBody>
			</Popover>
		</PreviewTrigger>
	),
} satisfies Meta<typeof PreviewButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

// Nothing opens, and the term drops to the same grey as any other disabled
// control, so it stops reading as something to hover.
export const Disabled: Story = { args: { isDisabled: true } };

function ItemPreview({
	name,
	children,
}: {
	name: string;
	children: ReactNode;
}) {
	return (
		<PreviewTrigger>
			<PreviewButton>{name}</PreviewButton>
			<Popover style={{ width: 260 }}>
				<PopoverBody>
					<Heading preset="h5" as="h3" style={{ marginBottom: "0.25rem" }}>
						{name}
					</Heading>
					<Text>{children}</Text>
				</PopoverBody>
			</Popover>
		</PreviewTrigger>
	);
}

// What the component is for: the terms sit in the paragraph at its size and
// leading, wrap with it, and only the underline sets them apart.
export const InProse: Story = {
	name: "In a paragraph",
	parameters: { layout: "padded" },
	render: () => (
		<Text elementType="p" preset="md" style={{ maxWidth: "30rem" }}>
			Most bruisers open on{" "}
			<ItemPreview name="Doran's Blade">
				450 gold — 80 health, 10 attack damage, 3.5% life steal.
			</ItemPreview>{" "}
			or{" "}
			<ItemPreview name="Long Sword">350 gold — 10 attack damage.</ItemPreview>,
			which is enough sustain to hold the wave until the first back.
		</Text>
	),
};

// A term does not have to be embedded in a sentence: as the whole of a line —
// a build order, a table cell — it still takes the size of the type around it,
// so the underlines line up with each other and nothing grows the row.
export const SeveralTerms: Story = {
	name: "Several terms in a list",
	parameters: { layout: "padded" },
	render: () => (
		<Text elementType="ul" preset="base" style={{ lineHeight: 1.8 }}>
			<li>
				<ItemPreview name="Doran's Blade">
					450 gold — 80 health, 10 attack damage, 3.5% life steal.
				</ItemPreview>
			</li>
			<li>
				<ItemPreview name="Long Sword">
					350 gold — 10 attack damage.
				</ItemPreview>
			</li>
			<li>
				<ItemPreview name="Cloth Armor">300 gold — 15 armor.</ItemPreview>
			</li>
		</Text>
	),
};

// It is a real button, so it also triggers a toggle tip: the same term, opened
// on press instead of on hover, for a note that is worth a deliberate click.
// The underline goes solid here too — `aria-expanded` comes from whichever
// trigger owns the popover.
export const ToggleTip: Story = {
	name: "As a toggle tip trigger",
	render: () => (
		<Text elementType="p" preset="md" style={{ maxWidth: "30rem" }}>
			Damage is measured against{" "}
			<DialogTrigger>
				<PreviewButton>the average tank</PreviewButton>
				<Popover style={{ width: 280 }}>
					<PopoverBody>
						<Text>
							100 armor and 60 magic resistance at level 11 — the median of
							every tank in the patch, so the numbers compare across champions.
						</Text>
					</PopoverBody>
				</Popover>
			</DialogTrigger>
			, not against a dummy.
		</Text>
	),
};

// Unlike a tooltip's, the preview's content can be acted on: the popover stays
// open while the pointer travels towards it, and Tab moves into it. A term that
// should also *navigate* somewhere is a link rather than this — use
// `ButtonLink`, or the exported `previewButton` styles on a `Link`, since a
// preview is never the only way to reach content.
export const WithInteractiveContent: Story = {
	name: "With interactive content",
	render: () => (
		<PreviewTrigger>
			<PreviewButton>Doran's Blade</PreviewButton>
			<Popover style={{ width: 280 }}>
				<PopoverBody>
					<Heading preset="h5" as="h3" style={{ marginBottom: "0.25rem" }}>
						Doran's Blade
					</Heading>
					<Text>
						The popover stays open while the pointer travels towards it, and Tab
						moves into it, so the button below is reachable.
					</Text>
				</PopoverBody>
				<PopoverBody>
					<Button preset="primary" onPress={() => alert("added to build")}>
						Add to build
					</Button>
				</PopoverBody>
			</Popover>
		</PreviewTrigger>
	),
};
