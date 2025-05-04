import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import path from "node:path";
import { HASH } from "../../common/commands.js";
import { ADD_COMMAND, HASH_FILE_ERR } from "../../common/constants.js";

export const hash = async (command, args) => {
  if (command !== HASH || args.length !== 1) {
    console.error(ADD_COMMAND);
    return;
  }

  const pathToFile = path.resolve(args[0]);
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
};
