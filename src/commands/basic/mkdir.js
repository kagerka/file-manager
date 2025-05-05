import { mkdir as makeDir } from "node:fs/promises";
import { MKDIR } from "../../common/commands.js";
import { ADD_DIR_NAME, CREATE_DIR_ERR, CREATE_DIR_FINISHED } from "../../common/constants.js";

export const mkdir = async (command, args) => {
  if (command === MKDIR) {
    const path = args.join(" ").trim();

    if (!path) {
      console.error(ADD_DIR_NAME);
      return;
    }
    try {
      await makeDir(path, { recursive: true });
      console.log(CREATE_DIR_FINISHED);
    } catch (error) {
      console.error(`${CREATE_DIR_ERR} Error: ${error.message}`);
    }
  }
};
