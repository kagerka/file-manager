import { UP } from "../../common/commands.js";
import { DIR_ERR } from "../../common/constants.js";

export const up = async (command) => {
  if (command === UP) {
    try {
      process.chdir("..");
    } catch (error) {
      console.error(DIR_ERR);
    }
  }
};
