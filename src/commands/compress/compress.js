import { constants, createReadStream, createWriteStream } from "node:fs";
import { access } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";
import { COMPRESS } from "../../common/commands.js";
import { ADD_COMMAND, COMPRESS_FILE_ERR, COMPRESS_FILE_FINISHED } from "../../common/constants.js";

export const compress = async (command, args) => {
  if (command !== COMPRESS || args.length !== 2) {
    console.error(ADD_COMMAND);
    return;
  }

  const pathToFile = path.resolve(args[0]);

  try {
    await access(pathToFile, constants.F_OK);
  } catch (error) {
    console.error(`${COMPRESS_FILE_ERR} Error: ${error.message}`);
    return;
  }

  const fileName = path.basename(pathToFile) + ".br";
  const pathToDestination = path.resolve(args[1], fileName);
  const readStream = createReadStream(pathToFile);
  const writeStream = createWriteStream(pathToDestination);
  const compressFile = createBrotliCompress();

  try {
    await pipeline(readStream, compressFile, writeStream);
    console.log(COMPRESS_FILE_FINISHED);
  } catch (error) {
    console.error(`${COMPRESS_FILE_ERR} Error: ${error.message}`);
  }
};
