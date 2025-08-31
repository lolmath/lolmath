import lolmathConfig from "@lolmath/typedoc";
import pluginFumaDocsSidebar from "@lolmath/typedoc/fumadocs";

/** @type {import("typedoc").TypeDocOptions} */
const config = {
	...lolmathConfig,
	entryPoints: ["./src/*/index.ts"],
	plugin: [...lolmathConfig.plugin, pluginFumaDocsSidebar("@lolmath/calc")],
};

export default config;
