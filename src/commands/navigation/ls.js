import { readdir } from "node:fs/promises";
import { LS } from "../../common/commands.js";
import { DIR_CONTENT_ERR, DIRECTORY, FILE } from "../../common/constants.js";
import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const ls = async (command) => {
  if (command === LS) {
    const currentDir = await getCurrentDir();
    const dirContent = await readdir(currentDir, { withFileTypes: true });

    try {
      const result = dirContent.map((el) => ({
        Name: el.name,
        Type: el.isDirectory() ? DIRECTORY : FILE,
      }));

      result.sort((a, b) => {
        if (a.Type !== b.Type) {
          if (a.Type === FILE) {
            return 1;
          } else {
            return -1;
          }
        }
        return a.Name.localeCompare(b.Name);
      });
      console.table(result);
    } catch (error) {
      console.error(DIR_CONTENT_ERR);
    }
  }
};
