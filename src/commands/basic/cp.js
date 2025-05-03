import { createReadStream, createWriteStream } from "node:fs";
import path from "node:path";
import { CP } from "../../common/commands.js";
import { ADD_NEW_DIRNAME, COPY_FILE_ERR, COPY_FILE_FINISHED } from "../../common/constants.js";

export const cp = async (command, args) => {
  if (command !== CP || args.length !== 2) {
    console.error(ADD_NEW_DIRNAME);
    return;
  }

  const pathToFile = path.resolve(args[0]);
  const pathToNewDir = path.resolve(args[1]);

  const readStream = createReadStream(pathToFile);
  const writeStream = createWriteStream(pathToNewDir);

  readStream
    .on("error", () => {
      console.error(COPY_FILE_ERR);
    })
    .on("end", () => {
      console.log(COPY_FILE_FINISHED);
    })
    .pipe(writeStream);
};
