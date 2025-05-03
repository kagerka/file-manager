import { getHomeDir } from "./getHomeDir.js";

export const displayHomeDir = async () => {
  const homeDir = await getHomeDir();
  console.log(`You are currently in ${homeDir}`);
};
