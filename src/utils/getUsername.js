import { userInfo } from "node:os";

export const getUsername = async () => {
  const variables = Object.keys(process.env).filter((key) => key.includes("username"));
  const username = process.env[variables[0]] || userInfo().username;
  return username;
};
