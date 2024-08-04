import { Heading, Text, ButtonLink } from "@lolmath/ui";
import React from "react";

export function Homepage(): JSX.Element {
	return (
		<div className="flex flex-col items-center justify-center gap-16 p-4 md:h-screen bg-lol-grey-hextech-black">
			<Heading as="h1" preset="h2">
				League of Legends Math Docs
			</Heading>
			<div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
				<div className="border-lol-grey-200 hover:border-lol-gold-500 hover:bg-lol-blue-700 flex flex-col items-start gap-4 border bg-lol-grey-hextech-black p-8 pt-7">
					<Heading preset="h4" as="h2" color="gold200">
						Calc
					</Heading>
					<Text>League of Legends math and theorycrafting tools.</Text>
					<ButtonLink className="mt-auto" href="/calc">
						Docs
					</ButtonLink>
				</div>
				<div className="border-lol-grey-200 hover:border-lol-gold-500 hover:bg-lol-blue-700 flex flex-col items-start gap-4 border bg-lol-grey-hextech-black p-8 pt-7">
					<Heading preset="h4" as="h2" color="gold200">
						UI
					</Heading>
					<Text>
						A React Component Library with League of Legends-inspired design.
						Based on React Aria Components.
					</Text>
					<div className="space-x-2">
						<ButtonLink isDisabled>Docs</ButtonLink>
						<ButtonLink className="mt-auto" href="https://ui.lolmath.net/">
							Storybook
						</ButtonLink>
					</div>
				</div>
			</div>
		</div>
	);
}
