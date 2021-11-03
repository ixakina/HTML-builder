/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const fs = require("fs");
const path = require("path");
const { stdout } = process;

const filePath = path.resolve(__dirname, "text.txt");
console.log(filePath);

const readableStream = fs.createReadStream(filePath, "utf-8");

let data = "";

readableStream.on("data", (chunk) => (data += chunk));
readableStream.on("end", () => console.log(data));
readableStream.on("error", (error) => console.log("Error", error.message));
