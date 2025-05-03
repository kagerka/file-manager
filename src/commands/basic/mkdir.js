import { mkdir as makeDir } from "node:fs";
import { MKDIR } from "../../common/commands.js";
import { ADD_DIR_NAME, CREATE_DIR_ERR, CREATE_DIR_FINISHED } from "../../common/constants.js";

export const mkdir = async (command, args) => {
  const path = args.join(" ");

  if (command === MKDIR) {
    makeDir(path, { recursive: false }, (error) => {
      if (error) {
        console.error(CREATE_DIR_ERR);
        if (!path) {
          console.error(ADD_DIR_NAME);
        }
      } else {
        console.log(CREATE_DIR_FINISHED);
      }
    });
  }
};
