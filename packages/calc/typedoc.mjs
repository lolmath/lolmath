import { writeFileSync } from "node:fs";
import { MarkdownPageEvent } from "typedoc-plugin-markdown";

/** @type {import("typedoc").TypeDocOptions} */
const config = {
	entryPoints: ["./src/*/index.ts"],
	out: "./docs",
	plugin: [
		"typedoc-plugin-markdown",
		"typedoc-plugin-frontmatter",
		// FrontMatter
		(app) => {
			app.renderer.on(
				MarkdownPageEvent.BEGIN,
				/** @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page */
				(page) => {
					if (page.model?.name) {
						page.frontmatter.title = page.model.name;
					}
				},
			);
		},
		// Sidebar
		(app) => {
			app.renderer.postRenderAsyncJobs.push(async (_renderer) => {
				const outDir = app.options.getValue("out");
				writeFileSync(
					`${outDir}/meta.json`,
					JSON.stringify({
						title: "@lolmath/calc",
						root: true,
					}),
				);
			});
		},
	],
	mergeReadme: true,
	hidePageHeader: true,
	hideBreadcrumbs: true,
	hidePageTitle: true,
	hideGroupHeadings: true,
	useCodeBlocks: true,
	disableSources: false,
	parametersFormat: "table",
	typeAliasPropertiesFormat: "table",
	enumMembersFormat: "table",
	propertyMembersFormat: "table",
	typeDeclarationFormat: "table",
	pageTitleTemplates: {
		member: "`{rawName}`",
	},
	entryFileName: "index",
	defaultCategory: "Other",
	router: "module",
	gitRevision: "main",
	publicPath: "./",
};

export default config;
