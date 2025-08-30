import { join } from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
	root: join(__dirname, "src/pages"),
	logo: "/img/logo.svg",
	globalStyles: join(__dirname, "src/styles/global.css"),
	title: "lolmath docs",
	description: "Documentation for lolmath",
	themeConfig: {
		socialLinks: [
			{
				icon: "gitlab",
				mode: "link",
				content: "https://gitlab.com/lol-math/lolmath",
			},
		],
	},
	outDir: "dist",
	icon: "/img/logo.png",
	markdown: {
		checkDeadLinks: true,
	},
	builderConfig: {
		tools: {
			rspack: {
				resolve: {
					symlinks: true,
				}
			}
		}
	}
	
});
