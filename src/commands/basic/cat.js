import { createReadStream } from "node:fs";
import { CAT } from "../../common/commands.js";
import { READ_FILE_ERR, READ_FILE_FINISHED } from "../../common/constants.js";

export const cat = async (command, args) => {
  const path = args.join(" ").trim();
  if (!path) {
    console.error(`${READ_FILE_ERR}`);
    return;
  }

  try {
    if (command === CAT) {
      console.log("\n");
      createReadStream(path)
        .on("error", (error) => {
          console.error(`${READ_FILE_ERR} Error: ${error.message}`);
        })
        .on("end", () => {
          console.log(`\n\n${READ_FILE_FINISHED}`);
        })
        .pipe(process.stdout);
    }
  } catch (error) {
    console.error(`${READ_FILE_ERR} Error: ${error.message}`);
  }
};
