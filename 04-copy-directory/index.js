const fs = require('fs/promises');
const path = require('path');

const options = {
  recursive: true,
};

fs.mkdir(path.resolve(__dirname, './files-copy'), options);

const filePath = path.resolve(__dirname, './files');
const fileCopyPath = path.resolve(__dirname, './files-copy');

async function copyDir() {
  try {
    const files = await fs.readdir(filePath);

    const filesCopy = await fs.readdir(fileCopyPath);

    for (let copy of filesCopy) {
      const copyPath = path.resolve(__dirname, './files-copy', `./${copy}`);
      fs.unlink(copyPath, (err) => {
        if (err) throw err;
      });
    }

    for (const file of files) {
      const origPath = path.resolve(__dirname, './files', `./${file}`);
      const copyPath = path.resolve(__dirname, './files-copy', `./${file}`);

      fs.copyFile(origPath, copyPath);
    }
  } catch (err) {
    console.error(err);
  }
}

copyDir();
