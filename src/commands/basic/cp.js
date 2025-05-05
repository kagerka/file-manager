import { createReadStream, createWriteStream } from "node:fs";
import { access, constants, mkdir } from "node:fs/promises";
import path from "node:path";
import { CP } from "../../common/commands.js";
import { ADD_NEW_DIRNAME, COPY_FILE_ERR, COPY_FILE_FINISHED } from "../../common/constants.js";

export const cp = async (command, args) => {
  if (command !== CP) {
    console.error(ADD_NEW_DIRNAME);
    return;
  }

  const pathToFile = path.resolve(args[0]);
  const pathToNewDir = path.resolve([...args].slice(1).join(" ").trim());

  try {
    await access(pathToFile);
    try {
      await access(pathToNewDir, constants.F_OK);
    } catch {
      await mkdir(pathToNewDir, { recursive: true });
    }

    const fileName = path.basename(pathToFile);
    const destinationPath = path.resolve(pathToNewDir, fileName);

    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(destinationPath);

    readStream
      .on("error", (error) => {
        console.error(`${COPY_FILE_ERR} Error: ${error.message}`);
      })
      .on("end", () => {
        console.log(COPY_FILE_FINISHED);
      })
      .pipe(writeStream);
  } catch (error) {
    console.error(`${COPY_FILE_ERR} Error: ${error.message}`);
  }
};
