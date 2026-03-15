const readline = require("readline");
const os = require("os");
const { up, ls } = require("./navigation");

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

  const handleCommand = async (command) => {
    try {
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

      if (command === "ls") {
        const entries = await ls(currentWorkingDirectory);
        entries.forEach((entry) => console.log(entry));
        return;
      }

      console.log("Invalid input");
    } catch {
      console.log("Operation failed");
    }
  };

  rl.prompt();

  rl.on("line", (line) => {
    handleCommand(line);
    rl.prompt();
  });
};

module.exports = { start };
