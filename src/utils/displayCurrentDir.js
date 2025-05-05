import { CURRENTDIR_ERR, ERR } from "../common/constants.js";
import { getCurrentDir } from "./getCurrentDir.js";

export const displayCurrentDir = async () => {
  try {
    const currentDir = await getCurrentDir();
    if (!currentDir) {
      console.error(`${ERR}: ${CURRENTDIR_ERR}`);
      return;
    }
    console.log(`You are currently in ${currentDir}`);
  } catch (error) {
    console.error(`${ERR}: ${error.message}`);
  }
};
