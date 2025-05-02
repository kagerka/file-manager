import { getUsername } from "./getUsername.js";

export const sayHello = async () => {
  const username = await getUsername();
  console.log(`Welcome to the File Manager, ${username}!`);
};
