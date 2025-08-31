import { load as pluginFrontmatter } from "typedoc-plugin-frontmatter";
import { load as pluginMarkdown } from "typedoc-plugin-markdown";
import { pluginFrontMatterTitle } from "./frontmatter.mjs";

/** @type {import("typedoc").TypeDocOptions} */
const config = {
	entryPoints: ["./src/index.ts"],
	out: "./docs",
	plugin: [pluginMarkdown, pluginFrontmatter, pluginFrontMatterTitle],
	mergeReadme: true,
	hidePageHeader: true,
	hideBreadcrumbs: true,
	hidePageTitle: true,
	hideGroupHeadings: false,
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
