import {
  parseFiles,
  JSDocPropTag,
  PropType,
  PropKind,
} from "@structured-types/api";
import fs from "fs";

const src = "./src/index.ts";
const dest = "../../apps/docs/docs/calc";

const docObject = parseFiles([src]);

const docItems = Object.values(docObject).sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

function validateItem(item: PropType) {
  if (!item["parameters"]) {
    return `Item ${item.name} has no parameters`;
  }
  if (!item["parameters"].some((param) => param.description)) {
    return `Item ${item.name} has no parameter description`;
  }
  if (!item["returns"]) {
    return `Item ${item.name} has no return type`;
  }
  if (!item["returns"].description) {
    return `Item ${item.name} has no return description`;
  }
  if (!item["tags"]) {
    return `Item ${item.name} has no tags`;
  }
  if (!item["tags"].some((tag) => tag.tag === "category")) {
    return `Item ${item.name} has no category`;
  }
}

const validationErrors = docItems.map(validateItem).filter(Boolean);

if (validationErrors.length) {
  console.error(validationErrors);
  process.exit(1);
}

// Find all categories
const categories = docItems
  .flatMap((item) => item["tags"])
  .filter(Boolean)
  .filter((tag: JSDocPropTag) => tag.tag === "category")
  .map((tag: JSDocPropTag) => tag.content)
  .filter(Boolean)
  .reduce((acc, cur) => {
    if (!acc.includes(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);

function hasCategory(propType: PropType, category: string) {
  return (
    propType.tags &&
    propType.tags.some(
      (tag: JSDocPropTag) => tag.tag === "category" && tag.content === category,
    )
  );
}

const itemsPerCategory = categories.map((category) => {
  const items = docItems.filter((item: PropType) => {
    return hasCategory(item, category);
  });
  return { category, items };
});

function itemToMd(item: PropType) {
  return `## \`${item.name}\`

${item.description}

\`\`\`ts
import { ${item.name} } from "@lolmath/calc";

${item.name}(${item["parameters"].map((param) => param.name).join(", ")})
\`\`\`

### Arguments

${item["parameters"]
  .map(
    (param) =>
      `- \`${param.name}\` (*${PropKind[param.kind]}*): ${param.description}`,
  )
  .join("\n")}

### Returns

(*${PropKind[item["returns"].kind]}*) ${item["returns"].description}

${examples(item)}`;
}

function examples(item: PropType) {
  const exampleTags = item.examples ?? [];
  if (!exampleTags.length) {
    return "";
  }
  return `### Examples

${exampleTags.map((tag) => tag.content).join("\n\n")}`;
}

function combineItems(items: PropType[]) {
  return items.map(itemToMd).join("\n\n---\n");
}

const mdPerCategory = itemsPerCategory.map(({ category, items }) => ({
  category: category,
  md: combineItems(items, category),
}));

// Clear the current /calc folder
// check if the folder exists
if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true });
}
// Create the new /docs/calc folder, recursively
fs.mkdirSync(dest, { recursive: true });

mdPerCategory.forEach(({ category, md }) => {
  fs.writeFileSync(`${dest}/${category}.md`, md);
});

// Copy the README.md, and add a sidebar position
const readme = fs.readFileSync("./readme.md", "utf8");
const readmeWithSidebar = `---\nsidebar_position: 1\n---\n${readme}`;

fs.writeFileSync(`${dest}/index.md`, readmeWithSidebar);
