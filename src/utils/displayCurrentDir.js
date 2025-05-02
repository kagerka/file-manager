import { getCurrentDir } from "./getCurrentDir.js";

export const displayCurrentDir = async () => {
  const currentDir = await getCurrentDir();
  console.log(`You are currently in ${currentDir}`);
};
