import { readdir } from "fs/promises";
import select from "@inquirer/select";
import { fork } from "child_process";
import path from "path";
const __BASE_DIRECTORY = "./src";

const clearConsole = () => {
  process.stdout.write("\x1Bc");
};

const listDirectories = async () => {
  const list = await readdir(__BASE_DIRECTORY);
  return list;
};

const executeFile = async (directory) => {
  const fullFilename = `${__BASE_DIRECTORY}/${directory}/index.js`;
  const fullPath = path.resolve(fullFilename);
  const childProcess = fork(fullPath, {
    stdio: "inherit",
    execArgv: ["--watch"],
  });

  childProcess.on("spawn", () => {
    clearConsole();
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
  await executeFile(answer);
};

showMenu();
