const fs = require('fs/promises');
const fsPlain = require('fs');
const path = require('path');

const optionsMkDir = {
  recursive: true,
};

const optionsReadDir = {
  encoding: 'utf8',
  withFileTypes: true,
};

const assetsPath = path.resolve(__dirname, './assets');
const assetsCopyPath = path.resolve(__dirname, './project-dist', './assets');

async function createFolderDist() {
  await fs.mkdir(path.resolve(assetsCopyPath), optionsMkDir);
}

async function copyDir(src, dest) {
  const entries = await fs.readdir(src, optionsReadDir);
  await fs.mkdir(dest, optionsMkDir);
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    } else {
      await copyDir(srcPath, destPath);
    }
  }
}

async function createHtmlFile() {
  const destPath = path.resolve(__dirname, './project-dist', './index.html');
  const fromPath = path.resolve(__dirname, 'template.html');

  let temp = (await fs.readFile(fromPath)).toString();

  const components = await fs.readdir(
    path.resolve(__dirname, './components'),
    optionsReadDir
  );

  for (const html of components) {
    const htmlPath = path.resolve(__dirname, './components', `./${html.name}`);
    if (path.extname(htmlPath) === '.html') {
      let newStr = await fs.readFile(htmlPath);

      if (temp.includes(`{{${html.name.slice(0, html.name.indexOf('.'))}}}`)) {
        temp = temp.replace(
          `{{${html.name.slice(0, html.name.indexOf('.'))}}}`,
          newStr.toString()
        );
      }
    }
  }

  fs.writeFile(destPath, temp);
}

async function creatCssFile() {
  const fromPath = path.resolve(__dirname, './styles');
  const resultPath = path.resolve(__dirname, './project-dist', './style.css');

  const output = await fsPlain.createWriteStream(resultPath);

  const files = await fs.readdir(fromPath, optionsReadDir);
  await files.forEach((el) => {
    const elPath = path.resolve(__dirname, './styles', `./${el.name}`);
    if (el.isFile() && path.extname(elPath) == '.css') {
      const input = fsPlain.createReadStream(elPath, 'utf-8');
      input.on('data', (chunk) => output.write(chunk));
    }
  });
}

async function deleteFolderDist() {
  await fs.rm(path.resolve(__dirname, './project-dist'), {
    recursive: true,
    force: true,
  });
}

async function createHTMLBuilder() {
  await deleteFolderDist();

  await createFolderDist();

  await createHtmlFile();

  await creatCssFile();

  await copyDir(assetsPath, assetsCopyPath);
}

createHTMLBuilder();
