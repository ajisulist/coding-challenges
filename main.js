import { readdir, watch } from "fs/promises";
import select from "@inquirer/select";
import { spawn } from "child_process";
import path from "path";
import chalk from "chalk";
const __BASE_DIRECTORY = "./src";

const clearConsole = () => {
  console.clear();
};

const listDirectories = async () => {
  const list = await readdir(__BASE_DIRECTORY);
  return list;
};

const executeFile = (fullPath) => {
  const childProcess = spawn("node", [`${fullPath}`]);

  childProcess.stdout.on("data", (data) => {
    clearConsole();
    console.log(chalk.green(`${data}`));
  });

  childProcess.stderr.on("data", (data) => {
    clearConsole();
    console.log(chalk.red(`${data}`));
  });
};

const watchAndExecute = async (directory) => {
  const fullFilename = `${__BASE_DIRECTORY}/${directory}/index.js`;
  const fullPath = path.resolve(fullFilename);
  executeFile(fullPath);
  const watcher = watch(fullFilename);
  for await (const event of watcher) {
    executeFile(fullPath);
  }
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
