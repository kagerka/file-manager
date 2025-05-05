import { ERR, HOMEDIR_ERR } from "../common/constants.js";
import { getHomeDir } from "./getHomeDir.js";

export const displayHomeDir = async () => {
  try {
    const homeDir = await getHomeDir();
    if (!homeDir) {
      console.error(`${ERR}: ${HOMEDIR_ERR}`);
      return;
    }
    console.log(`You are currently in ${homeDir}`);
  } catch (error) {
    console.error(`${ERR}: ${error.message}`);
  }
};
