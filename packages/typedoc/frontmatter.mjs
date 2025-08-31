import { MarkdownPageEvent } from "typedoc-plugin-markdown";
/**
 * Plugin to add front matter title to Markdown pages.
 * @param {import('typedoc').Application} app - The TypeDoc application instance.
 */
export function pluginFrontMatterTitle(app) {
	app.renderer.on(
		MarkdownPageEvent.BEGIN,
		/** @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page */
		(page) => {
			if (page.model?.name) {
				page.frontmatter.title = page.model.name;
			}
		},
	);
}
