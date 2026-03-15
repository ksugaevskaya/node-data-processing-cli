const path = require("path");
const fs = require("fs").promises;

const up = (currentDir) => {
  const parentDir = path.dirname(currentDir);

  return parentDir;
};

const ls = async (currentDir) => {
  const entries = await fs.readdir(currentDir, { withFileTypes: true });

  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();

  return [...folders, ...files];
};

const cd = async (currentDir, targetPath) => {
  const resolvedPath = path.resolve(currentDir, targetPath);
  const stat = await fs.stat(resolvedPath);

  if (!stat.isDirectory()) {
    throw new Error("Not a directory");
  }

  return resolvedPath;
};

module.exports = { up, ls, cd };
