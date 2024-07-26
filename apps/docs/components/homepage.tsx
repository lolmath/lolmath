import { Button } from "@lolmath/ui";
import Link from "next/link";
import React from "react";

export default function HomepageFeatures(): JSX.Element {
	return (
		<div className="to-lol-grey-900 flex flex-col items-center justify-center gap-16 bg-black bg-gradient-to-tr from-black p-4 md:h-screen">
			<div className="font-beaufort text-lol-gold-100 text-3xl font-bold uppercase">
				League of Legends Math Docs
			</div>
			<div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
				<div className="border-lol-gold-700 hover:border-lol-gold-500 hover:bg-lol-blue-950 flex flex-col items-start gap-8 border bg-black p-8 pt-7">
					<h1 className="font-beaufort text-lol-gold-200 text-2xl font-bold uppercase">
						Calc
					</h1>
					<p className="font-spiegel text-lol-gold-50">
						League of Legends math and theorycrafting tools.
					</p>
					<Link className="mt-auto" href="/calc">
						<Button>Docs</Button>
					</Link>
				</div>
				<div className="border-lol-gold-700 hover:border-lol-gold-500 hover:bg-lol-blue-950 flex flex-col items-start gap-8 border bg-black p-8 pt-7">
					<h1 className="font-beaufort text-lol-gold-200 text-2xl font-bold uppercase">
						UI
					</h1>
					<p className="font-spiegel text-lol-gold-50">
						A React Component Library with League of Legends-inspired design.
						Based on Tailwind CSS and React Aria Components.
					</p>
					<div className="space-x-2">
						<Button isDisabled>Docs</Button>
						<a className="mt-auto" href="https://ui.lolmath.net/">
							<Button>Storybook</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
