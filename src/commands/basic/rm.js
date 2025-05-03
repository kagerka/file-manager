import { rm as remove } from "node:fs/promises";
import path from "node:path";
import { RM } from "../../common/commands.js";
import { ADD_FILE_NAME, REMOVE_FILE_ERR, REMOVE_FILE_FINISHED } from "../../common/constants.js";

export const rm = async (command, args) => {
  if (command !== RM || args.length !== 1) {
    console.error(ADD_FILE_NAME);
    return;
  }

  const pathToFile = path.resolve(args[0]);

  try {
    await remove(pathToFile);
    console.log(REMOVE_FILE_FINISHED);
  } catch (error) {
    console.error(REMOVE_FILE_ERR);
  }
};
