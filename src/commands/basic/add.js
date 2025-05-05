import { writeFile } from "node:fs";
import { ADD } from "../../common/commands.js";
import { ADD_FILE_NAME, CREATE_FILE_ERR, CREATE_FILE_FINISHED } from "../../common/constants.js";

export const add = async (command, args) => {
  const path = args.join(" ").trim();
  const fileContent = "";

  try {
    if (command === ADD) {
      if (!path) {
        console.error(ADD_FILE_NAME);
        return;
      }
      writeFile(path, fileContent, { flag: "wx" }, (error) => {
        if (error) {
          console.error(`${CREATE_FILE_ERR} Error: ${error.message}`);
        } else {
          console.log(CREATE_FILE_FINISHED);
        }
      });
    }
  } catch (error) {
    console.error(`${CREATE_FILE_ERR} Error: ${error.message}`);
  }
};
