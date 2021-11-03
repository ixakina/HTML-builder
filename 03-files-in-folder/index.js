/* eslint-disable quotes */
/* eslint-disable no-unused-vars */

const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./secret-folder");

const options = {
  encoding: "utf8",
  withFileTypes: true,
};

fs.readdir(filePath, options, (err, files) => {
  if (err) throw err;

  files.forEach((el) => {
    const elPath = path.resolve(__dirname, "./secret-folder", `./${el.name}`);

    fs.stat(elPath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      } else {
        if (stats.isFile()) {
          console.log(
            `${el.name.slice(0, el.name.indexOf("."))} - ${path
              .extname(el.name)
              .slice(path.extname(el.name).indexOf(".") + 1)} - ${
              stats.size / 1000
            }kb`
          );
        }
      }
    });
  });
});
