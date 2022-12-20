import fs from "fs-extra";

const directories = [
  {
    name: "calc",
    path: "@lolmath/calc/docs",
  },
];

directories.forEach(({ name, path }) => {
  const dest = `./docs/${name}`;
  const src = `./node_modules/${path}`;

  // copy the directory from the src to the dest
  fs.copySync(src, dest);
});
