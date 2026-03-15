const path = require("path");

const up = (currentDir) => {
  const parentDir = path.dirname(currentDir);

  return parentDir;
};

module.exports = { up };
