import { Button, Sonner, type SonnerProps, sonner } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

function C({ title, ...rest }: { title: string; type?: string } & SonnerProps) {
	const handleClick = () => {
		sonner(title, rest);
	};

	return <Button onClick={handleClick}>Show Sonner</Button>;
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Sonner",
	component: C,
	tags: ["autodocs"],
	argTypes: {
		title: {
			control: "text",
			description: "The title of the sonner",
			defaultValue: "Default Sonner",
		},
		description: {
			control: "text",
			description: "The description of the sonner",
			defaultValue: "This is a default sonner",
		},
		type: {
			control: "select",
			options: [
				"normal",
				"action",
				"success",
				"info",
				"warning",
				"error",
				"loading",
				"default",
			],
			description: "The type of the sonner",
			defaultValue: "normal",
		},
		duration: {
			control: "number",
			description: "Duration in milliseconds before the sonner disappears",
			defaultValue: 5000,
		},
		position: {
			control: "select",
			options: ["top-right", "top-left", "bottom-right", "bottom-left"],
			description: "Position of the sonner on the screen",
			defaultValue: "top-right",
		},
		closeButton: {
			control: "boolean",
			description: "Whether to show a close button on the sonner",
			defaultValue: false,
		},
		action: {
			control: false,
			description:
				"An action button that can be clicked to perform an action related to the sonner.",
		},
	},
	decorators: [
		(Story) => (
			<>
				<Sonner />
				<div className="h-80 grid place-items-center">
					<Story />
				</div>
			</>
		),
	],
} satisfies Meta<typeof C>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Default Sonner",
	},
};

export const WithAction: Story = {
	args: {
		title: "Sonner with Action",
		description: "This sonner includes an action button",
		action: {
			label: "Undo",
			onClick: () => console.log("Action clicked"),
		},
	},
};

export const WithSuccessIcon: Story = {
	args: {
		title: "Sonner with Success Icon",
		description: "This sonner includes an icon",
		type: "success",
	},
};
export const WithWarningIcon: Story = {
	args: {
		title: "Sonner with Warning Icon",
		description: "This sonner includes an icon",
		type: "warning",
	},
};
export const WithErrorIcon: Story = {
	args: {
		title: "Sonner with Error Icon",
		description: "This sonner includes an icon",
		type: "error",
	},
};
export const WithInfoIcon: Story = {
	args: {
		title: "Sonner with Info Icon",
		description: "This sonner includes an icon",
		type: "info",
	},
};
export const WithPromise: Story = {
	args: {
		title: "Sonner with Promise",
		description: "This sonner will resolve after 2 seconds",
	},
	render: ({ title, ...rest }) => {
		return (
			<Button
				onPress={() => {
					const myPromise = new Promise<{ name: string }>((resolve) => {
						setTimeout(() => {
							resolve({ name: "My toast" });
						}, 3000);
					});

					sonner.promise(myPromise, {
						loading: "Loading...",
						success: (data: { name: string }) => {
							return `${data.name} toast has been added`;
						},
						error: "Error",
					});
				}}
			>
				Show Sonner
			</Button>
		);
	},
};

export const WithLoading: Story = {
	args: {
		title: "Sonner with Loading",
		description: "This sonner indicates a loading state",
		type: "loading",
	},
};

export const WithClose: Story = {
	args: {
		title: "Sonner with Close",
		description: "This sonner can be closed manually",
		closeButton: true,
	},
};

export const WithTopRightPosition: Story = {
	args: {
		title: "Sonner with Top Right Position",
		description: "This sonner appears in the top right corner",
		position: "top-right",
	},
};

export const WithInfiniteDuration: Story = {
	args: {
		title: "Sonner with Infinite Duration",
		description: "This sonner will not disappear automatically",
		duration: Number.POSITIVE_INFINITY,
		closeButton: true,
	},
};
