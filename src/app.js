import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline";
import { exit } from "./commands/exit.js";
import { cd } from "./commands/navigation/cd.js";
import { ls } from "./commands/navigation/ls.js";
import { up } from "./commands/navigation/up.js";
import { displayCurrentDir } from "./utils/displayCurrentDir.js";
import { displayHomeDir } from "./utils/displayHomeDir.js";
import { getCurrentDir } from "./utils/getCurrentDir.js";
import { getHomeDir } from "./utils/getHomeDir.js";
import { sayGoodbye } from "./utils/sayGoodbye.js";
import { sayHello } from "./utils/sayHello.js";

export const app = async () => {
  await sayHello();

  const homeDir = await getHomeDir();
  process.chdir(homeDir);
  await displayHomeDir();

  const readline = createInterface({ input, output });
  readline.prompt();

  readline.on("line", async (input) => {
    const [command, ...args] = input.trim().split(" ");
    await exit(command, readline);
    await up(command);
    await cd(command, args);
    await ls(command);

    await displayCurrentDir();
    readline.prompt();
  });

  readline.on("close", async () => {
    await sayGoodbye();
    process.exit(0);
  });
};
