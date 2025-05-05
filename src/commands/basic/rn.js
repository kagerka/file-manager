import { access, constants, rename } from "node:fs/promises";
import path from "node:path";
import { RN } from "../../common/commands.js";
import { ADD_NEW_NAME, RENAME_FILE_ERR, RENAME_FILE_FINISHED } from "../../common/constants.js";

export const rn = async (command, args) => {
  if (command !== RN || args.length !== 2) {
    console.error(ADD_NEW_NAME);
    return;
  }

  const oldName = path.resolve(args[0]);
  const newName = path.join(path.dirname(oldName), args[1]);

  try {
    await access(oldName, constants.F_OK);
    await rename(oldName, newName);
    console.log(RENAME_FILE_FINISHED);
  } catch (error) {
    console.error(`${RENAME_FILE_ERR} Error: ${error.message}`);
  }
};
