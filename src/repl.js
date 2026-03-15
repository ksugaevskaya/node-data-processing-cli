const readline = require("readline");
const os = require("os");
const { up } = require("./navigation");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

let currentWorkingDirectory = os.homedir();

const exitApp = () => {
  console.log("Thank you for using Data Processing CLI!");
  process.exit(0);
};

rl.on("SIGINT", exitApp);

const start = () => {
  console.log(`You are currently in ${currentWorkingDirectory}`);

  const handleCommand = (command) => {
    if (command === ".exit") {
      exitApp();
      return;
    }

    if (command === "up") {
      const newDir = up(currentWorkingDirectory);
      currentWorkingDirectory = newDir;
      console.log(`You are currently in ${newDir}`);
      return;
    }

    console.log("Invalid input");
  };

  rl.prompt();

  rl.on("line", (line) => {
    handleCommand(line);
    rl.prompt();
  });
};

module.exports = { start };
