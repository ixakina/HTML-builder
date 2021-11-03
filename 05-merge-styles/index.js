/* eslint-disable quotes */
/* eslint-disable no-unused-vars */

const fs = require("fs/promises");
const fsPlain = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./styles");
const bundlePath = path.resolve(__dirname, "./project-dist", "bundle.css");

const options = {
  encoding: "utf8",
  withFileTypes: true,
};

async function createBundle() {
  const output = fsPlain.createWriteStream(bundlePath);

  const files = await fs.readdir(filePath, options);
  files.forEach((el) => {
    const elPath = path.resolve(__dirname, "./styles", `./${el.name}`);
    if (el.isFile() && path.extname(elPath) == ".css") {
      const input = fsPlain.createReadStream(elPath, "utf-8");
      input.on("data", (chunk) => output.write(chunk));
    }
  });
}

createBundle();
