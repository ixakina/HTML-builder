/* eslint-disable quotes */
/* eslint-disable no-unused-vars */

const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;

const filePath = path.resolve(__dirname, "result.txt");
const output = fs.createWriteStream(filePath);

stdout.write("Hello! Enter any text here...\n");
stdin.on("data", (data) => {
  if (data.toString().includes("exit")) {
    process.exit();
  } else {
    output.write(data);
  }
});
process.on("exit", () => stdout.write(`Goodbye!`));
process.on("SIGINT", function () {
  process.exit();
});
