import { constants, createReadStream, createWriteStream, promises } from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";
import { DECOMPRESS } from "../../common/commands.js";
import { ADD_COMMAND, DECOMPRESS_FILE_ERR, DECOMPRESS_FILE_FINISHED } from "../../common/constants.js";

export const decompress = async (command, args) => {
  if (command !== DECOMPRESS || args.length !== 2) {
    console.error(ADD_COMMAND);
    return;
  }

  const pathToFile = path.resolve(args[0]);

  try {
    await promises.access(pathToFile, constants.F_OK);
  } catch (error) {
    console.error(`${DECOMPRESS_FILE_ERR} Error: ${error.message}`);
    return;
  }

  const fileName = path.basename(args[0], path.extname(args[0]));
  const pathToDestination = path.resolve(args[1], fileName);
  const readStream = createReadStream(pathToFile);
  const writeStream = createWriteStream(pathToDestination);
  const decompressFile = createBrotliDecompress();

  try {
    await pipeline(readStream, decompressFile, writeStream);
    console.log(DECOMPRESS_FILE_FINISHED);
  } catch (error) {
    console.error(`${DECOMPRESS_FILE_ERR} Error: ${error.message}`);
  }
};
