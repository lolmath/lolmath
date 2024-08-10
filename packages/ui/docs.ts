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
const readme = fs.readFileSync("./readme.md", "utf8");
const readmeWithSidebar = `---\nsidebar_position: 1\n---\n${readme}`;

fs.writeFileSync(`${dest}/index.md`, readmeWithSidebar);
