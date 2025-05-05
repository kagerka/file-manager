import { homedir } from "node:os";
import { ERR } from "../common/constants.js";

export const getHomeDir = async () => {
  try {
    const homeDir = homedir();
    return homeDir;
  } catch (error) {
    console.error(`${ERR}: ${error.message}`);
    return null;
  }
};
