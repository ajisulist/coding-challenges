import { readdir } from "fs/promises";
import { watchFile } from "fs";
import select from "@inquirer/select";
import { exec, spawn } from "child_process";
import path from "path";
import chalk from "chalk";
const __BASE_DIRECTORY = "./src";

const clearConsole = () => {
  process.stdout.write("\x1Bc");
};

const listDirectories = async () => {
  const list = await readdir(__BASE_DIRECTORY);
  return list;
};

const executeFile = (fullPath) => {
  const childProcess = spawn("node", [`${fullPath}`]);
  let a = 0;
  childProcess.stdout.on("data", (data) => {
    process.stdout.write(chalk.green(`${data}`));
  });

  childProcess.stderr.on("data", (data) => {
    process.stdout.write(chalk.red(`${data}`));
  });
  childProcess.on("spawn", () => {
    clearConsole();
  });
};

const watchAndExecute = async (directory) => {
  const fullFilename = `${__BASE_DIRECTORY}/${directory}/index.js`;
  const fullPath = path.resolve(fullFilename);
  executeFile(fullPath);
  watchFile(fullFilename, () => {
    executeFile(fullPath);
  });
};

const showMenu = async () => {
  clearConsole();
  const directories = await listDirectories();
  const answer = await select({
    message: "Choose which files you want to watch",
    choices: directories.map((el) => ({
      name: el,
      value: el,
    })),
  });
  clearConsole();
  await watchAndExecute(answer);
};

showMenu();
