import { createHash } from "node:crypto";
import { constants, createReadStream, promises } from "node:fs";
import path from "node:path";
import { HASH } from "../../common/commands.js";
import { ADD_COMMAND, HASH_FILE_ERR } from "../../common/constants.js";

export const hash = async (command, args) => {
  try {
    if (command !== HASH || args.length !== 1) {
      console.error(ADD_COMMAND);
      return;
    }

    const pathToFile = path.resolve(args[0]);

    try {
      await promises.access(pathToFile, constants.F_OK);
    } catch (error) {
      console.error(`${HASH_FILE_ERR} Error: ${error.message}`);
      return;
    }

    const hash = createHash("sha256");
    const readStream = createReadStream(pathToFile);

    readStream.on("error", () => {
      console.error(HASH_FILE_ERR);
    });

    readStream.on("end", () => {
      const data = hash.digest("hex");
      console.log(`Hash for the file: ${data}`);
    });

    readStream.pipe(hash);
  } catch (error) {
    console.error(`${HASH_FILE_ERR} Error: ${error.message}`);
  }
};
