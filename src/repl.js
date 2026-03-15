const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

const exitApp = () => {
  console.log("Thank you for using Data Processing CLI!");
  process.exit(0);
};

rl.on("SIGINT", exitApp);

const start = () => {
  const handleCommand = (command) => {
    if (command === ".exit") {
      exitApp();
      return;
    }
  };

  rl.prompt();

  rl.on("line", (line) => {
    handleCommand(line);
    rl.prompt();
  });
};

module.exports = { start };
