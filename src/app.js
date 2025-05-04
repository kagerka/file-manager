import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline";
import { add } from "./commands/basic/add.js";
import { cat } from "./commands/basic/cat.js";
import { cp } from "./commands/basic/cp.js";
import { mkdir } from "./commands/basic/mkdir.js";
import { mv } from "./commands/basic/mv.js";
import { rm } from "./commands/basic/rm.js";
import { rn } from "./commands/basic/rn.js";
import { exit } from "./commands/exit.js";
import { hash } from "./commands/hash/hash.js";
import { cd } from "./commands/navigation/cd.js";
import { ls } from "./commands/navigation/ls.js";
import { up } from "./commands/navigation/up.js";
import { os } from "./commands/os/os.js";
import { ADD, CAT, CD, CP, EXIT, HASH, LS, MKDIR, MV, OS, RM, RN, UP } from "./common/commands.js";
import { displayCurrentDir } from "./utils/displayCurrentDir.js";
import { displayHomeDir } from "./utils/displayHomeDir.js";
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
    switch (command) {
      case EXIT:
        await exit(command, readline);
        break;
      case UP:
        await up(command);
        break;
      case CD:
        await cd(command, args);
        break;
      case LS:
        await ls(command);
        break;
      case CAT:
        await cat(command, args);
        break;
      case ADD:
        await add(command, args);
        break;
      case MKDIR:
        await mkdir(command, args);
        break;
      case RN:
        await rn(command, args);
        break;
      case CP:
        await cp(command, args);
        break;
      case MV:
        await mv(command, args);
        break;
      case RM:
        await rm(command, args);
        break;
      case OS:
        await os(command, args);
        break;
      case HASH:
        await hash(command, args);
        break;

      default:
        break;
    }

    await displayCurrentDir();
    readline.prompt();
  });

  readline.on("close", async () => {
    await sayGoodbye();
    process.exit(0);
  });
};
