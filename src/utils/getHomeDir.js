import { homedir } from "node:os";

export const getHomeDir = async () => {
  const homeDir = homedir();
  return homeDir;
};
