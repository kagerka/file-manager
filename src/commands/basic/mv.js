import { constants, createReadStream, createWriteStream, unlink } from "node:fs";
import { access } from "node:fs/promises";
import path from "node:path";
import { MV } from "../../common/commands.js";
import { ADD_NEW_DIRNAME, MOVE_FILE_ERR, MOVE_FILE_FINISHED } from "../../common/constants.js";

export const mv = async (command, args) => {
  if (command !== MV || args.length !== 2) {
    console.error(ADD_NEW_DIRNAME);
    return;
  }

  const pathToFile = path.resolve(args[0]);
  const pathToNewDir = path.resolve(args[1]);
  const fileName = path.basename(pathToFile);

  try {
    await access(pathToFile, constants.F_OK);
    await access(pathToNewDir, constants.F_OK);

    const pathToMovedFile = path.join(pathToNewDir, fileName);

    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(pathToMovedFile);

    readStream
      .on("error", () => {
        console.error(MOVE_FILE_ERR);
      })
      .on("end", () => {
        unlink(pathToFile, (error) => {
          if (error) {
            console.log("unlink error");
          }
          console.log(MOVE_FILE_FINISHED);
        });
      })
      .pipe(writeStream);
  } catch (error) {
    console.error(`${MOVE_FILE_ERR} Error: ${error.message}`);
  }
};
