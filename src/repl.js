const readline = require("readline");
const os = require("os");
const { up, ls, cd } = require("./navigation");

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
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0];
    const arg = parts[1];

    try {
      if (command === ".exit") {
        exitApp();
        return;
      }

      if (cmd === "up") {
        const newDir = up(currentWorkingDirectory);
        currentWorkingDirectory = newDir;
        console.log(`You are currently in ${currentWorkingDirectory}`);
        return;
      }

      if (cmd === "ls") {
        const entries = await ls(currentWorkingDirectory);
        entries.forEach((entry) => console.log(entry));
        console.log(`You are currently in ${currentWorkingDirectory}`);
        return;
      }

      if (cmd === "cd") {
        if (!arg) {
          console.log("Invalid input");
          return;
        }

        const newDir = await cd(currentWorkingDirectory, arg);
        currentWorkingDirectory = newDir;
        console.log(`You are currently in ${currentWorkingDirectory}`);
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
