import pathModule from "node:path";
import { CD } from "../../common/commands.js";
import { DIR_ERR, PATH_ERR } from "../../common/constants.js";
import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const cd = async (command, args) => {
  const path = args.join(" ");

  if (command === CD) {
    if (!path) {
      console.log(PATH_ERR);
      return;
    }

    const currentDir = await getCurrentDir();
    const finalPath = pathModule.isAbsolute(path) ? path : pathModule.resolve(currentDir, path);

    try {
      process.chdir(finalPath);
    } catch (error) {
      console.error(DIR_ERR);
    }
  }
};
