"use client";
import { ButtonLink, Heading, Text } from "@lolmath/ui";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default function HomePage() {
	return (
		<HomeLayout {...baseOptions()}>
			<div className="flex flex-col items-center justify-center gap-16 p-4 md:h-screen bg-lol-hextech-black">
				<Heading as="h1" preset="h2">
					League of Legends Math Docs
				</Heading>
				<div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
					<div className="border-lol-grey-200 hover:border-lol-gold-500 hover:bg-lol-blue-700 flex flex-col items-start gap-4 border bg-lol-hextech-black p-8">
						<Heading preset="h4" as="h2" color="gold200">
							Calc
						</Heading>
						<Text>League of Legends math and theorycrafting tools.</Text>
						<ButtonLink className="mt-auto" href="/calc">
							Docs
						</ButtonLink>
					</div>
					<div className="border-lol-grey-200 hover:border-lol-gold-500 hover:bg-lol-blue-700 flex flex-col items-start gap-4 border bg-lol-hextech-black p-8">
						<Heading preset="h4" as="h2" color="gold200">
							DDragon
						</Heading>
						<Text>DDragon (Data Dragon) API npm package</Text>
						<ButtonLink className="mt-auto" href="/ddragon">
							Docs
						</ButtonLink>
					</div>
					<div className="border-lol-grey-200 hover:border-lol-gold-500 hover:bg-lol-blue-700 flex flex-col items-start gap-4 border bg-lol-hextech-black p-8">
						<Heading preset="h4" as="h2" color="gold200">
							UI
						</Heading>
						<Text>
							A React Component Library with League of Legends-inspired design.
							Based on React Aria Components.
						</Text>
						<div className="space-x-2">
							<ButtonLink href="/ui">Docs</ButtonLink>
							<ButtonLink
								className="mt-auto"
								href="https://ui.lolmath.net/"
								preset="hextech"
							>
								Storybook
							</ButtonLink>
						</div>
					</div>
				</div>
			</div>
		</HomeLayout>
	);
}
