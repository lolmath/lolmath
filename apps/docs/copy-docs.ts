import path from "node:path";
import fs from "fs-extra";
import resolvePackagePath from "resolve-package-path";

const directories = [
	{
		name: "calc",
		docsFolder: "./docs",
		packageName: "@lolmath/calc",
	},
	{
		name: "ui",
		docsFolder: "./docs",
		packageName: "@lolmath/ui",
	},
];

for (const { name, packageName, docsFolder } of directories) {
	const dest = `./src/pages/${name}`;
	const packagePath = path.dirname(resolvePackagePath(packageName, "."));

	const src = path.join(packagePath, docsFolder);

	// copy the directory from the src to the dest
	fs.copySync(src, dest);
}
