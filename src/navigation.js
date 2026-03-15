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

module.exports = { up, ls };
