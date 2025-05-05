import { ERR } from "../common/constants.js";

export const getCurrentDir = async () => {
  try {
    const currentDir = process.cwd();
    return currentDir;
  } catch (error) {
    console.error(`${ERR}: ${error.message}`);
    return null;
  }
};
