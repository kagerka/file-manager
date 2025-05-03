import { createReadStream } from "node:fs";
import { CAT } from "../../common/commands.js";
import { READ_FILE_ERR, READ_FILE_FINISHED } from "../../common/constants.js";

export const cat = async (command, args) => {
  const path = args.join(" ");

  if (command === CAT) {
    console.log("\n");
    createReadStream(path)
      .on("error", () => {
        console.error(READ_FILE_ERR);
      })
      .on("end", () => {
        console.log(`\n\n${READ_FILE_FINISHED}`);
      })
      .pipe(process.stdout);
  }
};
