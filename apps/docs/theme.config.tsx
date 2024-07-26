import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
	logo: (
		<div className="flex gap-2">
			<img src="/img/logo.svg" className="w-6" />
			<span className="uppercase font-beaufort font-medium">lolmath docs</span>
		</div>
	),
	project: {
		link: "https://gitlab.com/lol-math/lolmath",
		icon: (
			<svg width="24" height="24" viewBox="0 0 256 256">
				<path
					fill="currentColor"
					d="m231.9 169.8l-94.8 65.6a15.7 15.7 0 0 1-18.2 0l-94.8-65.6a16.1 16.1 0 0 1-6.4-17.3L45 50a12 12 0 0 1 22.9-1.1L88.5 104h79l20.6-55.1A12 12 0 0 1 211 50l27.3 102.5a16.1 16.1 0 0 1-6.4 17.3Z"
				></path>
			</svg>
		),
	},
	useNextSeoProps() {
		return {
			titleTemplate: "%s – lolmath docs",
		};
	},
	head: (
		<>
			{/* favicon */}
			<link rel="icon" href="/img/logo.png" />
		</>
	),
	primaryHue: 41,
	feedback: {
		content: null,
	},
	editLink: {
		text: null,
	},
	footer: {
		text: (
			<span>
				© {new Date().getFullYear()}{" "}
				<a href="https://lolmath.net" target="_blank" rel="noreferrer">
					lolmath
				</a>
			</span>
		),
	},
};

export default config;
