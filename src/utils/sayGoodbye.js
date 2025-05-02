import { getUsername } from "./getUsername.js";

export const sayGoodbye = async () => {
  const username = await getUsername();
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};
