import { EXIT } from "../common/commands.js";
import { ERR } from "../common/constants.js";

export const exit = async (command, readline) => {
  try {
    if (command === EXIT) {
      readline.close();
      return;
    }
  } catch (error) {
    console.error(`${ERR}: ${error.message}`);
    process.exit(1);
  }
};
