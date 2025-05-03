import { EXIT } from "../common/commands.js";

export const exit = async (command, readline) => {
  if (command === EXIT) {
    readline.close();
    return;
  }
};
