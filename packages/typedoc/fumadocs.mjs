import { writeFileSync } from "node:fs";

/**
 * Plugin to add front matter title to Markdown pages.
 * @param {string} title - The title to add to the front matter.
 */
export default function pluginFumaDocsSidebar(title) {
	/**
	 * @param {import('typedoc').Application} app - The TypeDoc application instance.
	 */
	return (app) => {
		app.renderer.postRenderAsyncJobs.push(async (_renderer) => {
			const outDir = app.options.getValue("out");
			writeFileSync(
				`${outDir}/meta.json`,
				JSON.stringify({
					title,
					root: true,
				}),
			);
		});
	};
}
