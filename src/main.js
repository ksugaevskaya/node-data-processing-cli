const os = require("os");
const { start } = require("./repl");

let currentWorkingDirectory = os.homedir();

console.log("Welcome to Data Processing CLI!");
console.log(`You are currently in ${currentWorkingDirectory}`);

start();
