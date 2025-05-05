import { userInfo } from "node:os";
import { ERR } from "../common/constants.js";

export const getUsername = async () => {
  try {
    const variables = Object.keys(process.env).filter((key) => key.toLowerCase().includes("username"));
    const username = process.env[variables[0]] || userInfo().username;
    return username;
  } catch (error) {
    console.error(`${ERR}: ${error.message}`);
    return null;
  }
};
