import fs from "node:fs";

const dest = "./docs";

// Clear the current /calc folder
// check if the folder exists
if (fs.existsSync(dest)) {
	fs.rmSync(dest, { recursive: true });
}
// Create the new /docs/calc folder, recursively
fs.mkdirSync(dest, { recursive: true });

// Copy the README.md, and add a sidebar position
let readme = fs.readFileSync("./readme.md", "utf8");

// Add frontmatter
readme = `---\ntitle: "@lolmath/ui"\n---\n${readme}`;

// Remove only the first H1 title line, anywhere in the file
readme = readme.replace(/^# .*\n?/m, "");

fs.writeFileSync(`${dest}/index.md`, readme);

// Write meta.json with title and root properties
fs.writeFileSync(
	`${dest}/meta.json`,
	JSON.stringify({
		title: "@lolmath/ui",
		root: true,
	}),
);
