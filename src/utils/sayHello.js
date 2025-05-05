import { ERR, USERNAME_ERR } from "../common/constants.js";
import { getUsername } from "./getUsername.js";

export const sayHello = async () => {
  try {
    const username = await getUsername();
    if (!username) {
      console.error(`${ERR}: ${USERNAME_ERR}`);
    }
    console.log(`Welcome to the File Manager, ${username}!`);
  } catch (error) {
    console.error(`${ERR}: ${error.message}`);
  }
};
