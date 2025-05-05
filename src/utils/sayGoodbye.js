import { ERR, USERNAME_ERR } from "../common/constants.js";
import { getUsername } from "./getUsername.js";

export const sayGoodbye = async () => {
  try {
    const username = await getUsername();
    if (!username) {
      console.error(`${ERR}: ${USERNAME_ERR}`);
    }
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  } catch (error) {
    console.error(`${ERR}: ${error.message}`);
  }
};
