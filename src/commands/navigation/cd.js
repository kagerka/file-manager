import { stat } from "node:fs/promises";
import pathModule from "node:path";
import { CD } from "../../common/commands.js";
import { CURRENTDIR_ERR, DIR_ERR, PATH_ERR } from "../../common/constants.js";
import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const cd = async (command, args) => {
  if (command === CD) {
    if (!args || args.length === 0) {
      console.error(PATH_ERR);
      return;
    }

    const path = args.join(" ").trim();
    if (!path) {
      console.log(PATH_ERR);
      return;
    }

    const currentDir = await getCurrentDir();

    if (!currentDir) {
      console.error(CURRENTDIR_ERR);
      return;
    }

    const finalPath = pathModule.isAbsolute(path) ? path : pathModule.resolve(currentDir, path);

    try {
      const stats = await stat(finalPath);
      if (!stats.isDirectory()) {
        console.error(DIR_ERR);
        return;
      }
      process.chdir(finalPath);
    } catch (error) {
      console.error(`${DIR_ERR} Error: ${error.message}`);
    }
  }
};
